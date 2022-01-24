let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  let modalContainer = document.querySelector("#pokemodal-container");

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
    let listItem = document.createElement("li");
    listItem.classList.add("list-unstyled");
    listItem.classList.add("group-list-item");

    //Button
    let buttonOne = document.createElement("button");
    buttonOne.innerText = pokemon.name;
    buttonOne.classList.add("button-style");

    //Bootstrap Button Styling
    /*buttonOne.classList.add("btn");
    buttonOne.classList.add("btn-primary");
    //End bootstrap styling*/

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
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
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
      showModal(pokemon);
    });
    //Modal Code starts here: Show Modal
    function showModal(pokemon) {

      //Clear all existing modal content
      modalContainer.innerHTML = '';

      //Creating modal guts
      let modal = document.createElement('div');
      modal.classList.add('modal');
    
      //Add new model content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener("click", hideModal);
  
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;
  
      let contentElement = document.createElement('p');
      contentElement.innerText = text;
  
      modal.appendChild(closeButtonElement);
      modal.appendChlid(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
  
      modalContainer.classList.add('isVisible');
    }
  
    function hideModal() {
      modalContainer.classList.remove("isVisible");
    }

    document.querySelector('#show-Modal').addEventListener('click', () =>
    {
      showModal('Modal title', 'These are modal guts!');
    });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classlist.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  return {
    //add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

/*pokemonRepository.loadList().then(function () {
  // data loaded
 pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});*/
