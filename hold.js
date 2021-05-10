$(function(){
  $("#start").click(function(){
    createNewDeck();
  });
});


let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
let values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
var deck = [];
var player = [];
var computer = [];
var playerHandValue = 0;
let computerHandValue = 0;
var c_test = -1;

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

    //var img = $('<img></img>');

    var divCol = document.createElement('div');
    divCol.className = 'column';
    var par1 = document.createElement('p');
    var divBold = document.createElement('b');
    var img = document.createElement('img');

    let player_current = deck.shift();
    /*
    if (player_current["suit"] === "Hearts") {
      img.attr("src", "heart.png");
    } else if (player_current["suit"] == "Diamonds") {
      img.attr("src", "diamond.png");
    }
    else if (player_current["suit"] == "Clubs") {
      img.attr("src", "clubs.png");
    }
    else {
      img.attr("src", "spade.png");
    }*/

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

    //let divBlock = $('<div></div>').addClass("column");
    //divBlock.append($('<p></p>').append($('<b></b>').
    //ext("player_current['value'] + ' '")).append(img.css("width", "25%")));

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

  /*
    if (deck.length > 0) {
      var divCol = document.createElement('div');
      divCol.className = 'column';
      var par1 = document.createElement('p');
      var divBold = document.createElement('b');
      var span = document.createElement('span');
      var img = document.createElement('img');
      let player_current = deck.shift();
      if (player_current["suit"] == "Hearts") {
        img.src = "heart.png";
      } else if (player_current["suit"] == "Diamonds") {
        img.src = "diamond.png";
      } else if (player_current["suit"] == "Clubs") {
        img.src = "clubs.png";
      } else {
        img.src = "spade.png";
      }

      img.style = "width:25%";
      divBold.innerText = player_current["value"] + " ";
      span.appendChild(img);
      par1.appendChild(divBold);
      par1.appendChild(img);
      divCol.appendChild(par1);
      if (currentPlayer == "h") {
        document.getElementById("handValueP1").innerText = parseInt(document.getElementById("handValueP1").innerText) + player_current["weight"];
        document.getElementById('human').appendChild(divCol);
      } else {
        document.getElementById("handValueC").innerText = parseInt(document.getElementById("handValueC").innerText) + player_current["weight"];
        document.getElementById('computer').appendChild(divCol);
      }
      document.getElementById('start').innerText = "Restart/End";
      return player_current;
    } else {
      return "";
    }

    */
}

function initialise(){
  $("#human").css("display", "none");

  document.getElementById("human").style.display = "none";
  document.getElementById("computer").style.display = "none";
  document.getElementById("feedback").innerText = "Game stopped. Click on Start to play again.";
  document.getElementById("feedback1").innerText = "";
  document.getElementById("feedback1").style.backgroundColor = "";
  document.getElementById("hit").disabled = false;
  document.getElementById("stand").disabled = false;
  document.getElementById("human").style.borderWidth = "5px";
  document.getElementById("computer").style.borderWidth = "1px";
  document.getElementById("human").style.borderColor = document.getElementById("computer").style.borderColor = "black";
  player = [];
  computer = [];
  playerHandValue = 0;
  computerHandValue = 0;
  c_test = -1;
}

function endGame(player, status) {
  c_test = 1;
  document.getElementById("feedback1").innerText = player + " " + status;
  document.getElementById("feedback1").style.backgroundColor = "Blue";
  document.getElementById("feedback1").style.color = "White";
  document.getElementById("hit").disabled = true;
  document.getElementById("stand").disabled = true;
}

function checkWinner(currentPlayer) {
  let status = "";
  if (currentPlayer === "h") {
    if (document.getElementById("handValueP1").innerText > 21) {
      endGame("Player 1", "Lost");
      status = "lost";
    }
    else if (document.getElementById("handValueP1").innerText == 21) {
      endGame("Excellent! Blackjack. Player 1", "Wins");
    }
    else if (document.getElementById("human").style.borderColor == "red" && document.getElementById("computer").style.borderColor == "red") {
      if (document.getElementById("handValueP1").innerText > document.getElementById("handValueC").innerText) {
        endGame("Player 1", "Lost");
        status = "lost";
      } else if (document.getElementById("handValueP1").innerText == document.getElementById("handValueC").innerText) {
        endGame("Player 1", "Drew");
        status = "Draw";
      }
    }
  } else {
    if (document.getElementById("handValueC").innerText > 21) {
      endGame("Computer", "Lost");
      status = "lost";
    }
    else if (document.getElementById("handValueC").innerText == 21) {
      endGame("Excellent! Blackjack. Computer", "Wins");
    }
    else if (document.getElementById("human").style.borderColor == "red" && document.getElementById("computer").style.borderColor == "red") {
      if (document.getElementById("handValueP1").innerText < document.getElementById("handValueC").innerText) {
        endGame("computer", "Lost");
        status = "lost";
      }  else if (document.getElementById("handValueP1").innerText == document.getElementById("handValueC").innerText) {
        endGame("Computer", "Drew");
        status = "Draw";
      }
    }
  }
  return status;
}

