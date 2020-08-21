import {Tile} from './Tile.js';
import {Hand} from './Hand.js';
import {Deck} from './Deck.js';
import {Board} from './Board.js';
import {Player} from './Player.js';

export class Game{
  //Public attributes
  public board: Board;
  public deck: Deck;
  public players: Player[];
  public turn: Player;

  //Private attributes
  private numPlayers: number = 2; //number of players playing the game
  private tilesPerPlayer: number = 8; //number of domino tiles distributed to each player

  constructor(players: Player[]){
    this.board = new Board();
    this.deck = new Deck();
    this.generateAllTiles();
    this.deck.sortTiles();
    //Adding players
    this.players = players;

    //setting hand for each player
    this.setPlayersHand();

  }

  //Method that updates the turn attribute (I'll implement something similar to a circular linked list for more than two players)
  public passTurn(): void{

  }

  private setPlayersHand(): void{
    for(let i=0;i<this.numPlayers;i++){//loop through all players
      let h: Hand = new Hand();
      for(let i=0;i<this.tilesPerPlayer;i++){//give the right amount of tiles to each of them
        h.addTile(this.deck.removeFirstTile());
      }
      this.players[i].setHand(h); //set their domino hand
    }
  }

  private generateAllTiles(): void{
    for(let i=0,j=0;j<28;i++,j++){
      let num: number = 127025+i;
      let horizontalUnicode: string = '&#'+num+';';
      let tile : Tile = new Tile(horizontalUnicode);

      let repeated = this.hasTile(tile);
      if(!repeated.result)//if there is no domino tile in the array yet, add it to it
        this.deck.addTile(tile);
      else//if there is, add flippedHorizontalUnicode to this tile (it's the flipped tile)
        j--;

    }
  }

  private hasTile(tile: Tile): {result: boolean, pos: number}{
    for(let i=0;i<this.deck.size();i++){
      if(tile.isEqual(this.deck.get(i))){
        return {result: true, pos: i};
      }
    }
    return {result: false, pos: null};
  }
}
