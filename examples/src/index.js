import { parseRoster } from '@war.cards/parse';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Github from './github.png';

const uploadIcon = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('bi', 'bi-upload');
  svg.setAttribute('width', '24');
  svg.setAttribute('height', '24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.innerHTML = `<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
<path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"></path>`;
  return svg;
}

const uploadButton = () => {
  const upload = document.createElement('a');
  upload.classList.add('nav-link');
  upload.setAttribute('href', '#');
  console.log(uploadIcon());
  upload.appendChild(uploadIcon());

  // this is where the magic happens...
  upload.onclick = (e) => {
    e.preventDefault();
    const fileInput = document.createElement('input');
    fileInput.setAttribute("type", "file");
    fileInput.click();

    fileInput.onchange = () => {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (() => {
        return (e) => {
          const parsed = parseRoster(e.target.result);
          console.log(parsed);
        };
      })(file);

      reader.readAsText(file);
    }
  };

  return upload;
}

const footer = () => {
  const footerContainer = document.createElement('footer');
  footerContainer.classList.add('mastfoot', 'mt-auto');
  const div = document.createElement('div');
  div.classList.add('inner');
  footerContainer.appendChild(div);

  const footerText = document.createElement('p');
  footerText.innerHTML = `Created by <a href="https://github.com/stumpyzevon">Stumpy Zevon</a>.<br>Theme is <a href="https://getbootstrap.com/docs/4.0/examples/cover/">Cover</a> by <a href="https://twitter.com/mdo">@mdo</a>.`;
  div.appendChild(footerText);
  return footerContainer;
}

const mainDescription = () => {
  const main = document.createElement('main')
  main.classList.add('inner', 'cover');

  const title = document.createElement('h1');
  title.classList.add('cover-heading');
  title.innerHTML = 'Stumpy\'s Roster Viewer';
  main.appendChild(title);

  const description = document.createElement('p');
  description.classList.add('lead');
  description.innerHTML = `This is an example of a roster viewer made using the war.cards parser. The same parser is used in the online roster editor
    <a href="https://war.cards">war.cards</a>. Click the&nbsp; ${uploadIcon().outerHTML} &nbsp;icon in the menu to begin.<br><br><strong>NOTE:</strong> this does not accept .rosz files! Only uncompressed .ros files.`;
  main.appendChild(description);

  return main;
}

const navBar = () => {
  const header = document.createElement('header');
  header.classList.add('masthead', 'mb-auto');

  const inner = document.createElement('div');
  inner.classList.add('inner');
  header.appendChild(inner);

  const brand = document.createElement('h3');
  brand.classList.add('masthead-brand');
  brand.innerHTML = 'Stumpy\'s RV';
  inner.appendChild(brand);

  const nav = document.createElement('nav');
  nav.classList.add('nav', 'nav-masthead', 'justify-content-center');
  inner.appendChild(nav);

  const home = document.createElement('a');
  home.classList.add('nav-link', 'active');
  home.setAttribute('href', '#');
  home.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
      <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
    </svg>`;
  nav.appendChild(home);
  nav.appendChild(uploadButton());

  const githubLink = document.createElement('a');
  githubLink.classList.add('nav-link');
  githubLink.setAttribute('href', 'https://github.com/stumpyzevon/war.cards');
  const githubIcon = new Image();
  githubIcon.src = Github;
  githubLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>`;
  nav.appendChild(githubLink);

  return header;
}

/**
 * This uses the Cover example template from Bootstrap 4, by @mdo: https://getbootstrap.com/docs/4.0/examples/cover/
 */
const component = () => {
  const container = document.createElement('div');
  container.classList.add('cover-container', 'd-flex', 'h-100', 'p-3', 'mx-auto', 'flex-column');

  container.appendChild(navBar());
  container.appendChild(mainDescription());
  container.appendChild(footer());

  return container;
}
  
document.body.appendChild(component());
document.body.classList.add('text-center');