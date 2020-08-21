export class Tile{
  //CONSTANTS
  private horizontalStart = 127025;
  private verticalStart = 127075;
  public unknown: string = '&#127074;'; //unicode for unknown domino tile (useful for opponent)

  //PUBLIC ATTRIBUTES
  public first: number; //leftmost value while horizontal and upmost value while vertical
  public last: number; //rightmost value while horizontal and bottommost value while vertical
  public verticalUnicode: string;

  //PRIVATE ATTRIBUTES
  private horizontalUnicode: string;
  private flippedHorizontalUnicode: string; //unicode for the horizontal flipped domino tile
  private isFlipped: boolean;

  constructor(horizontalUnicode: string){
    this.isFlipped = false;
    this.horizontalUnicode = horizontalUnicode; //saving vertical unicode
    this.getValues();//assigning values from the vertical unicode string.
    this.verticalUnicode = this.getVerticalUnicode(); //saving horizontal unicode
    this.flippedHorizontalUnicode = this.getFlippedHorizontalUnicode();  //saving flipped horizontal unicode
  }

  public getHorizontalUnicode(): string{
    if(!this.isFlipped)
      return this.horizontalUnicode;
    else
      return this.flippedHorizontalUnicode;
  }

  public flipHorizontally(): void{
      this.isFlipped = !this.isFlipped;

      //switching first and last values
      let tmp: number = this.first;
      this.first = this.last;
      this.last = tmp;
  }

  private getValues(): void{
    let diff: number = this.getNumFromUnicode(this.horizontalUnicode)-this.horizontalStart;
    for(let a=0;a<=6;a++){
      for(let b=0;b<=6;b++){
        if((7*a+b) === diff){
          this.first = a;
          this.last = b;
        }
      }
    }
  }

  private getVerticalUnicode(): string{
    let n: number = this.verticalStart + 7*this.first + this.last;
    return "&#"+n+';';
  }

  private getFlippedHorizontalUnicode(): string{
    let n: number;
    if(this.last === this.first)
      return null;
    if(this.last > this.first)
      n= this.getNumFromUnicode(this.horizontalUnicode) + 6*(this.last - this.first);
    else if(this.last < this.first)
      n = this.getNumFromUnicode(this.horizontalUnicode) - 6*(this.first - this.last);

    return '&#'+n+';';

  }

  //Methods that perform comparison between tiles
  public isDouble(): boolean{
    return this.first == this.last;
  }

  public isEqual(t: Tile): boolean{
    //if two tiles have the same first and last values they are equal. If they have a first value equal to its last, they are also equal (it's the same piece)
    return (this.first == t.first && this.last == t.last) || (this.first == t.last && this.last == t.first);
  }

  private getNumFromUnicode(unicode: string): number{
    return +unicode.match(/\d/g).join("");//uses regex to get all digits and combines them with "", ultimately returning only digits.
  }

}
