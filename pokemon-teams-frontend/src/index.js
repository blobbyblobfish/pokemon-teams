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
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul> ${unpackPokemons(trainer.pokemons)}</ul>
        `
        trainerContainer.append(trainerDiv)
    }

    function createPokemon(pokemonObj) {
        const pokemonLi = document.createElement("li")
        pokemonLi.innerHTML = `
        ${pokemonObj.nickname} (${pokemonObj.species}) <button class="release" data-pokemon-id="${pokemonObj.id}">Release</button>
        `
        
        return pokemonLi
    }

     

    function unpackPokemons(pokemons) {
        const pokemonUl = document.createElement("ul")
        
        pokemons.forEach(pokemon => {
            pokemonUl.append(createPokemon(pokemon))
        })

        console.log(pokemonUl)
        return pokemonUl.innerHTML
    }


    //Add a pokemon to the db, and show it under the trainer
        //click listener to add pokemon button
        //count if the trainer has 6 or more pokemons
            // if yes, show error
            // if no, post fetch for a new pokemon
                //render the new pokemon, append it to the ul


    document.addEventListener('click', (e) => {
        if (e.target.textContent === "Add Pokemon"){
            const trainerCard = e.target.parentNode
            const ul = trainerCard.querySelector("ul")
            const teamSize = ul.childElementCount
            if (teamSize === 6) { 
                window.alert ("Your Team is Full")
            } else {
                fetch(POKEMONS_URL, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json", 
                        "accept": "application/json"
                    }, body: JSON.stringify({
                        "trainer_id": `${trainerCard.dataset.id}`
                    })
                
                })
                .then(resp => resp.json())
                .then(json => createPokemon(json))
                .then(li => appendPokemon(li))
            }

            function appendPokemon(li){
                ul.appendChild(li)
            }
            

            console.dir(ul)
        }

        

        
    })

    

     
})

