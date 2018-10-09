const clone = require('clone')

let db = {}

const defaultData = {
  "1": {
    id: '1',
    firstname: 'Lucas',
    lastname: 'Kalinowski',
    email: 'lucas-cunico@hotmail.com',
    deleted: false,
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function get (token, id) {
  return new Promise((res) => {
    const obj = getData(token)
    res(
      obj[id].deleted
        ? {}
        : obj[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const list = getData(token)
    let keys = Object.keys(list)
    let filtered_keys = keys.filter(key => !list[key].deleted)
    res(filtered_keys.map(key => list[key]))
  })
}

function add (token, obj) {
  return new Promise((res) => {
    let list = getData(token)

    list[obj.id] = {
      id: obj.id,
      firstname: obj.firstname,
      lastname: obj.lastname,
      email: obj.email,
      deleted: false
    }

    res(list[obj.id])
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let list = getData(token)
      list[id].deleted = true
      res(list[id])
    })
}

function edit (token, id, obj) {
    return new Promise((res) => {
        let list = getData(token)
        for (prop in obj) {
            list[id][prop] = obj[prop]
        }
        res(list[id])
    })
}

module.exports = {
  get,
  getAll,
  add,
  disable,
  edit
}
