require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const myPerson = new Person({
    name: "Mico",
    age: 23,
    favoriteFoods: ["fried chicken"],
  });

  myPerson.save((err, data) => {
    if (err) console.log(err);
    console.log(data);
    done(null, data);
  });

};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then((data) => {
      console.log(data);
      done(null, data);
    });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName})
    .then((data) => {
      console.log(data);
      done(null, data);
    });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: [food]})
    .then((data) => {
      console.log(data);
      done(null, data);
    });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId})
    .then((data) => {
      console.log(data);
      done(null, data);
    })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (nothing, person) => {
    person.favoriteFoods.push(foodToAdd);
    person.save().then((data) => {
      console.log(data);
      done(null, data);
    })

  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true})
    .then((data) => {
      console.log(data);
      done(null, data);
    })
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId)
    .then((data) => {
      console.log(data);
      done(null, data);
    });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) =>{
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name : 1})
    .limit(2)
    .select({age: 0})
    .exec((err, data) => {
      console.log(data);
      done(err, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
