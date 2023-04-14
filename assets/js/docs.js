fetch("https://meowfacts.herokuapp.com/").then(function (response) {
    response.json().then(function (data) {
      var catFact = data.data[0];
      console.log("test")
      var catSec = document.querySelector("#cat-facts");
      var catP = document.createElement("p");
      catP.textContent = `Daily cat fact: ${catFact}`;
      catSec.appendChild(catP)
    });
  });