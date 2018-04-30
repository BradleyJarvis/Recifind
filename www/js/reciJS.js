function randomList(){
  var ul = document.querySelectorAll(".random");
  var test
  console.log(ul)
  for(var i = 0; i < ul.length; i++){
    test = ul[i]
    console.log(i)
    console.log(test)
    for (var j = 0; j < test.children.length; j++) {
        test.appendChild(test.children[Math.random() * j | 0]);
      }
  }
}

function toggleCuisine(id){
  console.log("Click")
  var button = document.querySelectorAll('#'+id)
  if(button[0].classList.contains('ui-icon-check')){
    button[0].setAttribute("class", "ui-btn resiBtn cuisine");
    button[1].setAttribute("class", "ui-btn resiBtn cuisine");
  }
  else{
    var temp = document.querySelectorAll('.ui-icon-check.cuisine')
    if(temp != null){
      for (var i = 0; i < temp.length; i++){
        temp[i].setAttribute('class', 'ui-btn resiBtn cuisine');
      }
    }
    button[0].setAttribute("class", "ui-btn ui-icon-check ui-btn-icon-left resiBtn cuisine");
    button[1].setAttribute("class", "ui-btn ui-icon-check ui-btn-icon-left resiBtn cuisine");
  }
}

function toggleCourse(id){
  console.log("Click")
  var button = document.querySelectorAll('#'+id)
  if(button[0].classList.contains('ui-icon-check')){
    button[0].setAttribute("class", "ui-btn resiBtn course");
    button[1].setAttribute("class", "ui-btn resiBtn course");
  }
  else{
    var temp = document.querySelectorAll('.ui-icon-check.course')
    if(temp != null){
      for (var i = 0; i < temp.length; i++){
        temp[i].setAttribute('class', 'ui-btn resiBtn course');
      }
    }
    button[0].setAttribute("class", "ui-btn ui-icon-check ui-btn-icon-left resiBtn course");
    button[1].setAttribute("class", "ui-btn ui-icon-check ui-btn-icon-left resiBtn course");
  }
}

function toggleMain(id){
  console.log("Click")
  var button = document.querySelectorAll('#'+id)
  if(button[0].classList.contains('ui-icon-check')){
    button[0].setAttribute("class", "ui-btn resiBtn main");
    button[1].setAttribute("class", "ui-btn resiBtn main");
  }
  else{
    var temp = document.querySelectorAll('.ui-icon-check.main')
    if(temp != null){
      for (var i = 0; i < temp.length; i++){
        temp[i].setAttribute('class', 'ui-btn resiBtn main');
      }
    }
    button[0].setAttribute("class", "ui-btn ui-icon-check ui-btn-icon-left resiBtn main");
    button[1].setAttribute("class", "ui-btn ui-icon-check ui-btn-icon-left resiBtn main");
  }
}

function toggleBase(id){
  console.log("Click")
  var button = document.querySelectorAll('#'+id)
  if(button[0].classList.contains('ui-icon-check')){
    button[0].setAttribute("class", "ui-btn resiBtn base");
    button[1].setAttribute("class", "ui-btn resiBtn base");
  }
  else{
    var temp = document.querySelectorAll('.ui-icon-check.base')
    if(temp != null){
      for (var i = 0; i < temp.length; i++){
        temp[i].setAttribute('class', 'ui-btn resiBtn base');
      }
    }
    button[0].setAttribute("class", "ui-btn ui-icon-check ui-btn-icon-left resiBtn base");
    button[1].setAttribute("class", "ui-btn ui-icon-check ui-btn-icon-left resiBtn base");
  }
}

function toggleDiet(id){
  console.log("Click")
  var button = document.querySelectorAll('#'+id)
  if(button[0].classList.contains('ui-icon-check')){
    button[0].setAttribute("class", "ui-btn resiBtn diet");
    button[1].setAttribute("class", "ui-btn resiBtn diet");
  }
  else{
    button[0].setAttribute("class", "ui-btn ui-icon-check ui-btn-icon-left resiBtn diet");
    button[1].setAttribute("class", "ui-btn ui-icon-check ui-btn-icon-left resiBtn diet");
  }
}

