import {Hand} from './Hand.js';

export class Player{
  name: string;
  hand: Hand;
  constructor(name: string){
    this.name = name;
  }
  //giveUp()
  //getHand()
  passTurn(): void{

  }
  equal(p: Player): boolean{
    return this.name == p.name; //later I'll have to think on a more precise comparison between players
  }
  getHand(): Hand{
    return this.hand;
  }
  setHand(hand: Hand): void{
    this.hand = hand;
  }
}
