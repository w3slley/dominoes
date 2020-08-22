import {Tile} from './Tile.js';

export class Deck{
  public tiles: Tile[];

  constructor(){
    this.tiles = [];
  }

  public get(pos: number): Tile{
    return this.tiles[pos];
  }

  //method used when first adding generated tiles to deck
  public addTile(t: Tile): void{
    this.tiles.push(t);
  }

  public removeFirstTile(): Tile{
    let removed: Tile = this.tiles[0];
    this.tiles.splice(0,1);
    return removed;

  }

  public sortTiles(): void{
    this.tiles = this.tiles.sort(()=> Math.random()-0.5);
  }
  public size(): number{
    return this.tiles.length;
  }

}
