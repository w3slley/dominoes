import {Tile} from '../classes/Tile.js';
import {Hand} from '../classes/Hand.js';
import {Player} from '../classes/Player.js';
import {playerMove, getTileFromDeck, passTurn} from './player.js';
import {game} from './main.js';


/*
//Methods that create/update components of the app
*/

function createBoard(): void{
  //adding board div to document
  let boardDiv: HTMLElement = document.createElement('div');
  boardDiv.classList.add('board');
  document.querySelector('body').appendChild(boardDiv);
  //creating the hand of each user
  for(let p=0;p<game.numPlayers;p++){
    let player: Player = game.players[p];
    let playerTilesDiv: HTMLElement = document.createElement('div');//div which contains tile small tags
    //Adding classes based on type of user for positioning on the board
    if(player.getType()==='user'){
      playerTilesDiv.classList.add('user');
    }
    else{
      playerTilesDiv.classList.add('computer'+player.getPlayerId());
    }
    //adding player name into div
    let playerName: HTMLElement = document.createElement('p');
    playerName.innerHTML = player.getName();
    playerTilesDiv.appendChild(playerName);
    //adding player hand div into html body
    document.querySelector('body').appendChild(playerTilesDiv)

    for(let t=0;t<game.tilesPerPlayer;t++){
      //create small tag for tiles and add vertical class to it
      let tile: HTMLElement = document.createElement('small');
      if(player.getType()==='user'){//if the player is a user
        tile.classList.add('vertical');//tile orientation is vertical
        //add unicode attribute on player's tiles
        tile.setAttribute('unicode',player.hand.get(t).getHorizontalUnicode());
        //Adding click event listener on player's tiles
        tile.addEventListener('click', selectTile);
        //Inserting tile unicode into tags
        tile.innerHTML = player.hand.get(t).verticalUnicode;
      }
      else if(player.getType()==='computer'){//if it's a bot (computer)
        //If user plays against only one computer
        if(game.numPlayers===2){
          tile.classList.add('vertical');
          tile.innerHTML = game.players[p].hand.get(t).unknownVertical;
        }
        //If user plays against 3 computer players
        else if(game.numPlayers===4){
          //Inserting tile unicode into tags
          if(player.getPlayerId()==2){//if it's the bot that stays at the top of the screen (that's computer 2)
            tile.classList.add('vertical');
            tile.innerHTML = game.players[p].hand.get(t).unknownVertical;
          }
          else{//all other bots
            tile.classList.add('horizontal');
            tile.innerHTML = game.players[p].hand.get(t).unknownHorizontal;
          }
        }
      }
      playerTilesDiv.appendChild(tile);
    }
  }
  //create pass turn btn
  createPassTurnBtn();
  //initialize deck div
  updateDeck();
}

//Update methods
function updateBoard(): void{
  //update div with board every time a tile is added to it!
  let boardTiles: HTMLElement = document.querySelector('.board');
  boardTiles.innerHTML = '';
  for(let i=0;i<game.board.size();i++){
    let t = document.createElement('small');
    if(game.board.get(i).isDouble()){
      t.innerHTML = game.board.get(i).verticalUnicode;
      t.classList.add('vertical');
    }
    else{
      t.innerHTML = game.board.get(i).getHorizontalUnicode();
      t.classList.add('horizontal');
    }
    boardTiles.appendChild(t);
  }
}

function updateUserTiles(): void{
  let user: Player = game.getUser();
  let userTiles: HTMLElement = document.querySelector('.user');
  userTiles.innerHTML = '';
  //adding player name into div
  let playerName: HTMLElement = document.createElement('p');
  playerName.innerHTML = user.getName();
  userTiles.appendChild(playerName);

  for(let i=0;i<user.hand.size();i++){
    let t = document.createElement('small');
    t.addEventListener('click', selectTile);
    t.setAttribute('unicode', user.hand.get(i).getHorizontalUnicode());
    t.classList.add('vertical');
    t.innerHTML = user.hand.get(i).verticalUnicode;
    userTiles.appendChild(t);
  }
}

function updateComputerTiles(playerId: number){
  let computerPlayer: Player = game.getPlayer(playerId);
  let computerTiles: HTMLElement = document.querySelector('.computer'+playerId);
  computerTiles.innerHTML = '';
  //adding player name into div
  let playerName: HTMLElement = document.createElement('p');
  playerName.innerHTML = computerPlayer.getName();
  computerTiles.appendChild(playerName);

  for(let i=0;i<computerPlayer.hand.size();i++){
    let t = document.createElement('small');
    if(playerId === 2){
      t.classList.add('vertical');
      t.innerHTML = computerPlayer.hand.get(i).unknownVertical;
    }
    else{
      t.classList.add('horizontal');
      t.innerHTML = computerPlayer.hand.get(i).unknownHorizontal;
    }
    computerTiles.appendChild(t);
  }
}

function updateDeck(): void{
  let deck: HTMLDivElement = document.querySelector('.deck');
  deck.style.display = 'block';
  deck.addEventListener('click', getTileFromDeck);
  deck.innerHTML = `Deck (${game.deck.size()})`;
}

function createPassTurnBtn(): void{
  let div: HTMLElement = document.querySelector('.pass-turn');
  div.innerHTML = 'Pass turn';
  div.addEventListener('click', passTurn);
  div.style.display = 'block';
}

function updateWinnerTiles(playerId: number): void{
  let playerHand: HTMLElement;
  if(playerId === game.getUser().getPlayerId()){
      playerHand = document.querySelector('.user');
      //removing user buttons from screen
      let btns = document.querySelector('.player-buttons');
      //btns.remove();
      btns.innerHTML = '';
  }
  else
    playerHand = document.querySelector('.computer'+playerId);
  //change player's html hand
  playerHand.innerHTML = "WON";
}

//Event listeners
function selectTile(e: MouseEvent): void{
  let btn: Element = clearAndReturnButtonsDiv();

  let element = e.currentTarget as HTMLElement;//currentTarget has to have a type HTMLElement (Not all element with type HTMLElement has the method getAttribute() - that's why I was getting that error)
  let horizontalUnicode: string = element.getAttribute('unicode');
  let left: HTMLButtonElement = document.createElement('button');
  let right: HTMLButtonElement = document.createElement('button');

  //setting attributes on side buttons
  //left button
  left.classList.add('left');
  left.setAttribute('horizontal-unicode', horizontalUnicode);
  left.addEventListener('click', playerMove);
  left.innerHTML = 'Add Left';
  //right button
  right.classList.add('right');
  right.setAttribute('horizontal-unicode', horizontalUnicode);
  right.addEventListener('click', playerMove);
  right.innerHTML = 'Add Right';

  //checking if current tile can be used
  let tile: Tile = new Tile(horizontalUnicode);
  let play = game.board.isMoveValid(tile);
  if(play.result){
    if(play.side == 'both'){
      btn.appendChild(left);
      btn.appendChild(right);
    }
    else if(play.side == 'right')
      btn.appendChild(right);
    else if(play.side == 'left')
      btn.appendChild(left);
  }
}


function clearAndReturnButtonsDiv(): Element{
  let className: string = 'buttons';
  let btnDiv: HTMLElement = document.querySelector('.'+className);
  btnDiv.innerHTML = '';
  return btnDiv;
}


export {createBoard, updateUserTiles, updateComputerTiles, updateBoard, updateDeck, updateWinnerTiles, clearAndReturnButtonsDiv};
