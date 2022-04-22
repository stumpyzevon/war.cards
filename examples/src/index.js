import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import navBar from './navBar';
import footer from './footer';
import setHomeDescription from './home';

/**
 * This uses the Cover example template from Bootstrap 4, by @mdo: https://getbootstrap.com/docs/4.0/examples/cover/
 */
const init = () => {
  const container = document.createElement('div');
  container.classList.add('cover-container', 'd-flex', 'h-100', 'p-3', 'mx-auto', 'flex-column', 'overflow-auto');

  container.appendChild(navBar());

  const main = document.createElement('main');
  main.id = 'main';
  main.classList.add('inner', 'cover');
  container.appendChild(main);
  container.appendChild(footer());

  return container;
};

document.body.appendChild(init());
document.body.classList.add('text-center');

window.onload = () => {
  setHomeDescription();
};
