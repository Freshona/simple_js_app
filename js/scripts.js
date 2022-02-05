let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

 // let modalContainer = document.querySelector("#pokemodal-container");

  // adds new data to list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // displays array
  function getAll() {
    return pokemonList;
  }

  //DOM Manipulation
  function addListItem(pokemon) {
    let listPokemon = document.querySelector(".pokemon-list");
    let listItem = document.createElement("div");
    listItem.classList.add("col-md-3");
    listItem.classList.add("py-3");
    listItem.classList.add("d-grid");
    // listItem.classList.add("group-list-item");
    
    
    //Button
    let buttonOne = document.createElement("button");
    buttonOne.innerText = pokemon.name;
    buttonOne.classList.add("btn");
    buttonOne.classList.add("btn-warning");
    buttonOne.classList.add("btn-lg");
    buttonOne.setAttribute("data-bs-toggle","modal") /*this opens the modal on each clicked pokemon*/
    buttonOne.setAttribute("data-bs-target", "#exampleModal")


    listItem.appendChild(buttonOne); /*fixes  a button to list*/
    listPokemon.appendChild(listItem);

    //Button Event
    buttonOne.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }


  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
      //  console.log(json);
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          // console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //adding details to items
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon)
      showModal(pokemon);
    });}
    //Modal Code starts here: Show Modal
    function showModal(pokemon) {
      let modal = document.querySelector('.modal-body');

      //Clear all existing modal content
      modal.innerHTML = '';
      let titleElement = document.createElement('h1');
      titleElement.classList.add('text-uppercase')
      titleElement.innerText = pokemon.name;
  
      let contentElement = document.createElement('img');
      contentElement.src = pokemon.imageUrl;

      let heightElement = document.createElement('p');
      heightElement.innerText = `Height: ${pokemon.height}`;

      let typesElement = document.createElement('p');
      typesElement.innerText = `Types: ${pokemon.types.map(function(type){
        return type.type.name;
      }).join(', ')}`;

      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(heightElement);
      modal.appendChild(typesElement);
    }
    

  return {
    //add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  // data loaded
 pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
