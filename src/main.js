
async function fetchApi() {
  try {
    const response = await fetch(
      "https://opendata.paris.fr/explore/embed/dataset/arbresremarquablesparis/table/?basemap=jawg.dark&location=12,48.85653,2.34892&dataChart=eyJxdWVyaWVzIjpbeyJjaGFydHMiOlt7InR5cGUiOiJsaW5lIiwiZnVuYyI6IkFWRyIsInlBeGlzIjoiYXJicmVzX2lkYmFzZSIsInNjaWVudGlmaWNEaXNwbGF5Ijp0cnVlLCJjb2xvciI6IiMyNjM4OTIifV0sInhBeGlzIjoiZ2VucmUiLCJtYXhwb2ludHMiOiIiLCJ0aW1lc2NhbGUiOm51bGwsInNvcnQiOiIiLCJjb25maWciOnsiZGF0YXNldCI6ImFyYnJlc3JlbWFycXVhYmxlc3BhcmlzIiwib3B0aW9ucyI6e319fV0sImRpc3BsYXlMZWdlbmQiOnRydWUsImFsaWduTW9udGgiOnRydWUsInRpbWVzY2FsZSI6IiJ9"
    );
    const dataReturn = await response.json();
    console.log(dataReturn);

    const div = document.getElementById("app");
    for (let i=0; i < dataReturn.results.length; i++) {
      const liste = document.createElement("li"); 
      liste.innerHTML = `<h1>${dataReturn.results[i].arbres_libellefrancais}</h1><h3>${dataReturn.results[i].arbres_espece}</h3>`
      document.body.appendChild(liste);
    
    }


    /* return dataReturn */;
  } catch (error) {
    console.log(error);
  }
}

fetchApi();



