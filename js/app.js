/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

new Vue({
    el: '#app',
    data: {
        player: ['Player 1', 'Player 2'],
        dice: './img/dice-1.png',
        playerOneCurrent: 0,
        playerTwoCurrent: 0,
        playerOneScore: 0,
        playerTwoScore: 0,
        userOneActive: true,
        userTwoActive: false,
        winningNumber: 50,
        oneIsWinner: '',
        twoIsWinner: '',
        notWon: true,
        start: false
    },
    methods: {
        rollDice: function() {
            this.start = true;
            let diceNo = Math.floor(Math.random() * 6 + 1);
            this.dice = `./img/dice-${diceNo}.png`;
            if (diceNo == 1) {
                this.playerOneCurrent = 0;
                this.playerTwoCurrent = 0;
                this.userTwoActive = !this.userTwoActive;
                this.userOneActive = !this.userOneActive;
            } else {
                if (this.userOneActive === true) {
                    this.playerOneCurrent += diceNo;
                } else if (this.userTwoActive === true) {
                    this.playerTwoCurrent += diceNo;
                }
            }
        },
        holdScore: function() {
            if (this.userOneActive === true) {
                this.playerOneScore += this.playerOneCurrent;
                if (this.playerOneScore >= this.winningNumber) {
                    this.oneIsWinner = true;
                    this.userOneActive = false;
                    this.playerOneCurrent = 0;
                    this.notWon = false;
                    this.start = false;
                } else {
                    this.playerOneCurrent = 0;
                    this.userOneActive = false;
                    this.userTwoActive = true;
                }
            } else if (this.userTwoActive === true) {
                this.playerTwoScore += this.playerTwoCurrent;
                if (this.playerTwoScore >= this.winningNumber) {
                    this.twoIsWinner = true;
                    this.userTwoActive = false;
                    this.playerTwoCurrent = 0;
                    this.notWon = false;
                    this.start = false;
                } else {
                    this.playerTwoCurrent = 0;
                    this.userOneActive = true;
                    this.userTwoActive = false;
                }

            }
        },
        newGame: function() {
            this.playerTwoScore = 0;
            this.playerOneScore = 0;
            this.playerOneCurrent = 0;
            this.playerTwoCurrent = 0;
            this.twoIsWinner = false;
            this.userTwoActive = false;
            this.oneIsWinner = false;
            this.userOneActive = true;
            this.notWon = true;
            this.start = false;
        }
    }
});