function checkAce(currentPlayer) {
  if (currentPlayer === "h" && document.getElementById("handValueP1").innerText > 21) {
    document.getElementById("handValueP1").innerText = 0;
    for (var i = 0; i < player.length; i++) {
      if (player[i]["value"] === "A") {
        player[i]["weight"] = 1;
        document.getElementById("handValueP1").innerText = parseInt(document.getElementById("handValueP1").innerText) + player[i]["weight"];
      } else {
        document.getElementById("handValueP1").innerText = parseInt(document.getElementById("handValueP1").innerText) + player[i]["weight"];
      }
    }
  } else if (currentPlayer === "c" && document.getElementById("handValueC").innerText > 21) {
    document.getElementById("handValueC").innerText = 0;
    for (var i = 0; i < computer.length; i++) {
      if (computer[i]["value"] === "A") {
        computer[i]["weight"] = 1;
        document.getElementById("handValueC").innerText = parseInt(document.getElementById("handValueC").innerText) + computer[i]["weight"];
      } else {
        document.getElementById("handValueC").innerText = parseInt(document.getElementById("handValueC").innerText) + computer[i]["weight"];
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
    $("handValueC").text(0);

    $("div").remove(".column");

    /*
    while(document.getElementById("human").firstChild && document.getElementById("human").childElementCount > 1 ){
      document.getElementById("human").removeChild(document.getElementById("human").lastChild);
    }
    while(document.getElementById("computer").firstChild && document.getElementById("computer").childElementCount > 1 ){
      document.getElementById("computer").removeChild(document.getElementById("computer").lastChild);
    }*/

    initialise();
  }
}

function hit(x = "") {

  if ($("#human").css("border-left-width") === "5px" && $("#human").css("border-color") === "rgb(0, 0, 0)") {
    // player 1 return
    player.push(createPlayersUI("h"));
    checkAce("h");
    let status = checkWinner("h");
    document.getElementById("human").style.borderWidth = "1px";
    document.getElementById("computer").style.borderWidth = "5px";

    // computer's turn
    if (status != "lost") {
      computerPlay("no");
    }

  } else  {
    computer.push(createPlayersUI("c"));
    checkAce("c");
    checkWinner("c");
    document.getElementById("human").style.borderWidth = "5px";
    if (x == ""){
      document.getElementById("computer").style.borderWidth = "1px";
    } else {
      document.getElementById("computer").style.borderWidth = "5px";
    }
  }
  document.getElementById("feedback").innerHTML = "Number of Cards left: " + deck.length;
}

function stand(x="") {
  if (document.getElementById("human").style.borderWidth === "5px" && document.getElementById("human").style.borderColor != "red") {
    // player 1 stand
    document.getElementById("human").style.borderColor = "red";
    if (document.getElementById("computer").style.borderColor !== "red") {
      document.getElementById("computer").style.borderWidth = "5px";
      // computer stand
      computerPlay("yes");
    } else {
      let status = checkWinner("h");
    }
  } else  { // computer stand logic
    document.getElementById("computer").style.borderColor = "red";
    if (document.getElementById("human").style.borderColor !== "red") {
      document.getElementById("human").style.borderWidth = "5px";
    } else {
      let status = checkWinner("c");
    }
  }
  document.getElementById("feedback").innerHTML = "Number of Cards left: " + deck.length;

}

function computerPlay(recursion) {
  // 1 is hit
  // 2 is Stand
  // timeout to model "thinking"
  if (recursion == "yes") {
    for (var i = 0; i < 5; i++){
      if(c_test != 1){
      //  console.log(c)
        document.getElementById("feedback1").innerText = "Computer's turn. Please wait...";
        getComputerPlay(computerMove);
      } else {
        //console.log(c)
        break;
      }
    }
  } else {
    document.getElementById("feedback1").innerText = "Computer's turn. Please wait...";
    getComputerPlay(computerMove);
  }
}

function getComputerPlay(callBack) {
    //let timer = setTimeout(function () {
      //  var number = Math.floor(Math.random() * 2) + 1;
        //callBack(number);
    //}, 2000);

    var number = Math.floor(Math.random() * 2) + 1;
    callBack(number)
}

function computerMove(decision) {

    if (decision === 1)  { // hit
      hit("*");
    } else { // stand
      stand("*");
    }
    if (c_test != 1){
      document.getElementById("feedback1").innerText = "Computer has played. Your turn.";
    }
}
