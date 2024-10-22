//version provisional, hay que ver q hace la catedra...

function generateDummyMovement(id) {
  const types = ['Deposit', 'Withdrawal', 'Transfer', 'Payment'];
  const descriptions = ['Salary', 'Rent', 'Groceries', 'Utilities', 'Entertainment', 'Travel'];

  return {
    id: id,
    type: types[Math.floor(Math.random() * types.length)],
    amount: Math.floor(Math.random() * 1000) + 10,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    cardId: Math.floor(Math.random() * 20) + 1,
  };
}

const dummyMovements = Array.from({ length: 50 }, (_, index) => generateDummyMovement(index + 1));

export default dummyMovements;

//export { generateDummyMovement };
