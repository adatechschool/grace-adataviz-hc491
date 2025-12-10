//Déclare une fonction asynchrone nommée fetchApi
async function fetchApi() {
  try {
    //va chercher des données sur internet et attend qu'elles arrivent avt de continuer
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records?limit=20"
    );
    const dataReturn = await response.json(); //lit la réponse et le convertit en objet JS décode le JSON/await car response.json() retourne une promesse
    console.log(dataReturn); //Affiche objet JSON dans la console (utile pour inspecter la structure des données)

    const div = document.getElementById("app"); // récupère dans la page l'élement HTML qui a id=app

    //création du CONTAINER principal
    const container = document.createElement("div");
    container.id = "container";
    div.appendChild(container);

    //création du CONTAINER pour la barre de recherche + suggestions
    const searchContainer = document.createElement("div");
    searchContainer.id = "search-container";
    container.appendChild(searchContainer);

    //création de la barre de recherche
    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.id = "search-bar";
    searchBar.placeholder = "Rechercher un type d'arbre...";
    /* searchContainer.appendChild(searchBar); */

    //création d'une div pour afficher les suggestions d'autocomplétion
    const suggestionsBox = document.createElement("div");
    suggestionsBox.id = "suggestions";
    /* searchContainer.appendChild(suggestionsBox); */

    //création du wrapper pour englober l'input+ suggestions
    const inputWrapper = document.createElement("div");
    inputWrapper.id = "input-wrapper";
    inputWrapper.appendChild(searchBar);
    inputWrapper.appendChild(suggestionsBox);
    searchContainer.appendChild(inputWrapper);

    // création du bouton 'rechercher'
    const searchButton = document.createElement("button");
    searchButton.textContent = "Rechercher";
    searchContainer.appendChild(searchButton);

    // création d'une div pour afficher les résultats de la recherche(cartes d'arbres)
    const resultsContainer = document.createElement("div");
    resultsContainer.id = "results";
    container.appendChild(resultsContainer);

    // suggestions quand on tape ds l'input
    searchBar.addEventListener("input", () => {
      const term = searchBar.value.toLowerCase();
      suggestionsBox.innerHTML = ""; // vide le conteneur avant de le remplir a nouveau
      if (term.length < 1) return;
      const suggestions = dataReturn.results.filter(
        (
          arbre // on filtre sur nom et adresse seulement
        ) =>
          arbre.arbres_libellefrancais.toLowerCase().includes(term) ||
          arbre.arbres_adresse.toLowerCase().includes(term)
      );

      // affiche 8 suggestions au max
      suggestions.slice(0, 8).forEach((arbre) => {
        const option = document.createElement("div");
        option.classList.add("suggest-item");

        // affiche nom + adresse dans la suggestion
        option.innerHTML = `<strong>${arbre.arbres_libellefrancais}</strong> - ${arbre.arbres_adresse} - ${arbre.arbres_arrondissement}`;

        option.addEventListener("click", () => {
          searchBar.value = arbre.arbres_libellefrancais;
          suggestionsBox.innerHTML = "";
          displayResults([arbre]); // affiche seulement la fiche sélectionnée
        });

        suggestionsBox.appendChild(option);
      });
    });

    // fonction pour afficher les résultats
    function displayResults(results) {
      resultsContainer.innerHTML = ""; //vide les résultats précédents
      for (let i = 0; i < results.length; i++) {
        const liste = document.createElement("li"); // crée un élément <li> en mémoire ( pas encore inséré dans le DOM)
        liste.classList.add("card");

        liste.innerHTML = `
    <img src="${results[i].com_url_photo1}" alt="Photo arbre remarquable">
    <div class="card-content">
      <h1>${results[i].arbres_libellefrancais}</h1>
      <h3>${results[i].com_annee_plantation}</h3>
      <p>${results[i].arbres_adresse}</p>
      <p>${results[i].arbres_arrondissement}</p>
      <button class="voir-plus-btn">Voir Plus</button>
      <p class="description" style="display:none;">${results[i].com_descriptif}</p>
      </div>
      `;
        /* document.body.appendChild(liste); */
        const bouton = liste.querySelector(".voir-plus-btn");
        const description = liste.querySelector(".description");

        bouton.addEventListener("click", () => {
          // qd on clique, on vérifie l'état d'affichage de 'description' et on bascule (block <-> none) et on met à jour le texte du bouton 'voir plus' 'voir moins'
          if (description.style.display === "none") {
            description.style.display = "block"; //rend visible la description
            bouton.textContent = "Voir Moins"; // change le libellé du bouton
          } else {
            description.style.display = "none"; // cache de nouveau
            bouton.textContent = "Voir Plus"; // et remet le texte initial
          }
        });

        resultsContainer.appendChild(liste);
      }
    }

    displayResults(dataReturn.results); //affiche tous les résultats au chargement

    searchButton.addEventListener("click", () => {
      const searchTerm = searchBar.value.toLowerCase();
      const filterResults = dataReturn.results.filter(
        (arbre) =>
          arbre.arbres_libellefrancais.toLowerCase().includes(searchTerm) ||
          arbre.arbres_adresse.toLowerCase().includes(searchTerm) ||
          arbre.arbres_arrondissement.toLowerCase().includes(searchTerm)
      );
      displayResults(filterResults);
      suggestionsBox.innerHTML = ""; // on vide et cache les suggestions
    });

    /* return dataReturn; */
  } catch (error) {
    // si une erreur survient dans le try ( ex fetch echoue), on la capture et on l'affiche dans la console
    console.log(error);
  }
}

fetchApi();
