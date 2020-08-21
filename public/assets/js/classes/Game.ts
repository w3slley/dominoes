import {Tile} from './Tile.js';
import {Hand} from './Hand.js';
import {Deck} from './Deck.js';
import {Board} from './Board.js';
import {Player} from './Player.js';

export class Game{
  public board: Board;
  public deck: Deck;
  public player: Player;
  public computer: Player;
  public turn: Player;

  constructor(p1: Player, p2: Player){
    this.board = new Board();
    this.deck = new Deck();
    this.generateAllTiles();
    this.deck.sortTiles();
    //Adding players
    this.player = p1;
    this.computer = p2;
    //setting player's hand
    let h1: Hand = new Hand();
    let h2: Hand = new Hand();
    for(let i=0;i<8;i++){
      h1.addTile(this.deck.removeFirstTile());
      h2.addTile(this.deck.removeFirstTile());
    }
    this.player.setHand(h1);
    this.computer.setHand(h2);
  }
  public getBoard(): Board{
    return this.board;
  }
  public getDeck(): Deck{
    return this.deck;
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
