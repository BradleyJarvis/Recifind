function randomList(){
  var ul = document.querySelector(".list");
  for (var i = 0; i < ul.children.length; i++) {
      ul.appendChild(ul.children[Math.random() * i | 0]);
  }
}

function randomHorizontalList(){
  var ul = document.querySelector(".list#horizontal");
  var counter = 1;
  var trueCounter = 0;
  var n = false;
  for (var i = 0; i < ul.children.length; i++) {
      var str = ul.children[i].innerHTML;
      n = str.includes("check");
      if (n == true){
        ul.insertBefore(ul.children[i], ul.children[trueCounter]);
        trueCounter++;
        console.log("True: " + trueCounter)
      }
      // else{
      //   var random = Math.random() * i | 0;
      //   console.log("Random " + random)
      //   while (random < trueCounter){
      //     random = Math.random() * i | 0;
      //     counter ++;
      //     if (counter > 4){
      //       random = 4;
      //       console.log("Forced Random")
      //     }
      //   }
      //   ul.appendChild(ul.children[random]);
      // }
      counter++;
  }
}

function buttonClicked(id){
  var button = document.querySelector(".small_button#" + id);
  button.setAttribute("data-icon", "check");
  document.location.href = "#list"
  window.setTimeout(randomHorizontalList(), 1000);
  searchAPI(button.innerHTML)
  console.log(button.innerHTML)
}

function smallButtonClicked(id){
  console.log("Click")
  var button = document.querySelector(".small_button#" + id);
  var x = button.getAttribute("data-icon");
  console.log(x)
  if (x == "check"){
    console.log("remove")
    button.setAttribute("data-icon", "");
    randomHorizontalList();
    $( document ).ready(function() {
    console.log( "ready!" );
    $( ".small_button#"+id).button( "refresh" );
    });
  }
  else{
    console.log("add")
    button.setAttribute("data-icon", "check");
    randomHorizontalList();
  }
}

function searchAPI(x) {
    console.log(x)
    var the_url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?nstructionsRequired=true&limitLicense=false&number=20&offset=0&query="+x+"&type=main+course"
    var txt = ''
    console.log(txt)
    $.ajax({
      url: the_url,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      beforeSend: function(xhr) {xhr.setRequestHeader("X-Mashape-Key", "rBeAkVcqGmmshgFTu1Pqexj4uiB1p1IgpMFjsnPvEo4YkjvbX4");},
      success: function(data) {
        //console.log(data)
        informationAPI(data);
        for (i in data.results){
          //console.log(data.results[i])
          //console.log(data.results[i].title)
          txt += "<li class='ui-li-has-thumb'><a onclick='getRecipe("+i+")' href='#recipe' class='ui-btn ui-btn-icon-right ui-icon-carat-r' id="+data.results[i].id+"><img src='https://spoonacular.com/recipeImages/"+data.results[i].image + "'><h2>" + data.results[i].title + "</h2></a></li>";
        }
        document.getElementById("searchResults").innerHTML = txt;
      }
    });
}

var global_data

function informationAPI(x){
  console.log(x)
  var txt = ''
  for(i in x.results){
    txt += x.results[i].id +",";
  }
  console.log(txt)
  var the_url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids="+txt+"&includeNutrition=false"

  $.ajax({
    url: the_url,
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function(xhr) {xhr.setRequestHeader("X-Mashape-Key", "rBeAkVcqGmmshgFTu1Pqexj4uiB1p1IgpMFjsnPvEo4YkjvbX4");},
    success: function(data) {
      global_data = data
      for(i in data){
          if(data[i].glutenFree == true){
            console.log('TRUE')
            document.getElementById(data[i].id).style.backgroundColor = "#ffdb4d";
          }
      }
    }
  });
}

function getRecipe(x){
  console.log(global_data)
  var txt = "<img src="+global_data[x].image+">"
  document.getElementById("image").innerHTML = txt;
  txt = "<h2>"+global_data[x].title+"</h2><p>Ready in: "+global_data[x].readyInMinutes+" minutes</p>"
  document.getElementById("title").innerHTML = txt;
  txt = '<b>Ingredients</b>';
  for(i in global_data[x].extendedIngredients){
    txt += "<li>"+global_data[x].extendedIngredients[i].originalString+"</li>"

  }
  document.getElementById("ingredients").innerHTML = txt;
  txt = "<ol id='instructionList'><b>Instructions</b><li>"+global_data[x].instructions.split(".").join(".</li><li>")
  document.getElementById("instructions").innerHTML = txt;
  list = document.getElementById("instructionList");
  list.removeChild(list.lastChild);
}
