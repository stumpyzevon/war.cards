import profileTable from './profileTable';
import categoryList from './categoryList';

const unitCard = (unit) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.appendChild(cardBody);

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.innerText = unit._name;
  cardBody.appendChild(cardTitle);

  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.innerText = unit._name;
  cardBody.appendChild(cardText);

  const profileMap = unit.getProfiles();
  Object.entries(profileMap).forEach((entry) => {
    const [profileName, profiles] = entry;
    cardText.appendChild(profileTable(profileName, profiles));
  });

  const catList = categoryList(unit.getCategories());
  cardBody.appendChild(catList);

  card.appendChild(cardBody);
  return card;
};

export default unitCard;
