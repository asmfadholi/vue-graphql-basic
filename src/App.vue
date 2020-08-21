<template>
  <div id="app">
    <h3>Example</h3>
    <div>
      Data Language: {{ example1 }}
      <br>
      Data Champions : {{ JSON.stringify(champions) }}
      <br>
      Data Champion : {{ JSON.stringify(champion) }}
    </div>
    <button @click="getLanguage">Get Language</button>
    <button @click="getChampions">Get Champions</button>
    <button @click="getChampionByName">Get Champion</button>
    <div>
      <h3>Example Mutation</h3>
      Name: <input v-model="name">
      Attack Damage: <input v-model.number="attack">
      <div>
        Data:
        {{ updatedChampion }}
      </div>
      <button @click="updateAttackDamage">Update Champion</button>
    </div>
    <hr> 
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      example1: '',
      champions: null,
      champion: '',
      name: '',
      attack: null,
      updatedChampion: null
    }
  },
  methods: {
    async updateAttackDamage () {
      const res = await axios.post('http://localhost:4000/graphql', {
        query: `
        mutation UpdateAttackDamage($championName: String!, $attackDamage: Float) {
          updateAttackDamage(name: $championName, attackDamage: $attackDamage) {
            name
            attackDamage
          }
        }`,
        variables: {
          championName: this.name,
          attackDamage: this.attack
        }
      })
      this.updatedChampion = res.data.data.updateAttackDamage
    },
    async getLanguage () {
      try {
        const res = await axios.post(
          'http://localhost:4000/graphql', {
          query: '{ language }'
        })
        // console.log(res.data.data)
        this.example1 = res.data.data.language
      } catch (e) {
        console.log('err', e)
      }
    },
    async getChampions () {
      const res = await axios.post(
        'http://localhost:4000/graphql', {
        query: `{
          getChampions {
            name
          }
        }`
      })
      this.champions = res.data.data.getChampions
    },
    async getChampionByName () {
      const res = await axios.post('http://localhost:4000/graphql', {
        query: `
          query GetChampionByName($championName: String!) {
            getChampionByName(name: $championName) {
              name
              attackDamage
            }
          }`,
          variables: {
            championName: 'Ashe'
          }
      })
      this.champion = res.data.data.getChampionByName
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
