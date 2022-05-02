import localforage from 'localforage';
import JSZip from 'jszip';
import { createRoster, createRosterFromXML } from '@war.cards/roster';
import {
  uploadIcon,
  homeIcon,
  githubIcon,
  cardListIcon,
} from './icons';
import { setRoster } from './roster';
import setHomeDescription from './home';

const uploadButton = () => {
  const upload = document.createElement('a');
  upload.classList.add('nav-link');
  upload.setAttribute('href', '#');
  upload.appendChild(uploadIcon());

  upload.onclick = (e) => {
    e.preventDefault();
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.click();

    fileInput.onchange = () => {
      const file = fileInput.files[0];
      JSZip.loadAsync(file).then((zip) => {
        const rosFile = zip.file(/.*\.ros$/);
        rosFile[0].async('string').then((contents) => {
          const roster = createRosterFromXML(contents);
          setRoster(roster);
          localforage.setItem('roster', roster.clone());
        });
      }).catch(() => {
        // assume this is just a .ros file
        const reader = new FileReader();
        reader.onload = (() => {
          return (readerEvent) => {
            const roster = createRosterFromXML(readerEvent.target.result);
            setRoster(roster);
            localforage.setItem('roster', roster.clone());
          };
        })(file);

        reader.readAsText(file);
      });
    };
  };

  return upload;
};

const viewRosterButton = () => {
  const rosterButton = document.createElement('a');
  rosterButton.id = 'rosterButton';
  rosterButton.classList.add('nav-link');
  rosterButton.setAttribute('href', '#');
  rosterButton.appendChild(cardListIcon());

  rosterButton.onclick = (e) => {
    e.preventDefault();
    const home = document.getElementById('homeButton');
    home.classList.remove('active');
    rosterButton.classList.toggle('active');
    localforage.getItem('roster').then((jsonRoster) => {
      setRoster(createRoster(jsonRoster));
    });
  };

  return rosterButton;
};

const homeButton = () => {
  const home = document.createElement('a');
  home.id = 'homeButton';
  home.classList.add('nav-link', 'active');
  home.setAttribute('href', '#');
  home.appendChild(homeIcon());

  home.onclick = (e) => {
    e.preventDefault();
    const rosterButton = document.getElementById('rosterButton');
    rosterButton.classList.remove('active');
    home.classList.toggle('active');
    setHomeDescription();
  };

  return home;
};

const navBar = () => {
  const header = document.createElement('header');
  header.classList.add('masthead', 'mb-auto');

  const inner = document.createElement('div');
  inner.classList.add('inner');
  header.appendChild(inner);

  const brand = document.createElement('h3');
  brand.classList.add('masthead-brand');
  brand.textContent = 'Stumpy\'s RV';
  inner.appendChild(brand);

  const nav = document.createElement('nav');
  nav.classList.add('nav', 'nav-masthead', 'justify-content-center');
  inner.appendChild(nav);

  nav.appendChild(homeButton());

  const spinner = document.createElement('div');
  spinner.classList.add('nav-link', 'mt-2', 'spinner-border', 'spinner-border-sm', 'text-primary');
  nav.appendChild(spinner);

  const upload = uploadButton();
  nav.appendChild(upload);

  let foundRoster = false;
  localforage.iterate((value, key) => {
    if (key === 'roster') {
      foundRoster = true;
    }
  }).then(() => {
    if (foundRoster) {
      nav.insertBefore(viewRosterButton(), upload);
    }
    nav.removeChild(spinner);
  });

  const githubLink = document.createElement('a');
  githubLink.classList.add('nav-link');
  githubLink.setAttribute('href', 'https://github.com/stumpyzevon/war.cards');
  githubLink.appendChild(githubIcon());
  nav.appendChild(githubLink);

  return header;
};

export default navBar;
