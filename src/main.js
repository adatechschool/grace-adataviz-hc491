async function fetchApi() {
  try {
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records?limit=20"
    );
    const dataReturn = await response.json();
    console.log(dataReturn);

    const div = document.getElementById("app");
    for (let i = 0; i < dataReturn.results.length; i++) {
      const liste = document.createElement("li");
      liste.innerHTML = `
      <h1>${dataReturn.results[i].arbres_libellefrancais}</h1>
      <h3>${dataReturn.results[i].com_annee_plantation}</h3>
      <h2>${dataReturn.results[i].com_resume}</h2>
      <p>${dataReturn.results[i].com_descriptif}</p>
      <img src="${dataReturn.results[i].com_url_photo1}" alt="Photo arbre remarquable" style="width:300px; height:auto;">`;
      document.body.appendChild(liste);
    }
    /* return dataReturn; */
  } catch (error) {
    console.log(error);
  }
}

fetchApi();
