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
  var enemycharSelected = false;
  //create var for charachter so when it evolutes it changes the number hence loads the next evolution pic and changes power
  var characterCounter = "0";
  //define times won to know when to end the game
  var timesWon = "0";
  // create life energy
  lifeEnergy1 = "100";
  lifeEnergy2 = "100";

  play();
  // Defining function to run game
  function play() {
    if (characterCounter > 2) {
      $(".msgs").html("Congratulations");
      console.log("congratulations");
    }

    $(".icon").on("click", function(event) {
      $(".msgs").html("Time To Pick Your Enemy");
      lifeEnergy2 = "100";
      $(".energyLife2").css({ width: lifeEnergy2 + "%" });
      $(".energyLife1").css({ width: lifeEnergy1 + "%" });
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
          .attr(
            "src",
            "assets/images/" + character1 + characterCounter + ".png"
          ); // source for loading image https://www.sitepoint.com/community/t/load-image-onclick-with-jquery/255772/2
        charSelected = true;
        sound_pick.play();
        //source for ID+Var https://stackoverflow.com/questions/743994/how-do-i-select-an-element-in-jquery-by-using-a-variable-for-the-id
        $("#" + character1).animate({
          left: "-480"
        });
        //load energy bar
        $(".energyLife1").css({ "background-color": "yellow" });
      } else if (charSelected === true && enemycharSelected === false) {
        $(".msgs").html("Click the PokeBall to Fight");
        character2 = jQuery(this).attr("id");
        hitPower2 = $(this).attr("hitPower");
        enemycharSelected = true;
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

        // stop player from picking another character
      } else if (charSelected === true && enemycharSelected === true) {
        event.stopImmediatePropagation();
      }
    });
  }

  //when user presses fight each energy bar changes according to hit power
  $(".ball").on("click", function() {
    $(".msgs").html("Fight");
    sound_hit.play();

    if (lifeEnergy1 <= 0) {
      sound_lose.play();
      console.log("you lose");
    }
    if (lifeEnergy2 <= 0 && characterCounter < 3) {
      if (timesWon > 2) {
        console.log("congratulations ");
      } else {
        $(".msgs").html("Time To Pick Your Enemy");
        enemycharSelected = false;
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
        if (characterCounter > 2) {
          sound_win.play();
          $(".msgs").html("Wowww you are the strongest Pokemon !!");
          $(".yourcharacter2")
            .children("img")
            .attr("src", "assets/images/pikaicon3.png");
          $(".yourcharacter1")
            .addClass("animated bounceInLeft")
            .one(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function() {
                $(this).removeClass("animated bounceInLeft");
              }
            );

          $(".yourcharacter2")
            .addClass("animated bounceInRight")
            .one(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function() {
                $(this).removeClass("animated bounceInRight");
              }
            );
          $(".msgs")
            .addClass("animated zoomInDown")
            .one(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function() {
                $(this).removeClass("animated zoomInDown");
              }
            );
        } else {
          //evolute character one based on the character counter
          $(".yourcharacter1")
            .children("img")
            .attr(
              "src",
              "assets/images/" + character1 + characterCounter + ".png"
            );

          //evolution sound
          sound_evolute.play();
        }
      }
    } else if (lifeEnergy2 >= 0 && characterCounter < 3) {
      if ((timesWon = 3 && lifeEnergy2 <= 0)) {
        sound_win.play();
        alert("congratulations you are the strongest Pokemon!");
      } else {
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
    }
  });

  //repeat past 2 steps
  // if you beat 3 characters you win the game
});
