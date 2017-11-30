import { Epicrabble } from "./../js/Epicrabble.js";

$(document).ready(function(){
  $("#button").click(function(){
    let word = $("#input").val();
    $.get(`http://api.wordnik.com:80/v4/word.json/${word}?useCanonical=false&includeSuggestions=true&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`).then(function(response){
      if(response.canonicalForm != undefined) {
        $("#output").text(`${response.canonicalForm}`);
      } else {
        $("#output").text("That ain't a word");
      }
    }).fail(function(error){
      alert("Please");
    })
  });
});
