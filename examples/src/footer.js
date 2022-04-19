const footer = () => {
  const footerContainer = document.createElement('footer');
  footerContainer.classList.add('mastfoot', 'mt-auto');
  const div = document.createElement('div');
  div.classList.add('inner');
  footerContainer.appendChild(div);

  const footerText = document.createElement('p');
  footerText.innerHTML = 'Created by <a href="https://github.com/stumpyzevon">Stumpy Zevon</a>.<br>Theme is <a href="https://getbootstrap.com/docs/4.0/examples/cover/">Cover</a> by <a href="https://twitter.com/mdo">@mdo</a>.';
  div.appendChild(footerText);
  return footerContainer;
};

export default footer;