function alertDissmissed(){

}

function findRecipes(){
  var criteria = document.querySelectorAll('.ui-icon-check')
  console.log(criteria)
  var main = "";
  var base = "";
  var cuisine = "";
  var diet = "";
  var intolerance = "";
  var course = "";

  if(document.querySelector('.ui-icon-check.main') == null)
  {
    navigator.notification.alert('Please select a main ingredient', alertDissmissed, 'Missing Parameter', 'Ok')
  }
  else
  {
  for(var i = 0; i < criteria.length; i++){
    switch(criteria[i].innerHTML){
      case "Chicken": case "Beef": case "Pork": case "Seafood":
        main = criteria[i].innerHTML
        console.log(main)
        break;
      case "Noodles": case "Pasta": case "Rice": case "Potato":
        base = criteria[i].innerHTML
        console.log(base)
        break;
      case "American": case "Japanese": case "Chinese": case "Mexican": case "French": case "Thai":
        cuisine = criteria[i].innerHTML
        console.log(cuisine)
        break;
      case "Vegetarian":
        diet = criteria[i].innerHTML
        console.log(diet)
        break;
      case "Gluten Free": case "Dairy Free":
        if(criteria[i].innerHTML == "Gluten Free"){
          intolerance = "Gluten"
        }
        else{
          intolerance = "Dairy"
        }
        console.log(intolerance)
        break;
      case "Breakfast": case "Main Course": case "Dessert": case "Appetizer":
        course = criteria[i].innerHTML
        console.log(course)
        break;
    }
  }
  searchAPI(main, base, cuisine, diet, intolerance, course)
  document.getElementById('loader').style.display = "block";
  document.location.href = "#list"

  var temp = document.getElementById('parameters').innerHTML;
  document.getElementById('parameters2').innerHTML = temp;
  console.log(document.getElementById('puthere'))
  $( "#refine" ).collapsible( "collapse" );
  }
}

function searchAPI(main, base, cuisine, diet, intolerance, course) {
    var the_url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine="+cuisine+"&diet="+diet+"&instructionsRequired=true&intolerances="+intolerance+"&limitLicense=false&number=20&offset=0&query="+main+" "+base+"&type="+course+""
    var txt = ''
    $.ajax({
      url: the_url,
      timeout: 15000,
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
          txt += "<li class='ui-li-has-thumb'><a onclick='getRecipe("+i+")' href='#recipe' data-transition='slide' class='ui-btn ui-btn-icon-right ui-icon-carat-r' id="+data.results[i].id+"><img src='https://spoonacular.com/recipeImages/"+data.results[i].image + "'><h2>" + data.results[i].title + "</h2></a></li>";
        }
        document.getElementById("searchResults").innerHTML = txt;
      },
      error: function(xhr, status, error){
        document.getElementById('loader').style.display = "none";
        document.getElementById('searchResults').innerHTML = "<p id='error'>Oops, something went wrong..</p>";
      },
    });
}

var global_data
var dataToSave

function lucky(){
  var the_url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1"
  var txt = ''
  $.ajax({
    url: the_url,
    timeout: 15000,
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function(xhr) {xhr.setRequestHeader("X-Mashape-Key", "rBeAkVcqGmmshgFTu1Pqexj4uiB1p1IgpMFjsnPvEo4YkjvbX4");},
    success: function(data) {
      global_data = data
      //console.log(data)
      getRandomRecipe();
      document.location.href = "#recipe"
    },
    error: function(xhr, status, error){
      document.getElementById('loader').style.display = "none";
      document.getElementById('searchResults').innerHTML = "<p id='error'>Oops, something went wrong..</p>";
    },
  });
}

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
    timeout: 15000,
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function(xhr) {xhr.setRequestHeader("X-Mashape-Key", "rBeAkVcqGmmshgFTu1Pqexj4uiB1p1IgpMFjsnPvEo4YkjvbX4");},
    success: function(data) {
      global_data = data
      console.log(data)
      for(i in data){
          if(data[i].glutenFree == true){
            console.log('TRUE')
            document.getElementById(data[i].id).innerHTML += '<p id="nutrition"><span>GF</span></p>&nbsp';
          }
          if(data[i].dairyFree == true){
            document.getElementById(data[i].id).innerHTML += '<p id="nutrition"><span>DF</span></p>&nbsp';
          }
          if(data[i].vegetarian == true){
            document.getElementById(data[i].id).innerHTML += '<p id="nutrition"><span>V</span></p>&nbsp';
          }
      }
      document.getElementById('loader').style.display = "none";
    },
    error: function(xhr, status, error){
      document.getElementById('loader').style.display = "none";
      document.getElementById('searchResults').innerHTML = "<p id='error'>Oops, something went wrong..</p>";
    },
  });
}

