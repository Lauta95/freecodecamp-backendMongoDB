require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let lautaro = new Person({ name: 'Lautaro', age: 28, favoriteFoods: ['Asado'] })

  lautaro.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      done(null, data);
    }
  })
};
// data: cuando es exitosamente escrito en la db retorna esta data, a la cual podemos fácilmente ingresar


const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, createdPeople) => {
    // crea estos modelos y los guarda en la db. Luego podés correr esta función que podes mostrar un error y la gente creada si es que fueron creadas
    if (err) {
      console.log(err);
    } else {
      done(null, createdPeople)
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) {
      console.log(err);
    } else {
      done(null, personFound);
    }
  })
};

const findOneByFood = (food, done) => {
  // Person es el modelo, .findeOne es el método
  Person.findOne({ favoriteFoods: { $all: [food] } }, (err, data) => {
    // va a buscar en el campo favoriteFoods de todos los records y va a buscar entre todas las comidas que le pasas [food]
    if (err) {
      console.log(err);
    } else {
      done(null, data);
      // el null es el error, que al no haber error debido al uso del condicional, se le pasa un null
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, actualizado) => {
      if (err) return console.log(err);
      done(null, actualizado);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // -findOneAndUpdate uses ( conditions , update , options , callback ) as arguments.
  //  -You should return the updated document. To do that, you need to pass the options document { new: true } as the 3rd argument
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, data) => {
    if (err) return console.log(err);
    done(null, data)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
