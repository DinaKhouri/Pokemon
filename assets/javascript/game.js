$(document).ready(function() {
  //define characters in objects,define their current power, their next power and pictures for evolution

  var pika = {
    name: "pika",
    power: ["10", "15", "20"]
    // evolution: [
    //   "assets/images/pikaicon0.png",
    //   "assets/images/pikaicon1.png",
    //   "assets/images/pikaicon2.png"
    //]
  };
  var plant = {
    name: "pika",
    power: ["10", "15", "20"]
    // evolution: [
    //   "assets/images/planticon0.png",
    //   "assets/images/planticon1.png",
    //   "assets/images/planticon2.png"
    // ]
  };

  var charm = {
    name: "charm",
    power: ["10", "15", "20"]
    // evolution: [
    //   "assets/images/charmicon0.png",
    //   "assets/images/charmicon1.png",
    //   "assets/images/charmicon2.png"
    // ]
  };

  var turtle = {
    name: "turtle",
    power: ["10", "15", "20"]
    // evolution: [
    //   "assets/images/turtle1.png",
    //   "assets/images/turtle2.png",
    //   "assets/images/turtle3.png"
    // ]
  };
  //create var for when first character id selected so we can defrentiate between chosing us and choseing the enemy
  var charSelected = false;
  //create var for charachter so when it evolutes it changes the number hence loads the next evolution pic and changes power
  var characterCounter = "0";
  // create function to start whenever u beat a character and u get to pick a new one
  newRound = function(winner) {
    charSelected = true;
    charachterCounter++;
  };
  //when user picks first character it goes left and when we pick enemy it goes right
  //It also loads their charachter on each side based on their character counter
  //It also loads their full energy bars based on character counter
  //It also shows their hit strength based on character counter
  $(".icon").on("click", function(event) {
    if (charSelected === false) {
      lifeEnergy1 = "100";
      character = $(this).attr("id"); // source https://stackoverflow.com/questions/48239/getting-the-id-of-the-element-that-fired-an-event
      hitPower1 = $(this).attr("hitPower");
      console.log(hitPower1);
      console.log(character);
      console.log(
        "<img src= assets/images/" + character + characterCounter + ".png/>"
      );
      $(".yourcharacter1")
        .children("img")
        .attr("src", "assets/images/" + character + characterCounter + ".png"); // source for loading image https://www.sitepoint.com/community/t/load-image-onclick-with-jquery/255772/2
      charSelected = true;

      //source for ID+Var https://stackoverflow.com/questions/743994/how-do-i-select-an-element-in-jquery-by-using-a-variable-for-the-id
      $("#" + character).animate({
        left: "-370"
      });
      //load energy bar
      $(".bar1").css({ "background-color": "yellow" });
    } else {
      character = jQuery(this).attr("id");
      lifeEnergy2 = "100";
      hitPower2 = $(this).attr("hitPower");
      console.log(hitPower2);
      $(".yourcharacter2")
        .children("img")
        .attr("src", "assets/images/" + character + characterCounter + ".png");
      $("#" + character).animate({
        left: "370"
      });
      $(".bar2").css({ "background-color": "yellow" });
    }
    //when user presses fight each energy bar changes according to hit power
    $(".ball").on("click", function() {
      console.log("fight");
      //console log them  make sure I can access them from here
      console.log(hitPower1);
      console.log(hitPower2);
      console.log(lifeEnergy1);
      console.log(lifeEnergy2);
      lifeEnergy1 = lifeEnergy1; //- hitPower2;
      lifeEnergy2 = lifeEnergy2 - hitPower1;
      console.log(lifeEnergy1);
      console.log(lifeEnergy2);
      //when energy bar of your character =<0 you lose
      if (lifeEnergy1 < 0) {
        alert("you lose");
      }
      //when energy bar for enemy =<0
      //1 -you get to pick another enemy to fight
      //2- your power changes
      //3-you evolute
      if (lifeEnergy2 < 0) {
        alert("pick another enemy");
        lifeEnergy1 = "100";
        characterCounter = "1";
        $(".yourcharacter1")
          .children("img")
          .attr(
            "src",
            "assets/images/" + character + characterCounter + ".png"
          );
      }
    });
  });

  //repeat past 2 steps
  // if you beat 3 characters you win the game
});
