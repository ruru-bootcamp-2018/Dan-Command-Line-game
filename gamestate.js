const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')
const db = require('./db')

let currentPlayer = {
  "name": "test",
  "current scene": 0,
  "visited scenes": [0],
  "progress": {
    "is alive": true,
  },
  "inventory": {
    "cool dog": "a cool dog",
    "dogshead": "a head",
    "dog toy": "a dog"
    
  },

  "itemsUsed": ["fairy"]
}

function moveScene(words) {
  currentPlayer["current scene"] = 1
}

function getItem(name) {
  db.getItem(name).then(item => {
    currentPlayer.inventory[item.name] = item.description
  })
}

function loseItem(name) {
  currentPlayer.itemsUsed.push(name)
  delete currentPlayer.inventory[name]
}

function getProgress(progress) {
  currentPlayer.progress[progress] = true
}

function loseProgress(progress) {
  currentPlayer.progress[progress] = false
}

async function asyncTestCall() {
  await newPlayer('dan')
  console.log(currentPlayer)
}

function newPlayer(name) {
  return new Promise(resolve => {
    let newPlayer = {
      "name": name,
      "current scene": 0,
      "visited scenes": [0],
      "progress": {
        "is alive": true,
      },
      "inventory": {

      },
      "itemsUsed": []
    }
    loadJsonFile('gamestate.json').then(data => {
      data.players.push(newPlayer)
      currentPlayer = newPlayer
      writeJsonFile('gamestate.json', data).then(() => {
        resolve()
      })
    })
  })
}

function loadPlayer(name) {
  loadJsonFile('gamestate.json').then(data => {
    currentPlayer = data.Player.find(x => x.name == name)
  })
}

function savePlayer(name) {
  loadJsonFile('gamestate.json').then(data => {
    let pulledData = data.players.find(x => x.name == name)
    Object.assign(pulledData, currentPlayer)
    writeJsonFile('gamestate.json', data).then(() => {})

  })
}



//// promise rejections

module.exports = {
  currentPlayer,
  savePlayer,
  loadPlayer,
  newPlayer,
  getItem,
  loseItem,
  getProgress,
  loseProgress,
  moveScene
}