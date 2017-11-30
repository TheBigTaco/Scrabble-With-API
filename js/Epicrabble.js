export class Game {
  constructor() {
    this.players = [];
    this.board = [];
    this.selectedTile = [];
    this.selectedLetter = [];
    this.word = "";
    this.totalLetters = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "G", "G", "G", "H", "H", "I", "I", "I", "I", "I", "I", "I", "I", "I", "J", "K", "L", "L", "L", "L", "M", "M", "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O", "O", "O", "O", "P", "P", "Q", "R", "R", "R", "R", "R", "R", "S", "S", "S", "S", "T", "T", "T", "T", "T", "T", "U", "U", "U", "U", "V", "V", "W", "W", "X", "Y", "Y", "Z"];
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
        let currentHandSize = 7 - this.players[i].hand.length;
        for (var i = 0; i < currentHandSize; i++) {
          if(this.totalLetters >= 1) {
            let randomNum = Math.floor(Math.random() * (this.totalLetters.length - .1));
            let letter = this.totalLetters.splice(randomNum, 1);
            this.players[i].hand.push(letter);
          }
        }
      } else {
        for (var i = 0; i < 7; i++) {
          let randomNum = Math.floor(Math.random() * (this.totalLetters.length - .1));
          let letter = this.totalLetters.splice(randomNum, 1);
          this.players[i].hand.push(letter);
        }
      }
    }
  }
}

export class Player {
  constructor(id) {
    this.id = id;
    this.hand = [];
    this.score = 0;
  }
}
