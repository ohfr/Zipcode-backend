const db = require('./db-config');

module.exports = {
    find,
    findByZip,
    findByCity,
    add,
    deleteID
}

//resolves to an array of zips
function find() {
    return db('zip')
}


//resolves to an array of one zip without .first
function findByZip(zip) {
    return db('zip').where({ zip }).first();
}

function findByCity(city) {
    if (city.includes("-")) {
        const spacedCityArr = city.split("-");
        const upperArr = spacedCityArr.map(cur => {
            return cur.replace(/^\w/, chr => {
                return chr.toUpperCase();
            })
        })
        const spacedCity = upperArr.join(" ");
        return db('zip').where({ city: spacedCity })

    } else {
        const capitalCity = city.split('');
        const newCity = capitalCity.map((cur, index) => {
            return index === 0 ?  cur.toUpperCase() : cur.toLowerCase();
        })
        const actualCity = newCity.join('');
        return db('zip').where({ city: actualCity })
    }
}

function add(city) {
   return db('zip').insert({id: city.id, city: city.city, zip: city.zip, delivery: city.delivery})
        .then(result => {
            return find()
        })
        .catch(err => {
            console.log("Error adding city from helper")
        })
}

function deleteID(id) {
    return db('zip').where({ id }).del()
        .then(result => {
            return find()
        })
        .catch(err => {
            console.log("error deleting city")
        })
        
}