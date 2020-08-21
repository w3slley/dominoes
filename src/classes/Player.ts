import {Hand} from './Hand.js';

export class Player{
  private name: string;
  public hand: Hand;

  constructor(name: string){
    this.name = name;
  }

  public getName(): string{
    return this.name;
  }

  public setHand(hand: Hand): void{
    this.hand = hand;
  }

  equal(p: Player): boolean{
    return this.name == p.name; //later I'll have to think on a more precise comparison between players
  }
}
