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

  card.appendChild(cardBody);
  return card;
};

export default unitCard;
