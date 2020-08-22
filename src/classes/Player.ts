import {Hand} from './Hand.js';

export class Player{
  private playerId: number;
  private name: string;
  private type: string;
  public hand: Hand;

  constructor(playerId: number, name: string, type: string){
    this.playerId = playerId;
    this.name = name;
    this.type = type;
  }
  
  public getPlayerId(): number{
    return this.playerId;
  }

  public getName(): string{
    return this.name;
  }

  public setHand(hand: Hand): void{
    this.hand = hand;
  }

  isEqual(p: Player): boolean{
    return this.playerId == p.playerId; //later I'll have to think on a more precise comparison between players
  }
}