function getRecipe(x){
  console.log(global_data)
  var txt = "<img src="+global_data[x].image+">"
  document.getElementById("image").innerHTML = txt;
  txt = "<h2 id='titleHeading'>"+global_data[x].title+"</h2><p>Ready in: "+global_data[x].readyInMinutes+" minutes</p>"
  document.getElementById("title").innerHTML = txt;
  document.getElementById('information').innerHTML = "<a id="+global_data[x].id+" onclick='saveRecipe(this.id)'><span class='save' id=i"+global_data[x].id+" onlick='saveRecipe(this.id)'>&star;</span></a>&nbsp";
  if(global_data[x].glutenFree == true){
    console.log('TRUE')
    document.getElementById('information').innerHTML += '<p id="nutrition"><span>GF</span></p>&nbsp';
  }
  if(global_data[x].dairyFree == true){
    document.getElementById('information').innerHTML += '<p id="nutrition"><span>DF</span></p>&nbsp';
  }
  if(global_data[x].vegetarian == true){
    document.getElementById('information').innerHTML += '<p id="nutrition"><span>V</span></p>&nbsp';
  }
  txt = '<b>Ingredients</b>';
  for(i in global_data[x].extendedIngredients){
    txt += "<li>"+global_data[x].extendedIngredients[i].originalString+"</li>"

  }
  document.getElementById("ingredients").innerHTML = txt;

  txt = "<b>Instructions</b>"
  for (i in global_data[x].analyzedInstructions[0].steps){
    txt += "<li>"+global_data[x].analyzedInstructions[0].steps[i].step+"</li>"
  }

  //txt = "<ol id='instructionList'><b>Instructions</b><li>"+global_data[x].instructions.split(".").join(".</li><li>")
  document.getElementById("instructions").innerHTML = txt;
  // list = document.getElementById("instructionList");
  // list.removeChild(list.lastChild);

  var numWords = document.getElementById('titleHeading').innerHTML.split(" ").length;
  console.log(numWords)

  if(numWords >= 0 && numWords < 4){
    console.log('less than')
    document.getElementById('titleHeading').style.fontSize = "1.5em";
  }
  if(numWords >= 4 && numWords < 9){
    document.getElementById('titleHeading').style.fontSize = "1.2em";
  }
  if(numWords >= 9 && numWords < 14){
    document.getElementById('titleHeading').style.fontSize = "1em";
  }
  if(numWords >= 14 && numWords < 19){
    document.getElementById('titleHeading').style.fontSize = "0.8em";
  }
  if(numWords >= 19){
    document.getElementById('titleHeading').style.fontSize = "0.5em";
  }

  dataToSave = global_data[x];
}

