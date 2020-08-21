import { Tile } from '../../classes/Tile.js';
import { game, playerTiles, computerTiles, boardTiles } from '../main.js';
function createPlayersHand() {
    for (var i = 0; i < game.players[0].hand.size(); i++) {
        var tilePlayer = document.createElement('small');
        var tileComputer = document.createElement('small');
        tilePlayer.setAttribute('unicode', game.players[0].hand.get(i).getHorizontalUnicode());
        tileComputer.setAttribute('unicode', game.players[1].hand.get(i).getHorizontalUnicode());
        tilePlayer.addEventListener('click', onClick);
        tilePlayer.innerHTML = game.players[0].hand.get(i).verticalUnicode;
        tileComputer.innerHTML = game.players[1].hand.get(i).unknown;
        playerTiles.appendChild(tilePlayer);
        computerTiles.appendChild(tileComputer);
    }
}
function onClick(e) {
    var element = e.currentTarget;
    var tile = new Tile(element.getAttribute('unicode'));
    var play = game.board.isMoveValid(tile);
    if (play.result) {
        var tileRemoved = game.players[0].hand.removeTile(tile);
        game.board.makePlay(tileRemoved, play.side);
        updateBoard();
        updatePlayerTiles();
        computerMove();
    }
}
function updateBoard() {
    boardTiles.innerHTML = '';
    for (var i = 0; i < game.board.size(); i++) {
        var t = document.createElement('small');
        if (game.board.get(i).isDouble())
            t.innerHTML = game.board.get(i).verticalUnicode;
        else
            t.innerHTML = game.board.get(i).getHorizontalUnicode();
        boardTiles.appendChild(t);
    }
}
function updatePlayerTiles() {
    playerTiles.innerHTML = '';
    for (var i = 0; i < game.players[0].hand.size(); i++) {
        var t = document.createElement('small');
        t.addEventListener('click', onClick);
        t.setAttribute('unicode', game.players[0].hand.get(i).getHorizontalUnicode());
        t.innerHTML = game.players[0].hand.get(i).verticalUnicode;
        playerTiles.appendChild(t);
    }
}
function updateComputerTiles() {
    computerTiles.innerHTML = '';
    for (var i = 0; i < game.players[1].hand.size(); i++) {
        var t = document.createElement('small');
        t.innerHTML = game.players[1].hand.get(i).verticalUnicode;
        computerTiles.appendChild(t);
    }
}
function computerMove() {
    var computerHand = game.players[1].hand;
    for (var i = 0; i < computerHand.size(); i++) {
        var tile = computerHand.get(i);
        var computerPlay = game.board.isMoveValid(tile);
        if (computerPlay.result) {
            var tileRemoved = game.players[1].hand.removeTile(tile);
            game.board.makePlay(tileRemoved, computerPlay.side);
            setTimeout(function () {
                updateBoard();
                updateComputerTiles();
            }, 2000);
            return;
        }
    }
    console.log('Computer doesn\'t have any tiles to play');
}
export { createPlayersHand };
