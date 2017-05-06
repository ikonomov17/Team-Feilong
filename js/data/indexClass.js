class Index {
    constructor(name, price, symbol, volume) {
        this._name = name;
        this._price = price;
        this._symbol = symbol;
        this._volume = volume;
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
    get volume() {
        return this._volume;
    }
}

export { Index }