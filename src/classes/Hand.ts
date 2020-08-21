import {Tile} from './Tile.js';

export class Hand{
  private tiles: Tile[];

  constructor(){
    this.tiles = [];
  }

  public get(pos: number): Tile{
    return this.tiles[pos];
  }

  public addTile(t: Tile): void{
    this.tiles.push(t);
  }

  public removeTile(t: Tile): Tile{
    //loop through the tiles array and remove the item whose getUnicode() yields t.getUnicode();
    let index = -1;
    for(let i=0;i<this.tiles.length;i++){
      if(this.tiles[i].getHorizontalUnicode() ===t.getHorizontalUnicode())
        index = i;
    }

    if(index != -1){
      let removed: Tile = this.tiles[index];

      this.tiles.splice(index,1);
      return removed;
    }
    else
      return null;
  }

  public sortTiles(): void{
    this.tiles = this.tiles.sort(()=> Math.random()-0.5);
  }
  public size(): number{
    return this.tiles.length;
  }

}
