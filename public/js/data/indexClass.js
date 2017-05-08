export class Index {
    constructor(name, price, symbol, fScore) {
        this._name = name;
        this._price = price;
        this._symbol = symbol;
        this._fScore = fScore;
    }

    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    get symbol() {
        return this._symbol;
    }
    get fScore() {
        return this._fScore;
    }
}