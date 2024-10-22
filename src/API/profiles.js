//version provisional, hay que ver q hace la catedra...

function generateDummyProfile(id) {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah'];
  const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  
  return {
    id: id,
    name: names[Math.floor(Math.random() * names.length)],
    surname: surnames[Math.floor(Math.random() * surnames.length)],
    age: Math.floor(Math.random() * 50) + 18,
    email: `user${id}@example.com`
  };
}

const dummyProfiles = Array.from({ length: 10 }, (_, index) => generateDummyProfile(index + 1));

export default dummyProfiles;

//export { generateDummyProfile };

