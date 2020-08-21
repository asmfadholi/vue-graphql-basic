const express = require('express')
const { graphql, buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const Champion = require('./champion.js')

const champions = [
  new Champion('Ashe', 100),
  new Champion('Vayne', 200)
]

const schema = buildSchema(`
  type Query {
    language: String
    getChampions: [Champion]
    getChampionByName(name: String!): Champion
  }

  type Mutation {
    updateAttackDamage(name: String!, attackDamage: Float): Champion
  }

  type Champion {
    name: String
    attackDamage: Float
  }
`)

const rootValue = {
    language: () => 'Colek',
    getChampions: () => champions,
    getChampionByName: ({ name }) => {
      return champions.find(x => x.name === name)
    },

    updateAttackDamage: ({ name, attackDamage = 150 }) => {
      const champion = champions.find(x => x.name === name)
      champion.attackDamage = attackDamage
      return champion
    }
}

const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))
app.listen(4000, () => console.log('Listening on 4000'))