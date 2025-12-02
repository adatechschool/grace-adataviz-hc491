async function fetchApi() {  //Déclare une fonction asynchrone nommée fetchApi
  try {
    const response = await fetch(  // on attend la réponse réseau avant de continuer
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records?limit=20"
    );
    const dataReturn = await response.json(); //lit la réponse et le convertit en objet JS décode le JSON/await car response.json() retourne une promesse
    console.log(dataReturn); //Affiche objet JSON dans la console (utile pour inspecter la structure des données)

    const div = document.getElementById("app");

    for (let i = 0; i < dataReturn.results.length; i++) {
      const liste = document.createElement("li");
      liste.innerHTML = `
      <h1>${dataReturn.results[i].arbres_libellefrancais}</h1>
      <h3>${dataReturn.results[i].com_annee_plantation}</h3>
      <h2>${dataReturn.results[i].com_resume}</h2>
      <img src="${dataReturn.results[i].com_url_photo1}" alt="Photo arbre remarquable" style="width:300px; height:auto;">`;
      /* document.body.appendChild(liste); */
      const description = document.createElement("p");
      description.textContent = dataReturn.results[i].com_descriptif;
      description.style.display = "none";

      const bouton = document.createElement("button");
      bouton.textContent = "Voir Plus";
      bouton.addEventListener("click", () => {
        if (description.style.display === "none") {
          description.style.display = "block";
          bouton.textContent = "Voir Moins";
        } else {
          description.style.display = "none";
          bouton.textContent = "Voir Plus";
        }
      });
      liste.appendChild(description);
      /* document.body.appendChild(bouton); */
      liste.appendChild(bouton);
      document.body.appendChild(liste);
    }

    /* return dataReturn; */
  } catch (error) {
    console.log(error);
  }
}

fetchApi();
