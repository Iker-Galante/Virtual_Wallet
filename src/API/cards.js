//version provisional, hay que ver q hace la catedra...

function generateDummyCard(id) {
  const cardTypes = ['Visa', 'Mastercard', 'American Express', 'Discover'];
  const cardColors = ['Blue', 'Gold', 'Platinum', 'Black'];

  return {
    id: id,
    cardNumber: Math.floor(Math.random() * 9000000000000000) + 1000000000000000,
    cardType: cardTypes[Math.floor(Math.random() * cardTypes.length)],
    cardColor: cardColors[Math.floor(Math.random() * cardColors.length)],
    expirationDate: `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 5) + 23}`,
    cvv: Math.floor(Math.random() * 900) + 100,
    balance: Math.floor(Math.random() * 10000) + 1000,
  };
}
    const dummyCards = Array.from({ length: 20 }, (_, index) => generateDummyCard(index + 1));

export default dummyCards;

 //export { generateDummyCard };
