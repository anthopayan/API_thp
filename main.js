/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Enter your API key in const key value !!!!!!!!!!!!!!!!!!!!!!! 
//                  |
//                  |
//                  |
//                 \|/
const key = "Your API KEY"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const textBody = document.querySelector("body");
textBody.style.color = "white"

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("main").style.marginLeft = "25%"; 
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

document.getElementById('open').addEventListener('click', () => {
  openNav();
  console.log("coucou");
});

document.getElementById('closed').addEventListener('click', () => {
  closeNav()
  console.log("bye bye");
});




var searchbtn = document.getElementById('searchbtn');
var searchuser = document.getElementById('searchuser');
document.getElementById('searchbtn').addEventListener('click', () => {
  var searchuser = document.getElementById('searchuser');
  var result = searchuser.value;
  var selector = document.getElementById('pic');
  selector.innerHTML = "";
  const url = 'http://www.omdbapi.com/?s='+result+ key;
  fetch(url)
  .then((response) => response.json()) 
  .then(function(response) {

      var len =  response.Search.length;
  
     
    for (let i = 0;  i < len; i++) {
      var result2= response.Search[i].imdbID;
      const url2 = 'http://www.omdbapi.com/?i='+result2+ key;
      fetch(url2)
      .then((response) => response.json()) 
      .then(function(response) {

  var title= response.Title;
  var year= response.Released;
  var Plot= response.Plot;
  var category= response.Genre;
  var picture= response.Poster;
  var number= i;
  var btnPopupid= 'btno'+i;
  var btnCloseid= 'btnc'+i;

  if (title == "N/A"){
    title = "Titre indisponible";
  }
  if (year == "N/A"){
    year = "Annee indisponible";
  }
  if (Plot == "N/A"){
    Plot = "Pas de description";
  }
  if (category == "N/A"){
    category == "Pas de categorie definie";
  }
  if (picture == "N/A"){
    picture = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY8v2awOf1xv7JVRGf1cUQBXv_GEYMX9Y9ng&usqp=CAU";
  }

  
  
  var selector = document.getElementById('pic');
  showMoovie(selector, title, year, category, picture, number, btnPopupid, btnCloseid, Plot);
    })
  }
})
AOS.init({
  duration: 1200,
})
});



const showMoovie = (selector, title, year, category, picture, number, btnPopupid, btnCloseid, Plot) => {
  selector.innerHTML += `

  <div class="col-sm-6 mb-11">
  <div class="card" data-aos="fade-right">
    <div class="card-body" data-aos="fade-right">
      <img  src="${picture}" alt="Card image cap">
        <h3>Titre: ${title}</h3>
        <p>Annee: ${year}</p>
        <input class="btn btn-primary" value="Afficher les informations" id='${btnPopupid} ' onClick="reply_click(this.id, ${number}, )">
      </div>
    </div>
    </div>

  <div id='${number}' class="overlay">
    <div id="popup"  class="popup" style="background-image: url('popup.jpg'); border-style: solid; border-color: 	#FFD700">
      <h1>
        Informations !
        <span id='${btnCloseid}' onClick="reply_click2(this.id, ${number},)" class="btnClose" >&times;</span>
      </h1>
      <h3>Titre: ${title}</h3>
      <p>Annee: ${year}</p>
      <p>Genre: ${category}</p>
      <img class="card-img-top"><img src="${picture}">
      <di importante !×v>
        <p>Description: ${Plot}</p>
      </div>
    </div>
  </div>
    `


}

function reply_click(clicked_id, number) {
  console.log(clicked_id);
  console.log(number);
  overlay = document.getElementById(number);
  overlay.style.display='block';
}

function reply_click2(clicked_id, number) {
  overlay = document.getElementById(number);
  overlay.style.display='none';
}


