let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
let values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
var deck = [];
var player = [];
var computer = [];
var playerHandValue = 0;
let computerHandValue = 0;

let game = -1;

$(function(){
  $("#start").click(function(){
    createNewDeck();
  });
  $("#hit").click(function(){
    hit();
  });
  $("#stand").click(function(){
    stand();
  });
});

// helper functions
function readValues(item, index) {
  for(let i = 0; i < values.length; i++) {
    let weight = 0;
    if (typeof values[i] === 'string' || values[i] instanceof String){
      if (values[i] == "J" || values[i] == "Q" || values[i] == "K") {
        weight = 10;
      }
      else if (values[i] == "A") {
        weight = 11;
      }
    } else {
      weight = values[i];
    }
    deck.push({suit: item, value: values[i], weight: weight})
  }
}

function shuffle() {
    for (let i = 0; i < 100; i++) {
        var val1 = Math.floor((Math.random() * deck.length));
        var val2 = Math.floor((Math.random() * deck.length));
        let temporalValue = deck[val1];
        deck[val1] = deck[val2];
        deck[val2] = temporalValue;
    }
}

function createPlayersUI(currentPlayer) {

  if ($(".cardsRack").css("display") === "none") $(".cardsRack").css("display", "block");

  if (deck.length > 0) {

    var divCol = document.createElement('div');
    divCol.className = 'column';
    var par1 = document.createElement('p');
    var divBold = document.createElement('b');
    var img = document.createElement('img');

    let player_current = deck.shift();

    if (player_current["suit"] === "Hearts") {
      img.src = "heart.png";
    } else if (player_current["suit"] === "Diamonds") {
      img.src = "diamond.png";
    } else if (player_current["suit"] === "Clubs") {
      img.src = "clubs.png";
    } else {
      img.src = "spade.png";
    }

    img.style = "width:25%";

    divBold.innerText = player_current["value"] + " ";

    par1.appendChild(divBold);
    par1.appendChild(img);
    divCol.appendChild(par1);

    if (currentPlayer === 'h') {
      $("#handValueP1").text(parseInt($("#handValueP1").text()) + player_current["weight"]);
      $("#human").append(divCol);
    } else {
      $("#handValueC").text(parseInt($("#handValueC").text()) + player_current["weight"]);
      $("#computer").append(divCol);
    }

    $("#start").text("Restart/End");

    return player_current;
  } else {
    return "";
  }
}

function initialise(){

  $(".cardsRack").css("display", "none");
  $("#feedback").text("Game stopped. Click on Start to play again.");
  $("#feedback1").text("");
  $("#feedback1").css("backgroundColor", "");
  $("#feedback1").css("color", "brown");
  $("#hit").prop("disabled", false);
  $("#stand").prop("disabled", false);

  $("#human").removeClass($("#human").attr("class"));
  $("#human").addClass("play");

  $("#computer").removeClass($("#computer").attr("class"));
  $("#computer").addClass("default");

  player = [];
  computer = [];
  playerHandValue = 0;
  computerHandValue = 0;
  deck = [];
  game = -1;

}

function endGame(player, status) {
  game = 1;
  $("#feedback1").text(player + " " + status);

  $("#feedback1").css("backgroundColor", "Blue");
  $("#feedback1").css("color", "White");

  $("#hit").prop("disabled", true);
  $("#stand").prop("disabled", true);
}

function checkWinner(currentPlayer) {
  let status = "";
  if (currentPlayer === "h") {
    if ($("#handValueP1").text() > 21) {
      endGame("Player 1", "Lost");
      status = "lost";
    }
    else if ($("#handValueP1").text() === 21) {
      endGame("Excellent! Blackjack. Player 1", "Wins");
    }
    else if ($("#human").css("border-color") == "rgb(255, 0, 0)" && $("#computer").css("border-color") == "rgb(255, 0, 0)") {
      if ($("#handValueP1").text() === 21){
        endGame("Player 1", "Wins");
        status = "";
      }
      else if ($("#handValueP1").text() > $("#handValueC").text()) {
        endGame("Player 1", "Wins");
        status = "";
      } else if ($("#handValueP1").text() === $("#handValueC").text()) {
        endGame("Player 1", "Drew");
        status = "draw";
      } else {
        endGame("Player 1", "Lost");
        status = "lost";
      }
    }
  } else {
    if ($("#handValueC").text() > 21) {
      endGame("Computer", "Lost");
      status = "lost";
    }
    else if ($("#handValueC").text() === 21) {
      endGame("Excellent! Blackjack. Computer", "Wins");
    }
    else if ($("#human").css("border-color") === "rgb(255, 0, 0)" && $("#computer").css("border-color") === "rgb(255, 0, 0)") {
      if ($("#handValueC") === 21){
        endGame("Computer", "Wins");
        status = "";
      } else if ($("#handValueP1").text() < $("#handValueC").text()) {
        endGame("Computer", "Wins");
        status = "";
      } else if ($("#handValueP1").text() === $("#handValueC").text()) {
        endGame("Computer", "Drew");
        status = "draw";
      } else {
        endGame("Computer", "Lost");
        status = "";
      }
    }
  }
  return status;
}

