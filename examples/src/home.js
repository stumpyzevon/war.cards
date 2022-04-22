import { uploadIcon } from './icons';

const setHomeDescription = () => {
  const main = document.getElementById('main');
  main.textContent = '';

  const title = document.createElement('h1');
  title.classList.add('cover-heading');
  title.innerText = 'Stumpy\'s Roster Viewer';
  main.appendChild(title);

  const description = document.createElement('p');
  description.classList.add('lead');
  description.innerHTML = `This is an example of a roster viewer made using the war.cards parser. The same parser is used in the online roster editor
<a href="https://war.cards">war.cards</a>. Click the&nbsp; ${uploadIcon().outerHTML} &nbsp;icon in the menu to begin.<br><br><strong>NOTE:</strong> this does not accept .rosz files! Only uncompressed .ros files.
  `;

  main.appendChild(description);
};

export default setHomeDescription;
