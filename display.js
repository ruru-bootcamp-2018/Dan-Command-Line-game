const chalk = require('chalk');
const figlet = require('figlet');
const db = require('./db');
const commandLineUsage = require('command-line-usage');
const data = require('./gamestate');



var cell = "█"
player = chalk.white.bold("█")
header1 = "    N  "
header2 = "  N  "

const firstLayer = ({northwest,north,northeast}) => `${northwest ? cell : ' '} ${north ? cell : ' '} ${northeast ? cell : ' '}\n   `
const firstRoutes = ({northwest,north,northeast}) => `${northwest ? "╲" : " "}${north ? "│" : " "}${northeast ?  "╱" : " "}\n  `
const middleLayer = ({east,west}) => `${west ? cell + "―" + player : "  " + player}${east ? "―" + cell : "  "}\n   `
const bottomLayer = ({southwest,south,southeast}) => `${southwest ? "╱" : " "}${south ? "│" : " "}${southeast ? "╲" : " "}\n  `
const bottomRoutes = ({southwest,south,southeast}) => `${southwest ? cell : " "} ${south ? cell : " "} ${southeast ? cell : " "}\n`



function printMap(scene) {
  var map = "\n  "

  map += firstLayer(scene)
  map += firstRoutes(scene)
  map += middleLayer(scene)
  map += bottomLayer(scene)
  map += bottomRoutes(scene)

 let header = scene.map_header || header1

  console.log(chalk.red(header + map))

}

function printInventory() {
  let sections = [{
      header: 'Inventory',
    },
    {
      content: {
        options: {},
        data: [{
            col: '{bold.keyword("gold") rusty key:}',
            col2: 'a key to the gardens'
          },
          {
            col: '{bold.keyword("gold") dogs head:}',
            col2: 'picked up from dogtown, it makes your stomach turn'
          }
        ]
      }
    },
  ]
  let items = Object.keys(data.currentPlayer.inventory)
  descriptions = Object.values(data.currentPlayer.inventory)
  if (!items.length) {
    sections[1].content.data.push({
      col: `{bold.keyword("brown") Your pack contains no items. }`,
      col2: ""
    })
  } else {
    for (let i = 0; i < items.length; i++) {
      sections[1].content.data.push({
        col: `{bold.keyword("gold") ${items[i]}: }`,
        col2: descriptions[i]
      })
    }
  }
  usage = commandLineUsage(sections)
  console.log(usage)
}

function printScene(scene) {
  let sections = [{
    header: `  ${chalk.yellow.bold(scene.name)}` ,
  },
  {
    content: {
      options: {},
      data: [{
          col: `{bold.keyword("white") ${scene.description} }`,
        },
      ]
    }
  },
]
  usage = commandLineUsage(sections)
  console.log(usage) 

}


function titleFont(text) {
  console.log(chalk.red(
    figlet.textSync(text, {
      font: 'Epic',
      horizontalLayout: 'full'
    })))
}


function printAnswer (answer) {
  console.log(chalk.white.bold(answer))
}





module.exports = {
  printMap,
  printAnswer,
  printScene,
  titleFont,
  printInventory

}