function checkAce(currentPlayer) {
  if (currentPlayer === "h" && $("#handValueP1").text() > 21) {
    $("#handValueP1").text(0);
    for (var i = 0; i < player.length; i++) {
      if (player[i]["value"] === "A") {
        player[i]["weight"] = 1;
        $("#handValueP1").text();
        $("#handValueP1").text(parseInt($("#handValueP1").text()) + player[i]["weight"]);
      } else {
        $("#handValueP1").text(parseInt($("#handValueP1").text()) + player[i]["weight"]);
      }
    }
  } else if (currentPlayer === "c" && $("#handValueC").text() > 21) {
    $("#handValueC").text(0);
    for (var i = 0; i < computer.length; i++) {
      if (computer[i]["value"] === "A") {
        computer[i]["weight"] = 1;
        $("#handValueC").text(parseInt($("#handValueC").text()) + computer[i]["weight"]);
      } else {
        $("#handValueC").text(parseInt($("#handValueC").text()) + computer[i]["weight"]);
      }
    }
  }
}

// logic
function createNewDeck() {

  if ($("#start").text() === "Start") {
    deck = [];
    suits.forEach(readValues);
    shuffle();
    for (let v = 0; v < 2; v++){
      player.push(createPlayersUI('h'));
      computer.push(createPlayersUI('c'));
    }

    $("#human").removeClass("default");
    $("#human").addClass("play");

    $("#feedback").text("Number of Cards left: " + deck.length);

  } else {

    $("#start").text("Start");
    $("#handValueP1").text(0);
    $("#handValueC").text(0);

    $("div").remove(".column");

    initialise();
  }
}

function hit(repeat = "") {

  if ($("#human").css("border-left-width") === "5px" && $("#human").css("border-color") === "rgb(0, 0, 0)") {
    // player 1 return
    player.push(createPlayersUI("h"));
    checkAce("h");
    let status = checkWinner("h");

    $("#human").removeClass($("#human").attr("class"));
    $("#human").addClass("default");

    $("#computer").removeClass($("#computer").attr("class"));
    $("#computer").addClass("play");

    // computer's turn
    if (status != "lost" && status != "draw") {
      computerPlay("no"); // no as a parameter means no recursive call.
    }

  } else if (($("#computer").css("border-left-width") === "5px" && $("#computer").css("border-color") === "rgb(0, 0, 0)")) {
    computer.push(createPlayersUI("c"));
    checkAce("c");
    let status = checkWinner("c");

    if (repeat == "no recursion") {
      $("#computer").removeClass($("#computer").attr("class"));
      $("#computer").addClass("default");

      $("#human").removeClass($("#human").attr("class"));
      $("#human").addClass("play");
    } else {
      $("#computer").removeClass($("#computer").attr("class"));
      $("#computer").addClass("play");
    }
  }

  $("#feedback").text("Number of Cards left: " + deck.length);
}

function stand(repeat = "") {
  if ($("#human").css("border-left-width") === "5px" && $("#human").css("border-color") === "rgb(0, 0, 0)") {
    // player 1 stand
    $("#human").removeClass($("#human").attr("class"));
    $("#human").addClass("stand");

    if ($("#computer").css("border-color") === "rgb(0, 0, 0)") {

      $("#computer").removeClass($("#computer").attr("class"));
      $("#computer").addClass("play");

      // computer stand
      computerPlay("yes"); // yes means should keeps playing until game ends.
    } else {
      let status = checkWinner("h");
    }
  } else  { // computer stand logic
    $("#computer").removeClass($("#computer").attr("class"));
    $("#computer").addClass("stand");

    if ($("#human").css("border-color") === "rgb(0, 0, 0)") {
      $("#human").removeClass($("#human").attr("class"));
      $("#human").addClass("play");
    } else {
      let status = checkWinner("c");
    }
  }
  $("#feedback").text("Number of Cards left: " + deck.length);
}

function computerPlay(recursion) {
  // 1 is hit
  // 2 is Stand
  // timeout to model "thinking"
  if (recursion == "yes") {
    for (var i = 0; i < 5; i++){
      if(game != 1){
        $("#feedback1").text("Computer's turn. Please wait...");
        getComputerPlay(computerMove, "recursion");
      } else {
        break;
      }
    }
  } else {
    $("#feedback1").text("Computer's turn. Please wait...");
    getComputerPlay(computerMove, "no recursion");
  }
}

function getComputerPlay(callBack, recursion) {
    //let timer = setTimeout(function () {
      //  var number = Math.floor(Math.random() * 2) + 1;
        //callBack(number);
    //}, 2000);

    var number = Math.floor(Math.random() * 2) + 1;
    callBack(number, recursion);
}

function computerMove(decision, recursion) {

    if (decision === 1)  { // hit
      hit(recursion);
    } else { // stand
      stand(recursion);
    }

    if (game != 1){
      $("#feedback1").text("Computer has played. Your turn.");
    }
}
