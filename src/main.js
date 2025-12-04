async function fetchApi() {
  //Déclare une fonction asynchrone nommée fetchApi
  try {
    const response = await fetch(
      // on attend la réponse réseau avant de continuer
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records?limit=20"
    );
    const dataReturn = await response.json(); //lit la réponse et le convertit en objet JS décode le JSON/await car response.json() retourne une promesse
    console.log(dataReturn); //Affiche objet JSON dans la console (utile pour inspecter la structure des données)

    const div = document.getElementById("app"); // récupère dans la page l'élement HTML qui a id=app

    const container = document.createElement("div"); //création du container pour l'input barre de recherche
    container.id = "container";
    div.appendChild(container);
    const searchContainer = document.createElement("div");
    searchContainer.id = "search-container";
    container.appendChild(searchContainer);
    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.id = "search-bar";
    searchContainer.appendChild(searchBar);
    const resultsContainer = document.createElement("div");
    resultsContainer.id = "results";
    container.appendChild(resultsContainer);
    const searchButton = document.createElement("button"); // création du bouton "rechercher"
    searchButton.textContent = "Rechercher";
    searchContainer.appendChild(searchButton);

    function displayResults(results) {
      // fonction pour afficher les résultats filtrés ou non
      resultsContainer.innerHTML = ""; //vide les résultats précédents
      for (let i = 0; i < results.length; i++) {
        //boucle pour parcourir l'API
        const liste = document.createElement("li"); // crée un élément <li> en mémoire ( pas encore inséré dans le DOM)
        liste.innerHTML = `
      <h1>${results[i].arbres_libellefrancais}</h1>
      <h3>${results[i].com_annee_plantation}</h3>
      <h2>${results[i].arbres_adresse}</h2>
      <h2>${results[i].arbres_arrondissement}</h2>
      <img src="${results[i].com_url_photo1}" alt="Photo arbre remarquable" style="width:300px; height:auto;">`;
        /* document.body.appendChild(liste); */
        const description = document.createElement("p"); // crée un <p> qui contient la description
        description.textContent = results[i].com_descriptif; // place le texte de la description dans le paragraphe. Textcontent est sûr car insère du texte brut et pas du HTML
        description.style.display = "none"; // cache la description par défaut ( elle n'apparaitra pas tant qu'on ne change pas de style)

        const bouton = document.createElement("button"); // crée un élément <button>
        bouton.textContent = "Voir Plus"; // texte affiché sur le bouton
        bouton.addEventListener("click", () => {
          // qd on clique, on vérifie l'état d'affichage de 'description' et on bascule (block <-> none) et on met à jour le texte du bouton 'voir plus' 'voir moins'
          if (description.style.display === "none") {
            // vérifie si le style inline 'display' vaut 'none'
            description.style.display = "block"; //rend visible la description
            bouton.textContent = "Voir Moins"; // change le libellé du bouton
          } else {
            // sinon
            description.style.display = "none"; // cache de nouveau
            bouton.textContent = "Voir Plus"; // et remet le texte initial
          }
        });
        liste.appendChild(description); //ajoute le <p> description à l'intérieur du <li>
        /* document.body.appendChild(bouton); */
        liste.appendChild(bouton); // ajoute le bouton dans le <li>
        /* document.body.appendChild(liste); */
        /*  div.appendChild(liste); */
        resultsContainer.appendChild(liste);
      }
    }

    displayResults(dataReturn.results); //affiche tous les résultats au chargement

    searchButton.addEventListener("click", () => {
      const searchTerm = searchBar.value.toLowerCase();
      const filterResults = dataReturn.results.filter(
        (arbre) =>
          arbre.arbres_libellefrancais.toLowerCase().includes(
            searchTerm
          ) ||
          arbre.arbres_adresse.toLowerCase().includes(
            searchTerm
          ) ||
          arbre.arbres_arrondissement.toLowerCase().includes(
            searchTerm
          )
      );
      displayResults(filterResults);
    });

    /* return dataReturn; */
  } catch (error) {
    // si une erreur survient dans le try ( ex fetch echoue), on la capture et on l'affiche dans la console
    console.log(error); //
  }
}

fetchApi(); // appel de la fonction
