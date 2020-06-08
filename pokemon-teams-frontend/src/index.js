const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

    //Get all trainers and their pokemon
        // get trainer object
        // pass that as an argument
        // create a new div element
        // fill element with trainer object
        // append to big div

    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
        createTrainers(trainers)
    })

    function createTrainers(trainers){
        trainers.forEach(trainer => {
            createTrainer(trainer)
        })
    }

    function createTrainer(trainer) {
        const trainerDiv = document.createElement("div")
        const trainerContainer = document.querySelector("main")
        trainerDiv.className = "card"
        trainerDiv.dataset.id = `${trainer.id}`
        trainerDiv.innerHTML = `
        <p>${trainer.name}</p>
        <button data-trainer-id="1">Add Pokemon</button>
        <ul> ${unpackPokemons(trainer.pokemons)}</ul>
        `
        trainerContainer.append(trainerDiv)
    }

    function unpackPokemons(pokemons) {
        const pokemonUl = document.createElement("ul")
        
        pokemons.forEach(pokemon => {
            const pokemonLi = document.createElement("li")
            pokemonLi.innerHTML = `
            ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
            `
            pokemonUl.append(pokemonLi)
        })

        console.log(pokemonUl)
        return pokemonUl.innerHTML
    }

})

