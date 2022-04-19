import { createRosterFromXML } from '@war.cards/roster';
import { uploadIcon, homeIcon, githubIcon } from './icons';
import setRoster from './roster';

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
      const reader = new FileReader();
      reader.onload = (() => {
        return (readerEvent) => {
          const roster = createRosterFromXML(readerEvent.target.result);
          setRoster(roster);
        };
      })(file);
      reader.readAsText(file);
    };
  };

  return upload;
};

const navBar = () => {
  const header = document.createElement('header');
  header.classList.add('masthead', 'mb-auto');

  const inner = document.createElement('div');
  inner.classList.add('inner');
  header.appendChild(inner);

  const brand = document.createElement('h3');
  brand.classList.add('masthead-brand');
  brand.innerText = 'Stumpy\'s RV';
  inner.appendChild(brand);

  const nav = document.createElement('nav');
  nav.classList.add('nav', 'nav-masthead', 'justify-content-center');
  inner.appendChild(nav);

  const home = document.createElement('a');
  home.classList.add('nav-link', 'active');
  home.setAttribute('href', '#');
  home.appendChild(homeIcon());
  nav.appendChild(home);
  nav.appendChild(uploadButton());

  const githubLink = document.createElement('a');
  githubLink.classList.add('nav-link');
  githubLink.setAttribute('href', 'https://github.com/stumpyzevon/war.cards');
  githubLink.appendChild(githubIcon());
  nav.appendChild(githubLink);

  return header;
};

export default navBar;
