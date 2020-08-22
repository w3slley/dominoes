import {Tile} from './Tile.js';

export class Board{
  private left: number;//number necessary to make a valid play on the left of the board
  private right: number;//number necessary to make a valid play on the right of the board
  private tiles: Tile[];

  constructor(){
    this.tiles = [];
    this.right = null;
    this.left = null;
  }
  public get(pos: number): Tile{
    return this.tiles[pos];
  }
  public getBoard(): Tile[]{
    return this.tiles;
  }

  public makePlay(tile: Tile, side: string): void{
    //For the initial play, set left and right with the values from tile and add left (array was empty before, so it doesn't really matter)
    if(this.right === null && this.left === null){
      this.left = tile.first;
      this.right = tile.last;
      this.addLeft(tile);
      return;
    }

    if(side === 'left'){
      if(tile.last != this.left)
        tile.flipHorizontally();

      this.left = tile.first;//updating left value with current tile
      this.addLeft(tile);
    }
    else if(side === 'right'){
      if(this.right != null && tile.first != this.right)
        tile.flipHorizontally();

      this.right = tile.last; //pdating right value with current tile
      this.addRight(tile);
    }
    else{//Code only executed while adding computer tile that can be played both left and right (it's added to the left of the board by default and I'll change it later)
      if(this.left != null && tile.last != this.left){
        tile.flipHorizontally();
      }

      this.left = tile.first;
      this.addLeft(tile);
    }
  }

  public isMoveValid(tile: Tile): {result: boolean, side: string}{
    if(this.left === null && this.right === null)
      return {result: true, side: 'both'};
    else{
      let result: boolean = false;
      let side: string = null;

      if(tile.first == this.right || tile.last == this.right){
        result = true;
        side = 'right';
      }
      if(tile.first == this.left || tile.last === this.left){
        if(result)
          side = 'both';
        else{
          result = true;
          side = 'left';
        }
      }
      return {result, side};
    }
  }

  public size(): number{
    return this.tiles.length;
  }

  private addLeft(tile: Tile): void{
    this.tiles.unshift(tile);
  }

  private addRight(tile: Tile): void{
    this.tiles.push(tile);
  }
}
