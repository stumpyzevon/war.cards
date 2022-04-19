import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { uploadIcon } from './icons';
import navBar from './navBar';
import footer from './footer';

const mainDescription = () => {
  const main = document.createElement('main');
  main.id = 'main';
  main.classList.add('inner', 'cover');

  const title = document.createElement('h1');
  title.classList.add('cover-heading');
  title.innerText = 'Stumpy\'s Roster Viewer';
  main.appendChild(title);

  const description = document.createElement('p');
  description.classList.add('lead');
  description.innerHTML = `This is an example of a roster viewer made using the war.cards parser. The same parser is used in the online roster editor
    <a href="https://war.cards">war.cards</a>. Click the&nbsp; ${uploadIcon().outerHTML} &nbsp;icon in the menu to begin.<br><br><strong>NOTE:</strong> this does not accept .rosz files! Only uncompressed .ros files.`;
  main.appendChild(description);

  return main;
};

/**
 * This uses the Cover example template from Bootstrap 4, by @mdo: https://getbootstrap.com/docs/4.0/examples/cover/
 */
const init = () => {
  const container = document.createElement('div');
  container.classList.add('cover-container', 'd-flex', 'h-100', 'p-3', 'mx-auto', 'flex-column');

  container.appendChild(navBar());
  container.appendChild(mainDescription());
  container.appendChild(footer());

  return container;
};

document.body.appendChild(init());
document.body.classList.add('text-center');
