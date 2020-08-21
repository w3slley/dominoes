var Tile = (function () {
    function Tile(horizontalUnicode) {
        this.horizontalStart = 127025;
        this.verticalStart = 127075;
        this.unknown = '&#127074;';
        this.isFlipped = false;
        this.horizontalUnicode = horizontalUnicode;
        this.getValues();
        this.verticalUnicode = this.getVerticalUnicode();
        this.flippedHorizontalUnicode = this.getFlippedHorizontalUnicode();
    }
    Tile.prototype.getHorizontalUnicode = function () {
        if (!this.isFlipped)
            return this.horizontalUnicode;
        else
            return this.flippedHorizontalUnicode;
    };
    Tile.prototype.flipHorizontally = function () {
        this.isFlipped = !this.isFlipped;
        var tmp = this.first;
        this.first = this.last;
        this.last = tmp;
    };
    Tile.prototype.getValues = function () {
        var diff = this.getNumFromUnicode(this.horizontalUnicode) - this.horizontalStart;
        for (var a = 0; a <= 6; a++) {
            for (var b = 0; b <= 6; b++) {
                if ((7 * a + b) === diff) {
                    this.first = a;
                    this.last = b;
                }
            }
        }
    };
    Tile.prototype.getVerticalUnicode = function () {
        var n = this.verticalStart + 7 * this.first + this.last;
        return "&#" + n + ';';
    };
    Tile.prototype.getFlippedHorizontalUnicode = function () {
        var n;
        if (this.last === this.first)
            return null;
        if (this.last > this.first)
            n = this.getNumFromUnicode(this.horizontalUnicode) + 6 * (this.last - this.first);
        else if (this.last < this.first)
            n = this.getNumFromUnicode(this.horizontalUnicode) - 6 * (this.first - this.last);
        return '&#' + n + ';';
    };
    Tile.prototype.isDouble = function () {
        return this.first == this.last;
    };
    Tile.prototype.isEqual = function (t) {
        return (this.first == t.first && this.last == t.last) || (this.first == t.last && this.last == t.first);
    };
    Tile.prototype.getNumFromUnicode = function (unicode) {
        return +unicode.match(/\d/g).join("");
    };
    return Tile;
}());
export { Tile };