function getRandomRecipe(x){
  console.log(global_data)
  var txt = "<img src="+global_data.recipes[0].image+">"
  document.getElementById("image").innerHTML = txt;
  txt = "<h2 id='titleHeading'>"+global_data.recipes[0].title+"</h2><p>Ready in: "+global_data.recipes[0].readyInMinutes+" minutes</p>"
  document.getElementById("title").innerHTML = txt;
  txt = '<b>Ingredients</b>';
  for(i in global_data.recipes[0].extendedIngredients){
    txt += "<li>"+global_data.recipes[0].extendedIngredients[i].originalString+"</li>"

  }

  document.getElementById('information').innerHTML = "<a id="+global_data.recipes[0].id+" onclick='saveRecipe(this.id)'><span class='save' id=i"+global_data.recipes[0].id+" onlick='saveRecipe(this.id)'>&star;</span></a>&nbsp";
  if(global_data.recipes[0].glutenFree == true){
    console.log('TRUE')
    document.getElementById('information').innerHTML += '<p id="nutrition"><span>GF</span></p>&nbsp';
  }
  if(global_data.recipes[0].dairyFree == true){
    document.getElementById('information').innerHTML += '<p id="nutrition"><span>DF</span></p>&nbsp';
  }
  if(global_data.recipes[0].vegetarian == true){
    document.getElementById('information').innerHTML += '<p id="nutrition"><span>V</span></p>&nbsp';
  }
  document.getElementById("ingredients").innerHTML = txt;

  txt = "<b>Instructions</b>"
  for (i in global_data.recipes[0].analyzedInstructions[0].steps){
    txt += "<li>"+global_data.recipes[0].analyzedInstructions[0].steps[i].step+"</li>"
  }
  //txt = "<ol id='instructionList'><b>Instructions</b><li>"+global_data.recipes[0].instructions.split(".").join(".</li><li>")
  document.getElementById("instructions").innerHTML = txt;
  // list = document.getElementById("instructionList");
  // list.removeChild(list.lastChild);

  var numWords = document.getElementById('titleHeading').innerHTML.split(" ").length;
  console.log(numWords)

  if(numWords >= 0 && numWords < 4){
    console.log('less than')
    document.getElementById('titleHeading').style.fontSize = "1.5em";
  }
  if(numWords >= 4 && numWords < 9){
    document.getElementById('titleHeading').style.fontSize = "1.2em";
  }
  if(numWords >= 9 && numWords < 14){
    document.getElementById('titleHeading').style.fontSize = "1em";
  }
  if(numWords >= 14 && numWords < 19){
    document.getElementById('titleHeading').style.fontSize = "0.8em";
  }
  if(numWords >= 19){
    document.getElementById('titleHeading').style.fontSize = "0.5em";
  }

  dataToSave = global_data.recipes[0];
}

function saveRecipe(x){
  var storage = window.localStorage;
  console.log('Called')
  var temp = document.querySelector('.save#i'+x);
  dataToSave = JSON.stringify(dataToSave);
  storage.setItem('savedRecipes', dataToSave)
  console.log(storage.getItem('savedRecipes'))
  console.log(temp.innerHTML)
  if(!temp.classList.contains('saved')){
    console.log('yup')
    temp.innerHTML = '&bigstar;'
    temp.setAttribute('class', 'save saved')
    storage.setItem('savedRecipes', dataToSave)
  }
  else if (temp.classList.contains('saved')){
    console.log('nope')
    temp.innerHTML = '&star;'
    temp.setAttribute('class', 'save')
    storage.removeItem('savedRecipes')
  }
}

