import {Tile} from './Tile.js';
import {Hand} from './Hand.js';
import {Deck} from './Deck.js';
import {Board} from './Board.js';
import {Player} from './Player.js';

export class Game{
  //Public attributes
  public gameId: string; //will be useful for multiplayer mode
  public board: Board;
  public deck: Deck;
  public players: Player[];
  public winners: Player[]; //stores winners (player at position 0 won first, player at position 1 won second and so on)
  public numPlayers: number; //number of players playing the game
  public tilesPerPlayer: number; //number of domino tiles distributed to each player

  //Private attributes
  private turnIndex: number; //stores index of player in the players array that has to play now

  constructor(numPlayers: number, tilesPerPlayer: number, players: Player[]){
    this.numPlayers = numPlayers;
    this.tilesPerPlayer = tilesPerPlayer;
    this.board = new Board();
    this.deck = new Deck();
    this.generateAllTiles();
    this.deck.sortTiles();
    //Adding players and initializing winners array
    this.players = players;
    this.winners = [];
    //setting hand for each player
    this.setPlayersHand();
    //choosing a random player (turn initial value is a number between 0 and players.length) to start game
    this.turnIndex = Math.round(Math.random()*(this.players.length-1));
  }

  //Finds user among players array using the type attribute (right now there is only one, so it doesn't halp that much)
  public getUser(): Player{
    for(let i=0;i<this.numPlayers;i++){
      if(this.players[i].getType() === 'user'){
        return this.players[i];
      }
    }
  }

  public getPlayer(playerId: number): Player{
    for(let i=0;i<this.numPlayers;i++){
      if(this.players[i].getPlayerId()===playerId){
        return this.players[i];
      }
    }
  }

  public isComputer(p: Player): boolean{
    return p.getPlayerId() > 0; //temporary solution, improve later
  }

  //Method that updates the turn attribute
  public passTurn(): void{
    if(this.turnIndex == this.players.length - 1)
      this.turnIndex = 0;
    else
      this.turnIndex++;
  }

  public getTurn(): Player{
    return this.players[this.turnIndex];
  }

  public getNextTurn(): Player{
    if(this.turnIndex + 1 == this.players.length)
      return this.players[0];
    else
      return this.players[this.turnIndex+1];
  }

  public addWinner(playerId: number): void{
    let player = this.getPlayer(playerId);
    this.removePlayer(player);
    this.winners.push(player);
    //adjusting turnIndex when player with last index wins the game
    if(this.turnIndex===this.players.length){
      this.turnIndex = 0;
    }
  }

  private removePlayer(p: Player): void{
    for(let i=0;i<this.players.length;i++){
      if(this.players[i].isEqual(p)){
        this.players.splice(i,1);
        return;
      }
    }
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
