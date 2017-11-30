import { Game } from "./../js/Epicrabble.js";
var convert = require('xml-js');
$(document).ready(function(){
  let game = new Game();
  let word = "";
  let counter = 0;
  $("#board").hide();
  $("#start-button").click(function(){
    let playerCount = parseInt($("#player-count").val());
    game.generatePlayers(1);
    game.generateLetters();
    $("#board").show();
    $("#start-menu").hide();
    $("#hand").empty();
    for (let i = 0; i < game.players[0].hand.length; i++) {
      let id = `player-${game.players[0].id}-letter-${i}`;
      $("#hand").append(`<li id=${id}>${game.players[0].hand[i]}</li>`);
      $(`#player-${game.players[0].id}-letter-${i}`).click(function(){
        let test = game.players[0].hand[i];
        word += test.toString();
        $(`#${id}`).remove();
        game.players[0].hand.splice(i, 1, null);
        $("#submit-word").val(word);
      });
    }
  });
  $("#submit").click(function(){
    game.generateLetters(true);
    let request = new XMLHttpRequest();
    let url = `https://www.dictionaryapi.com/api/v1/references/collegiate/xml/${word}?key=c63d406f-5d72-44b1-8971-c20f33834083`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = convert.xml2js(this.response, {compact: true, spaces: 4});
        if(game.players[0].getElements(response)) {
          $("#output").text("That's a word");
        } else {
          $("#output").text("no");
        }
      }
    };
    request.open("GET", url, true);
    request.send();

    $("#submit-word").empty();
    // for (let i = 0; i < game.players[0].hand.length; i++) {
    //   let id = `player-${game.players[0].id}-letter-${i}`;
    //   $("#hand").append(`<li id=${id}>${game.players[0].hand[i]}</li>`);
    //   $(`#player-${game.players[0].id}-letter-${i}`).click(function(){
    //     let test = game.players[0].hand[i];
    //     word += test.toString();
    //     $(`#${id}`).remove();
    //     game.players[0].hand.splice(i, 1, null);
    //     $("#submit-word").val(word);
    //   });
    // }
  });
});
