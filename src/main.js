async function fetchApi() { //Déclare une fonction asynchrone nommée fetchApi
  try {
    const response = await fetch( // on attend la réponse réseau avant de continuer
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records?limit=20"
    );
    const dataReturn = await response.json(); //lit la réponse et le convertit en objet JS décode le JSON/await car response.json() retourne une promesse
    console.log(dataReturn); //Affiche objet JSON dans la console (utile pour inspecter la structure des données)

    const div = document.getElementById("app"); // récupère dans la page l'élement HTML qui a id=app

    for (let i = 0; i < dataReturn.results.length; i++) { //boucle pour parcourir l'API
      const liste = document.createElement("li"); // crée un élément <li> en mémoire ( pas encore inséré dans le DOM)
      liste.innerHTML = `
      <h1>${dataReturn.results[i].arbres_libellefrancais}</h1>
      <h3>${dataReturn.results[i].com_annee_plantation}</h3>
      <h2>${dataReturn.results[i].com_resume}</h2>
      <img src="${dataReturn.results[i].com_url_photo1}" alt="Photo arbre remarquable" style="width:300px; height:auto;">`;
      /* document.body.appendChild(liste); */
      const description = document.createElement("p"); // crée un <p> qui contient la description
      description.textContent = dataReturn.results[i].com_descriptif; // place le texte de la description dans le paragraphe. Textcontent est sûr car insère du texte brut et pas du HTML
      description.style.display = "none"; // cache la description par défaut ( elle n'apparaitra pas tant qu'on ne change pas de style)

      const bouton = document.createElement("button"); // crée un élément <button>
      bouton.textContent = "Voir Plus"; // texte affiché sur le bouton
      bouton.addEventListener("click", () => { // qd on clique, on vérifie l'état d'affichage de 'description' et on bascule (block <-> none) et on met à jour le texte du bouton 'voir plus' 'voir moins'
        if (description.style.display === "none") {  // vérifie si le style inline 'display' vaut 'none'
          description.style.display = "block"; //rend visible la description
          bouton.textContent = "Voir Moins";  // change le libellé du bouton
        } else { // sinon
          description.style.display = "none"; // cache de nouveau 
          bouton.textContent = "Voir Plus";  // et remet le texte initial
        }
      });
      liste.appendChild(description); //ajoute le <p> description à l'intérieur du <li>
      /* document.body.appendChild(bouton); */
      liste.appendChild(bouton); // ajoute le bouton dans le <li>
      /* document.body.appendChild(liste); */
      div.appendChild(liste);
    }

    /* return dataReturn; */
  } catch (error) { // si une erreur survient dans le try ( ex fetch echoue), on la capture et on l'affiche dans la console
    console.log(error);  //
  }
}

fetchApi(); // appel de la fonction 
