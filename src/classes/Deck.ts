import {Tile} from './Tile.js';

export class Deck{
  tiles: Tile[];
  constructor(){
    this.tiles = [];
  }

  get(pos: number): Tile{
    return this.tiles[pos];
  }

  addTile(t: Tile): void{
    this.tiles.push(t);
  }

  removeFirstTile(): Tile{
    let removed: Tile = this.tiles[0];
    this.tiles.splice(0,1);
    return removed;

  }

  sortTiles(): void{
    this.tiles = this.tiles.sort(()=> Math.random()-0.5);
  }
  size(): number{
    return this.tiles.length;
  }

}
