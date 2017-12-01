import { Game } from "./../js/Epicrabble.js";
var convert = require('xml-js');
$(document).ready(function(){
  let game = new Game();
  let temp = [];
  let word = "";
  let currentLetter = "";
  $("#board").hide();
  $("#start-button").click(function(){
    let playerCount = parseInt($("#player-count").val());
    game.generatePlayers(1);
    game.generateLetters();
    $(".board").append(game.generateBoard());
    $("#board").show();
    $("#start-menu").hide();
    $("#hand").empty();
    for (let i = 0; i < game.players[0].hand.length; i++) {
      let id = `player-${game.players[0].id}-letter-${i}`;
      $("#hand").append(`<li id=${id}>${game.players[0].hand[i]}</li>`);
      $(`#player-${game.players[0].id}-letter-${i}`).click(function(){
        let test = game.players[0].hand[i];
        word += test.toString();
        currentLetter = test.toString();
        $(`#${id}`).remove();
        let spliced = game.players[0].hand.splice(i, 1, null);
        temp.push(spliced.toString());
        console.log(temp);
        $("#submit-word").val(word);
      });
    }
    $(".tile").click(function(){
      let x = $(this).attr("x-coord");
      let y = $(this).attr("y-coord");
      let letter = $(this).attr("letter");
      if(letter != "") {
        word += letter;
        $("#submit-word").val(word);
      } else {
        $(this).text(currentLetter);
        $(this).attr("letter", currentLetter);
        currentLetter = "";
      }
    });
  });
  $("#submit").click(function(){
    let request = new XMLHttpRequest();
    let url = `https://www.dictionaryapi.com/api/v1/references/collegiate/xml/${word}?key=c63d406f-5d72-44b1-8971-c20f33834083`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = convert.xml2js(this.response, {compact: true, spaces: 4});
        if(game.players[0].getElements(response)) {
          $("#output").text("That's a word");
          console.log(game.players[0].hand);
          game.generateLetters(true);
          console.log(game.players[0].hand);
          for (let i = 0; i < game.players[0].hand.length; i++) {
            let id = `player-${game.players[0].id}-letter-${i}`;
            $("#hand").append(`<li id=${id}>${game.players[0].hand[i]}</li>`);
            $(`#player-${game.players[0].id}-letter-${i}`).click(function(){
              let test = game.players[0].hand[i];
              word += test.toString();
              currentLetter = test.toString();
              $(`#${id}`).remove();
              let spliced = game.players[0].hand.splice(i, 1, null);
              temp.push(spliced.toString());
              console.log(temp);
              $("#submit-word").val(word);
            });
          }
        } else {
          $("#output").text("no");
          console.log(game.players[0].hand);
          let newHand = game.players[0].hand.filter(function(element){
            return element !== null;
          });
          for(var i = 0; i < temp.length; i++) {
            newHand.push(temp[i]);
          }
          game.players[0].hand = newHand;
          temp = [];
          console.log(game.players[0].hand);
          $("#hand").empty();
          for (let i = 0; i < game.players[0].hand.length; i++) {
            let id = `player-${game.players[0].id}-letter-${i}`;
            $("#hand").append(`<li id=${id}>${game.players[0].hand[i]}</li>`);
            $(`#player-${game.players[0].id}-letter-${i}`).click(function(){
              let test = game.players[0].hand[i];
              word += test.toString();
              currentLetter = test.toString();
              $(`#${id}`).remove();
              let spliced = game.players[0].hand.splice(i, 1, null);
              temp.push(spliced.toString());
              console.log(temp);
              $("#submit-word").val(word);
            });
          }
        }
      }
    };
    request.open("GET", url, true);
    request.send();
    $("#submit-word").val("");
    $("#hand").empty();
    word = "";
    currentLetter = "";
  });
});
