const categoryList = (categories) => {
  const catList = document.createElement('span');
  categories.forEach((cat) => {
    const badge = document.createElement('span');
    badge.classList.add('badge', cat._primary ? 'bg-primary' : 'bg-secondary');
    badge.textContent = cat._name;
    catList.appendChild(badge);
  });
  return catList;
};

export default categoryList;
