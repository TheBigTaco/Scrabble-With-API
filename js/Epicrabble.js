export class Game {
  constructor() {
    this.players = [];
    this.board = [];
    this.selectedTile = [];
    this.selectedLetter = [];
    this.word = "";
    this.totalLetters = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "G", "G", "G", "H", "H", "I", "I", "I", "I", "I", "I", "I", "I", "I", "J", "K", "L", "L", "L", "L", "M", "M", "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O", "O", "O", "O", "P", "P", "Q", "R", "R", "R", "R", "R", "R", "S", "S", "S", "S", "T", "T", "T", "T", "T", "T", "U", "U", "U", "U", "V", "V", "W", "W", "X", "Y", "Y", "Z"];
    //TODO: Add blanks
  }
  generatePlayers(amount){
    for (var i = 0; i < amount; i++) {
      let player = new Player(i);
      this.players.push(player);
    }
  }
  generateLetters(draw) {
    for (var i = 0; i < this.players.length; i++) {
      if(draw) {
        let newHand = this.players[i].hand.filter(function(element){
          return element !== null;
        });
        let currentHandSize = 7 - newHand.length;
        this.players[i].hand = newHand;
        for (var j = 0; j < currentHandSize; j++) {
          if(this.totalLetters.length >= 1) {
            let randomNum = Math.floor(Math.random() * (this.totalLetters.length - .1));
            let splice = this.totalLetters.splice(randomNum, 1);
            let letter = splice.toString();
            this.players[i].hand.push(letter);
          }
        }
      } else {
        for (var j = 0; j < 7; j++) {
          let randomNum = Math.floor(Math.random() * (this.totalLetters.length - .1));
          let letter = this.totalLetters.splice(randomNum, 1);
          this.players[i].hand.push(letter.toString());
        }
      }
    }
  }
  generateBoard() {
    let htmlString = "";
    for (var j = 0; j < 15; j++) {
      htmlString += `<div class = 'row'>`;
      for (var i = 0; i < 15; i++) {
        htmlString += `<div class='tile' x-coord="${j}" y-coord="${i}" letter=""></div>`
      }
      htmlString += `</div>`;
    }
    return htmlString;
  }
}

export class Player {
  constructor(id) {
    this.id = id;
    this.hand = [];
    this.score = 0;
  }
  getElements(response) {
    if(response.entry_list.entry != undefined) {
      return true;
    } else {
      return false;
    }
  };
}
