export class Tile {
    constructor(horizontalUnicode) {
        //CONSTANTS
        this.horizontalStart = 127025;
        this.verticalStart = 127075;
        this.unknown = '&#127074;'; //unicode for unknown domino tile (useful for opponent)
        this.isFlipped = false;
        this.horizontalUnicode = horizontalUnicode; //saving vertical unicode
        this.getValues(); //assigning values from the vertical unicode string.
        this.verticalUnicode = this.getVerticalUnicode(); //saving horizontal unicode
        this.flippedHorizontalUnicode = this.getFlippedHorizontalUnicode(); //saving flipped horizontal unicode
    }
    getHorizontalUnicode() {
        if (!this.isFlipped)
            return this.horizontalUnicode;
        else
            return this.flippedHorizontalUnicode;
    }
    flipHorizontally() {
        this.isFlipped = !this.isFlipped;
        //switching first and last values
        let tmp = this.first;
        this.first = this.last;
        this.last = tmp;
    }
    getValues() {
        let diff = this.getNumFromUnicode(this.horizontalUnicode) - this.horizontalStart;
        for (let a = 0; a <= 6; a++) {
            for (let b = 0; b <= 6; b++) {
                if ((7 * a + b) === diff) {
                    this.first = a;
                    this.last = b;
                }
            }
        }
    }
    getVerticalUnicode() {
        let n = this.verticalStart + 7 * this.first + this.last;
        return "&#" + n + ';';
    }
    getFlippedHorizontalUnicode() {
        let n;
        if (this.last === this.first)
            return null;
        if (this.last > this.first)
            n = this.getNumFromUnicode(this.horizontalUnicode) + 6 * (this.last - this.first);
        else if (this.last < this.first)
            n = this.getNumFromUnicode(this.horizontalUnicode) - 6 * (this.first - this.last);
        return '&#' + n + ';';
    }
    //Methods that perform comparison between tiles
    isDouble() {
        return this.first == this.last;
    }
    isEqual(t) {
        //if two tiles have the same first and last values they are equal. If they have a first value equal to its last, they are also equal (it's the same piece)
        return (this.first == t.first && this.last == t.last) || (this.first == t.last && this.last == t.first);
    }
    getNumFromUnicode(unicode) {
        return +unicode.match(/\d/g).join(""); //uses regex to get all digits and combines them with "", ultimately returning only digits.
    }
}
