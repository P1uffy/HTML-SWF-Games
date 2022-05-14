
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clamp = exports.GetFullNumberStr = exports.HexToRGBArray = exports.HexToRGB255Array = exports.HexToRGB = exports.HexToRGB255 = exports.RGBToHex = exports.ComponentToHex = exports.FractionalPart = exports.IsNumber = exports.__FixNumber = void 0;
/**
 * @return {number}
 */
var float_1 = __webpack_require__(/*! ../data/math/float */ "./src/data/math/float.ts");
function __FixNumber(value) {
    return Math.round(value * 1000000) / 1000000;
}
exports.__FixNumber = __FixNumber;
function IsNumber(str) {
    return parseFloat(str).toString() === str;
}
exports.IsNumber = IsNumber;
//todo maybe move to Float
function FractionalPart(n) {
    n = new float_1.Float(n);
    return n.Minus(n.Floor());
}
exports.FractionalPart = FractionalPart;
function ComponentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
exports.ComponentToHex = ComponentToHex;
function RGBToHex(r, g, b) {
    return "#" + ComponentToHex(r) + ComponentToHex(g) + ComponentToHex(b);
}
exports.RGBToHex = RGBToHex;
function HexToRGB255(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result)
        return {
            r255: parseInt(result[1], 16),
            g255: parseInt(result[2], 16),
            b255: parseInt(result[3], 16)
        };
    else {
        throw new Error("HEX color string was not correct: " + hex);
    }
}
exports.HexToRGB255 = HexToRGB255;
function HexToRGB(hex) {
    var rgb = HexToRGB255(hex);
    return {
        r: (rgb.r255 / 255),
        g: (rgb.g255 / 255),
        b: (rgb.b255 / 255),
    };
}
exports.HexToRGB = HexToRGB;
function HexToRGB255Array(hex) {
    var rgb = HexToRGB255(hex);
    return [
        rgb.r255, rgb.g255, rgb.b255,
    ];
}
exports.HexToRGB255Array = HexToRGB255Array;
function HexToRGBArray(hex) {
    var rgb = HexToRGB255(hex);
    return [
        (rgb.r255 / 255), (rgb.g255 / 255), (rgb.b255 / 255),
    ];
}
exports.HexToRGBArray = HexToRGBArray;
function GetFullNumberStr(x) {
    var e;
    var output = '' + x;
    if (Math.abs(x) < 1.0) {
        e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            output = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    }
    else {
        e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            output += (new Array(e + 1)).join('0');
        }
    }
    return output;
}
exports.GetFullNumberStr = GetFullNumberStr;
/*
function CalculateBuy(money: number, level: number, priceFirst: number, priceChange: number, count: number, debug = false)
    : {spent: number, levels: number, price: number} {
    const result = {
        spent: 0,
        levels: 0,
        price: 0,
    };

    const oldUpgradesCost = GetSum(priceFirst, priceChange, level - 1);
    const totalSum = oldUpgradesCost + money;

    let canBuyCount;
    if (count < 0) {
        canBuyCount = GetSumN(priceFirst, priceChange, totalSum);
    } else {
        canBuyCount = Math.min(level - 1 + count, GetSumN(priceFirst, priceChange, totalSum));
    }

    const canBuyCost = GetSum(priceFirst, priceChange, canBuyCount);
    result.spent = canBuyCost - oldUpgradesCost);
    result.levels = canBuyCount - (level - 1));
    result.price = GetElement(priceFirst, priceChange, level + result.levels));

    if (result.levels > 0) {
        // lol
    } else {
        if (debug) console.log('Cant buy anything\n');
        result.levels = 0;
        result.price = 0;
        result.spent = 0;
    }

    return result;
}

function GetSumN(a: number, d: number, s: number): number {
    const x11 = Math.pow(2 * a - d, 2);
    const x12 = (8 * d * s);
    const x1 = x11 + x12;
    const x2 = 2 * a - d;
    const x3 = 2 * d;
    return Math.floor((Math.sqrt(x1) - x2) / x3);
}

function GetSum(a: number, d: number, n: number): number {
    return ((2 * a + d * (n - 1)) / 2) * n;
}

function GetElement(a: number, d: number, n: number): number {
    return a + d * (n - 1);
}

function GetSumInterval(a: number, d: number, n1: number, n2: number): number {
    const s1 = ((2 * a + d * ((n1 - 1) - 1)) / 2) * (n1 - 1);
    const s2 = ((2 * a + d * (n2 - 1)) / 2) * n2;
    return s2 - s1;
}
*/
function Clamp(value, interval, inclusive) {
    if (inclusive === void 0) { inclusive = true; }
    if (inclusive) {
        return Math.min(Math.max(value, interval.Min), interval.Max);
    }
    else {
        return Math.min(Math.max(value, interval.Min + interval.Step), interval.Max - interval.Step);
    }
}
exports.Clamp = Clamp;

