$(document).ready(function() {
  //define sounds
  var sound_pick = document.getElementById("pick");
  var sound_evolute = document.getElementById("evolute");
  var sound_lose = document.getElementById("lose");
  var sound_win = document.getElementById("win");
  var sound_hit = document.getElementById("hit");
  var sound_theme = document.getElementById("theme");
  //create var for when first character id selected so we can defrentiate between chosing us and choseing the enemy
  var charSelected = false;
  //create var for charachter so when it evolutes it changes the number hence loads the next evolution pic and changes power
  var characterCounter = "0";
  //define times won to know when to end the game
  var timesWon = "0";
  // create life energy
  lifeEnergy1 = "100";
  lifeEnergy2 = "100";
  // create function to start whenever u beat a character and u get to pick a new one
  // firstRound = function(winner) {
  //   charSelected = true;
  //   lifeEnergy1 = "100";
  //   charachterCounter = "1";
  //   character = "winner"; // created this to keep the character to our winning character rather than changing it when user picks the enemy
  // };
  //when user picks first character it goes left and when we pick enemy it goes right
  //It also loads their charachter on each side based on their character counter
  //It also loads their full energy bars based on character counter
  //It also shows their hit strength based on character counter

  $(".icon").on("click", function(event) {
    lifeEnergy2 = "100";
    $(".energyLife2").css({ width: lifeEnergy2 + "%" });
    sound_theme.play();
    if (charSelected === false) {
      character1 = $(this).attr("id"); // source https://stackoverflow.com/questions/48239/getting-the-id-of-the-element-that-fired-an-event
      hitPower1 = $(this).attr("hitPower");
      console.log(hitPower1);
      console.log(character1);
      console.log(
        "<img src= assets/images/" + character1 + characterCounter + ".png/>"
      );
      $(".yourcharacter1")
        .children("img")
        .attr("src", "assets/images/" + character1 + characterCounter + ".png"); // source for loading image https://www.sitepoint.com/community/t/load-image-onclick-with-jquery/255772/2
      charSelected = true;
      sound_pick.play();
      //source for ID+Var https://stackoverflow.com/questions/743994/how-do-i-select-an-element-in-jquery-by-using-a-variable-for-the-id
      $("#" + character1).animate({
        left: "-480"
      });
      //load energy bar
      $(".energyLife1").css({ "background-color": "yellow" });
    } else {
      character2 = jQuery(this).attr("id");
      hitPower2 = $(this).attr("hitPower");
      console.log(hitPower2);
      $(".yourcharacter2")
        .children("img")
        .attr("src", "assets/images/" + character2 + "0" + ".png");
      sound_pick.play();
      $("#" + character2).animate({
        left: "480"
      });
      $(".energyLife2").css({ "background-color": "yellow" });
      //fill energy bar for both
      lifeEnergy1 = "100";
    }
  });

  //when user presses fight each energy bar changes according to hit power
  $(".ball").on("click", function() {
    sound_hit.play();
    if (timesWon > 2) {
      sound_win.play();
      alert("congratulations you are the strongest Pokemon!");
    }
    //when energy bar of your character =<0 you lose
    else if (lifeEnergy1 <= 0) {
      sound_lose.play();
      alert("you lose");
    } else if (lifeEnergy2 <= 0) {
      alert("pick another Enemy");
      lifeEnergy1 = 100;
      lifeEnergy2 = 100;
      characterCounter++;
      timesWon++;
      //load your energy bar again
      $(".energyLife1").css({ "background-color": "yellow" });
      lifeEnergy1 = "100";
      //load enemy's energy bar again
      $(".energyLife2").css({ "background-color": "yellow" });
      lifeEnergy2 = "100";
      //load new enemy picked --> it will load from the previous lines
      //add bounceInDown effect for evolution
      $(".yourcharacter1")
        .addClass("animated bounceInDown")
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function() {
            $(this).removeClass("animated bounceInDown");
          }
        );
      //evolute character one based on the character counter
      $(".yourcharacter1")
        .children("img")
        .attr("src", "assets/images/" + character1 + characterCounter + ".png");

      //evolution sound
      sound_evolute.play();
    } else if (lifeEnergy2 >= 0) {
      console.log("fight");
      //console log them  make sure I can access them from here
      console.log(hitPower1);
      console.log(hitPower2);
      console.log(lifeEnergy1);
      console.log(lifeEnergy2);
      lifeEnergy1 = lifeEnergy1 - hitPower2;
      lifeEnergy2 = lifeEnergy2 - hitPower1;
      console.log(lifeEnergy1);
      console.log(lifeEnergy2);
      $(".energyLife1").css({ width: lifeEnergy1 + "%" });
      $(".energyLife2").css({ width: lifeEnergy2 + "%" });
      $(".ball")
        .addClass("animated pulse")
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function() {
            $(this).removeClass("animated pulse");
          }
        );
      $(".yourcharacter1")
        .addClass("animated wobble")
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function() {
            $(this).removeClass("animated wobble");
          }
        );
      $(".yourcharacter2")
        .addClass("animated wobble")
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function() {
            $(this).removeClass("animated wobble");
          }
        );
    }
    //when energy bar for enemy =<0
    //1 -you get to pick another enemy to fight
    //2- your power changes
    //3-you evolute
  });

  //repeat past 2 steps
  // if you beat 3 characters you win the game
});
