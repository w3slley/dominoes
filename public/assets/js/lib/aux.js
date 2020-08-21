import { Tile } from '../classes/Tile.js';
import { game, playerTiles, computerTiles, boardTiles } from '../main.js';
function createPlayersHand() {
    for (var i = 0; i < game.player.getHand().size(); i++) {
        var tilePlayer = document.createElement('small');
        var tileComputer = document.createElement('small');
        tilePlayer.setAttribute('unicode', game.player.getHand().get(i).getHorizontalUnicode());
        tileComputer.setAttribute('unicode', game.computer.getHand().get(i).getHorizontalUnicode());
        tilePlayer.addEventListener('click', onClick);
        tilePlayer.innerHTML = game.player.getHand().get(i).verticalUnicode;
        tileComputer.innerHTML = game.computer.getHand().get(i).unknown;
        playerTiles.appendChild(tilePlayer);
        computerTiles.appendChild(tileComputer);
    }
}
function onClick(e) {
    var element = e.currentTarget;
    var tile = new Tile(element.getAttribute('unicode'));
    var play = game.board.isMoveValid(tile);
    if (play.result) {
        var tileRemoved = game.player.hand.removeTile(tile);
        game.board.makePlay(tileRemoved, play.side);
        console.log(game);
        updateBoard();
        updatePlayerTiles();
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
    for (var i = 0; i < game.player.getHand().size(); i++) {
        var t = document.createElement('small');
        t.addEventListener('click', onClick);
        t.setAttribute('unicode', game.player.getHand().get(i).getHorizontalUnicode());
        t.innerHTML = game.player.getHand().get(i).verticalUnicode;
        playerTiles.appendChild(t);
    }
}
function updateComputerTiles() {
    computerTiles.innerHTML = '';
    for (var i = 0; i < game.computer.getHand().size(); i++) {
        var t = document.createElement('small');
        t.innerHTML = game.computer.getHand().get(i).unknown;
        computerTiles.appendChild(t);
    }
}
export { createPlayersHand, updateBoard, updatePlayerTiles, updateComputerTiles };
