import { Tile } from '../classes/Tile.js';
import { game, playerTiles, computerTiles, boardTiles } from '../main.js';
//Methods that create components of the app
function createPlayersHand() {
    for (let i = 0; i < game.player.getHand().size(); i++) {
        //Creating domino tags
        let tilePlayer = document.createElement('small');
        let tileComputer = document.createElement('small');
        //Adding unicode attribute on small tags
        tilePlayer.setAttribute('unicode', game.player.getHand().get(i).getHorizontalUnicode());
        tileComputer.setAttribute('unicode', game.computer.getHand().get(i).getHorizontalUnicode());
        //Adding click event listener on player's tiles
        tilePlayer.addEventListener('click', onClick);
        //Inserting tile unicode into tags
        tilePlayer.innerHTML = game.player.getHand().get(i).verticalUnicode;
        tileComputer.innerHTML = game.computer.getHand().get(i).unknown;
        //appending domino tags into divs
        playerTiles.appendChild(tilePlayer);
        computerTiles.appendChild(tileComputer);
    }
}
//Event listeners
function onClick(e) {
    let element = e.currentTarget; //currentTarget has to have a type HTMLTextAreaElement (Not all element with type HTMLElement has the method getAttribute() - that's why I was getting that error)
    let tile = new Tile(element.getAttribute('unicode'));
    let play = game.board.isValid(tile);
    if (play.result) {
        let tileRemoved = game.player.hand.removeTile(tile);
        game.board.makePlay(tileRemoved, play.side);
        updateBoard();
        updatePlayerTiles();
    }
}
//Update methods
function updateBoard() {
    //update div with board every time a tile is added to it!
    boardTiles.innerHTML = '';
    console.log(game.board);
    for (let i = 0; i < game.board.size(); i++) {
        let t = document.createElement('small');
        if (game.board.get(i).isDouble())
            t.innerHTML = game.board.get(i).verticalUnicode;
        else
            t.innerHTML = game.board.get(i).getHorizontalUnicode();
        boardTiles.appendChild(t);
    }
}
function updatePlayerTiles() {
    playerTiles.innerHTML = '';
    console.log(game);
    for (let i = 0; i < game.player.getHand().size(); i++) {
        let t = document.createElement('small');
        //Updating click event listener on player's tiles
        t.addEventListener('click', onClick);
        //Updating unicode attribute on small tags
        t.setAttribute('unicode', game.player.getHand().get(i).getHorizontalUnicode());
        t.innerHTML = game.player.getHand().get(i).verticalUnicode;
        playerTiles.appendChild(t);
    }
}
function updateComputerTiles() {
    computerTiles.innerHTML = '';
    for (let i = 0; i < game.computer.getHand().size(); i++) {
        let t = document.createElement('small');
        t.innerHTML = game.computer.getHand().get(i).unknown;
        computerTiles.appendChild(t);
    }
}
export { createPlayersHand, updateBoard, updatePlayerTiles, updateComputerTiles };