function loadRecipe(){
  var storage = window.localStorage;
  var dataToLoad = storage.getItem('savedRecipes')
  dataToLoad = JSON.parse(dataToLoad);
  console.log(dataToLoad)

  if(dataToLoad == null){
    navigator.notification.alert('No saved recipes exist', alertDissmissed, 'Error', 'Ok')
  }
  else{
    document.location.href="#recipe"
    var txt = "<img src="+dataToLoad.image+">"
    document.getElementById("image").innerHTML = txt;
    txt = "<h2 id='titleHeading'>"+dataToLoad.title+"</h2><p>Ready in: "+dataToLoad.readyInMinutes+" minutes</p>"
    document.getElementById("title").innerHTML = txt;
    txt = '<b>Ingredients</b>';
    for(i in dataToLoad.extendedIngredients){
      txt += "<li>"+dataToLoad.extendedIngredients[i].originalString+"</li>"

    }

    document.getElementById('information').innerHTML = "<a id="+dataToLoad.id+" onclick='saveRecipe(this.id)'><span class='save' id=i"+dataToLoad.id+" onlick='saveRecipe(this.id)'>&star;</span></a>&nbsp";
    if(dataToLoad.glutenFree == true){
      console.log('TRUE')
      document.getElementById('information').innerHTML += '<p id="nutrition"><span>GF</span></p>&nbsp';
    }
    if(dataToLoad.dairyFree == true){
      document.getElementById('information').innerHTML += '<p id="nutrition"><span>DF</span></p>&nbsp';
    }
    if(dataToLoad.vegetarian == true){
      document.getElementById('information').innerHTML += '<p id="nutrition"><span>V</span></p>&nbsp';
    }
    document.getElementById("ingredients").innerHTML = txt;

    txt = "<b>Instructions</b>"
    for (i in dataToLoad.analyzedInstructions[0].steps){
      txt += "<li>"+dataToLoad.analyzedInstructions[0].steps[i].step+"</li>"
    }
    //txt = "<ol id='instructionList'><b>Instructions</b><li>"+global_data.recipes[0].instructions.split(".").join(".</li><li>")
    document.getElementById("instructions").innerHTML = txt;
    // list = document.getElementById("instructionList");
    // list.removeChild(list.lastChild);

    var numWords = document.getElementById('titleHeading').innerHTML.split(" ").length;
    console.log(numWords)

    if(numWords >= 0 && numWords < 4){
      console.log('less than')
      document.getElementById('titleHeading').style.fontSize = "1.5em";
    }
    if(numWords >= 4 && numWords < 9){
      document.getElementById('titleHeading').style.fontSize = "1.2em";
    }
    if(numWords >= 9 && numWords < 14){
      document.getElementById('titleHeading').style.fontSize = "1em";
    }
    if(numWords >= 14 && numWords < 19){
      document.getElementById('titleHeading').style.fontSize = "0.8em";
    }
    if(numWords >= 19){
      document.getElementById('titleHeading').style.fontSize = "0.5em";
    }

    var temp = document.querySelector('.save#i'+dataToLoad.id);
    temp.innerHTML = '&bigstar;'

    if(!temp.classList.contains('saved')){
      console.log('yup')
      temp.innerHTML = '&bigstar;'
      temp.setAttribute('class', 'save saved')
      storage.setItem('savedRecipes', dataToSave)
    }
    else if (temp.classList.contains('saved')){
      console.log('nope')
      temp.innerHTML = '&star;'
      temp.setAttribute('class', 'save')
      storage.removeItem('savedRecipes')
    }
  }
}

//OLD FUNCTIONS
// function randomHorizontalList(){
//   var ul = document.querySelector(".list#horizontal");
//   var counter = 1;
//   var trueCounter = 0;
//   var n = false;
//   for (var i = 0; i < ul.children.length; i++) {
//       var str = ul.children[i].innerHTML;
//       n = str.includes("check");
//       if (n == true){
//         ul.insertBefore(ul.children[i], ul.children[trueCounter]);
//         trueCounter++;
//         console.log("True: " + trueCounter)
//       }
//       // else{
//       //   var random = Math.random() * i | 0;
//       //   console.log("Random " + random)
//       //   while (random < trueCounter){
//       //     random = Math.random() * i | 0;
//       //     counter ++;
//       //     if (counter > 4){
//       //       random = 4;
//       //       console.log("Forced Random")
//       //     }
//       //   }
//       //   ul.appendChild(ul.children[random]);
//       // }
//       counter++;
//   }
// }

// function buttonClicked(id){
//   console.log(id)
//   document.getElementById('loader').style.display = "block";
//   var button = document.querySelector(".small_button#" + id);
//   button.setAttribute("data-icon", "check");
//   document.location.href = "#list"
//   window.setTimeout(randomHorizontalList(), 1000);
//   searchAPI(button.innerHTML)
//   console.log(button.innerHTML)
// }
//
// function smallButtonClicked(id){
//   console.log("Click")
//   var button = document.querySelector(".small_button#" + id);
//   var x = button.getAttribute("data-icon");
//   console.log(x)
//   if (x == "check"){
//     console.log("remove")
//     button.setAttribute("data-icon", "");
//     randomHorizontalList();
//     $( document ).ready(function() {
//     console.log( "ready!" );
//     $( ".small_button#"+id).button( "refresh" );
//     });
//   }
//   else{
//     console.log("add")
//     button.setAttribute("data-icon", "check");
//     randomHorizontalList();
//   }
// }
