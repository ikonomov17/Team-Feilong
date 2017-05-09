class FScore {

    total(arr) {


        // Four interpretation idicators, each with diferent impact on the total points;
        const firstPrice = 40,
            secondPrice = 17,
            thirdPrice = 10,
            fourthPrice = 7,
            fifthPrice = 6;

        let tankenSenNow = FScore.tankenSen(arr),
            kijunSenNow = FScore.kijunSen(arr),
            senkouSpanANow = FScore.senkouSpanA(arr),
            senkouSpanBNow = FScore.senkouSpanB(arr),
            chikouSpanNow = FScore.chikouSpan(arr),
            price = arr[0].close,
            positivePoints = 0,
            negativePoints = 0,
            aboveTheCloud = (price > tankenSenNow && price > kijunSenNow),
            inTheCloud = ((price > tankenSenNow && price < kijunSenNow) || (price < tankenSenNow && price > kijunSenNow)),
            positiveMultiplicator = 1,
            negativeMultiplicator = 1;



        if (aboveTheCloud) {
            positiveMultiplicator = 1.5;
        } else if (inTheCloud) {

        } else {
            negativeMultiplicator = 1.5;
        }

        // First indicator (is the price above the cloud)
        if (price > tankenSenNow && price > kijunSenNow) {
            positivePoints += firstPrice;
        } else if (price < tankenSenNow && price < kijunSenNow) {
            negativePoints -= firstPrice;
        }

        // Second indicator (is the cloud green)
        if (senkouSpanANow > senkouSpanBNow) {
            positivePoints += secondPrice * positiveMultiplicator * negativeMultiplicator;
        } else {
            negativePoints -= secondPrice * positiveMultiplicator * negativeMultiplicator;
        }

        // Third indicator (If the price is above or below the Base line)
        if (price > kijunSenNow) {
            positivePoints += thirdPrice * positiveMultiplicator * negativeMultiplicator;
        } else {
            negativePoints -= thirdPrice * positiveMultiplicator * negativeMultiplicator;
        }

        // Fourth indicator (if the Conversion line(Tenkan-sen) is above the Base line(Kijun-sen) )
        if (tankenSenNow > kijunSenNow) {
            positivePoints += fourthPrice * positiveMultiplicator * negativeMultiplicator;
        } else {
            negativePoints -= fourthPrice * positiveMultiplicator * negativeMultiplicator;
        }

        // Fifth indicator (if the price 26 periods from now is higher than current price)
        if (price > chikouSpanNow) {
            positivePoints += fifthPrice * positiveMultiplicator * negativeMultiplicator;
        } else {
            negativePoints -= fifthPrice * positiveMultiplicator * negativeMultiplicator;
        }

        let totalPoints = positivePoints + negativePoints;

        return {
            positivePoints,
            negativePoints,
            totalPoints: +totalPoints,
            aboveTheCloud,
            inTheCloud
        }
    }

    // Get indicators data (all five lines):
    static tankenSen(arr) {
        return 20;
        let tankenSen = 0,
            high = 0,
            low = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < 9; i += 1) {
            if (arr[i].high > high) {
                high = arr[i].high;
            }
            if (arr[i].low < low) {
                low = arr[i].low;
            }
        }
        tankenSen = ((+low) + (+high)) / 2;
        return +tankenSen.toFixed(4);
    }

    static kijunSen(arr) {
        return 100;
        let tankenSen = 0,
            high = 0,
            low = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < 26; i += 1) {
            if (arr[i].high > high) {
                high = arr[i].high;
            }
            if (arr[i].low < low) {
                low = arr[i].low;
            }
        }
        tankenSen = ((+low) + (+high)) / 2;
        return +tankenSen.toFixed(4);
    }

    static senkouSpanA(arr) {
        arr = arr.slice(26);
        let result = (FScore.tankenSen(arr) + FScore.kijunSen(arr)) / 2
        return +result.toFixed(4);
    }

    static senkouSpanB(arr) {
        return 20;
        arr = arr.slice(26);
        let tankenSen = 0,
            high = 0,
            low = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < 52; i += 1) {
            if (arr[i].high > high) {
                high = arr[i].high;
            }
            if (arr[i].low < low) {
                low = arr[i].low;
            }
        }
        tankenSen = ((+low) + (+high)) / 2;
        return +tankenSen.toFixed(4);
    }

    static chikouSpan(arr) {
        return 3;
        let result = arr[25].high;
        return +result;
    }
}

export { FScore }