import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Github from './github.png';

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
    <a href="https://war.cards">war.cards</a>. Click <strong>Upload .ros file...</strong> in the menu to begin.<br><br><strong>NOTE:</strong> this does not accept .rosz files! Only uncompressed .ros files.`;
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
  brand.innerHTML = 'SRV';
  inner.appendChild(brand);

  const nav = document.createElement('nav');
  nav.classList.add('nav', 'nav-masthead', 'justify-content-center');
  inner.appendChild(nav);

  const home = document.createElement('a');
  home.classList.add('nav-link', 'active');
  home.setAttribute('href', '#');
  home.innerHTML = 'Home';
  nav.appendChild(home);

  const upload = document.createElement('a');
  upload.classList.add('nav-link');
  upload.setAttribute('href', '#');
  upload.innerHTML = 'Upload .ros file...';

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
          // TODO: call parser here!
          console.log(e.target.result);
        };
      })(file);

      reader.readAsText(file);
    }
  };
  nav.appendChild(upload);

  const githubLink = document.createElement('a');
  githubLink.classList.add('nav-link');
  githubLink.setAttribute('href', 'https://github.com/stumpyzevon/war.cards');
  const githubIcon = new Image();
  githubIcon.src = Github;
  githubLink.appendChild(githubIcon);
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