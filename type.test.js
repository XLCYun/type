var type = require('./type');
var should = require('should');
var AssertionError = require('assert').AssertionError;

var aObject = Object({});
var bObject = {
    a: 2,
    b: function () {},
};
var aFunction = function () {};
var bFunction = (e) => {};
var aArray = [aObject, aFunction];
var bArray = Array();
var aString = "str";
var bString = String();
var aDate = new Date();
var aInteger = 123;
var aFloat = 1.230;
var aRegExp = /abc/;
var aBuffer = Buffer.from(aArray);
var aError = Error("error");
var aBoolean = true;
var aNaN = NaN;
var aInfinity = Infinity;
var bInfinity = -Infinity;
var aNull = null;
var aUndefined = undefined;


var basicTestSample = [aObject, bObject, aFunction, bFunction, aArray, bArray,
    aString, bString, aDate, aInteger, aFloat, aRegExp, aBuffer,
    aError, aBoolean, aNaN, aInfinity, bInfinity, aNull, aUndefined
];

function contains(arr, item) {
    for (let i of arr) {
        if (i === item || (isNaN(i) && isNaN(item))) {
            return true;
        }
    }
    return false;
}

function filterBasicTestSample(ignore) {
    var newArray = Array();
    for (let i of basicTestSample) {
        if (!contains(ignore, i)) {
            newArray.push(i);
        }
    }
    return newArray;
}

function runBasicTest(ignore, isFunc, isNotFunc) {
    let arr = filterBasicTestSample(ignore);
    arr.some(function (item, index, array) {
        return isFunc(item);
    }).should.be.false();
    ignore.every(function (item, index, array) {
        return isFunc(item);
    }).should.be.true();
    arr.every(function (item, index, array) {
        return isNotFunc(item);
    }).should.be.true();
    ignore.some(function (item, index, array) {
        return isNotFunc(item);
    }).should.be.false();
}

describe('test for type', function () {
    it('test for undefined', function () {
        runBasicTest([aUndefined], type.isUndefined, type.isNotUndefined);
    });
    it('test for null', function () {
        runBasicTest([aNull], type.isNull, type.isNotNull);
    });
    it('test for accessible', function () {
        // change the position of isFunc and isNotFunc, to match the ignore array.
        runBasicTest([aNull, aUndefined], type.isNotAccessible, type.isAccessible);
    });
    it('test for NaN', function () {
        runBasicTest([aNaN], type.isNaN, type.isNotNaN);
    });
    it('test for Finite', function () {
        // change the position of isFunc and isNotFunc, to match the ignore array.
        runBasicTest([aInfinity, bInfinity, aObject, bObject], type.isNotFinite, type.isFinite);
    });
    it('test for Number', function () {
        // note, additional sample in ignore array, will be test as well, 
        // they should be a correct number in here.
        runBasicTest([aInteger, aFloat, aInfinity, bInfinity, 0.1, .2, 3.,
            10000000000, 80000000000, -3, -1000000000, -1234567891011, -12345, -123, -1, 0,
            1, 123, 12345, 12345678910, -1.12345678910, -1234.56778, 1.1234567, 1234.13425
        ], type.isNumber, type.isNotNumber);
        // add some not number sample to test, change the position of isFunc and isNotFunc
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray,
            aString, bString, aDate, aRegExp, aBuffer,
            aError, aBoolean, aNaN, aNull, aUndefined,
            "asdfadg", "123543246", type, should
        ], type.isNotNumber, type.isNumber);
    });
    it('test for FiniteNumber', function () {
        runBasicTest([aInteger, aFloat, -1234567891011, -12345, -123, -1, 0,
            1, 123, 12345, 12345678910, -1.12345678910, -1234.56778, 1.1234567, 1234.13425
        ], type.isFiniteNumber, type.isNotFiniteNumber);
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray,
            aString, bString, aDate, aRegExp, aBuffer,
            aError, aBoolean, aNaN, aInfinity, bInfinity, aNull, aUndefined
        ], type.isNotFiniteNumber, type.isFiniteNumber);
    });
    it('test for String', function () {
        runBasicTest([aString, bString], type.isString, type.isNotString);
    });
    it('test for Function', function () {
        runBasicTest([aFunction, bFunction], type.isFunction, type.isNotFunction);
    });
    it('test for Array', function () {
        runBasicTest([aArray, bArray], type.isArray, type.isNotArray);
    });
    it('test for Boolean', function () {
        runBasicTest([aBoolean], type.isBoolean, type.isNotBoolean);
    });
    it('test for Integer', function () {
        runBasicTest([aInteger, 10000000000, 80000000000, -3, -1000000000, -1234567891011, -12345, -123, -1, 0,
                1, 123, 12345, 12345678910, 1.0, -11111.00000, "1.0", "-11111.0000000", "1111.000"
            ],
            type.isInteger, type.isNotInteger);
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray,
                aString, bString, aDate, aFloat, aRegExp, aBuffer,
                aError, aBoolean, aNaN, aInfinity, bInfinity, aNull, aUndefined,
                ".00001", "0.0001", "-1.2", "1.2", "12345.6890", "-123456.9000", "."
            ],
            type.isNotInteger, type.isInteger);
    });
    it('test for Float', function () {
        runBasicTest([aFloat, -123456.1790234, -612.01, -1.2345, -1.000002, 1.2345, 1234.324576, 23145646.01,
            "-123456.1234", "-5123.234", "-1.1234", -"1.00002", "1.2345", "1234.324"
        ], type.isFloat, type.isNotFloat);
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray,
            aString, bString, aDate, aRegExp, aBuffer,
            aError, aBoolean, aNaN, aInfinity, bInfinity, aNull, aUndefined, aInteger,
            "asd1234", " 123.4", "1.3a45"
        ], type.isNotFloat, type.isFloat);
    });
    it('test for FloatInString', function () {
        runBasicTest(["-123456.1234", "-5123.234", "-1.1234", "-1.00002", "1.2345", "1234.324", "00.00000000000001", "1234.132498"], type.isFloatInString, type.isNotFloatInString);
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray,
            aString, bString, aDate, aRegExp, aBuffer,
            aError, aBoolean, aNaN, aInfinity, bInfinity, aNull, aUndefined, aInteger,
            "asd1234", " 123.4", "1.3a45", "*1234.234", aInteger, aFloat
        ], type.isNotFloatInString, type.isFloatInString);
    });
    it('test for Buffer', function () {
        runBasicTest([aBuffer], type.isBuffer, type.isNotBuffer);
    });
    it('test for Error', function () {
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray,
            aString, bString, aDate, aInteger, aFloat, aRegExp, aBuffer,
            aBoolean, aNaN, aInfinity, bInfinity, aNull, aUndefined,
        ], type.isNotError, type.isError);
        runBasicTest([new AssertionError({}), new RangeError("RE"), new ReferenceError("RefE"), new TypeError("TE"), new SyntaxError("SE"), 
        aError, new Error("error")], type.isError, type.isNotError);

        runBasicTest([new AssertionError({})], type.isAssertionError, type.isNotAssertionError);
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray,
                aString, bString, aDate, aInteger, aFloat, aRegExp, aBuffer,
                aError, aBoolean, aNaN, aInfinity, bInfinity, aNull, aUndefined,
                new RangeError("RE"), new ReferenceError("RefE"), new TypeError("TE"), new SyntaxError("SE")
            ],
            type.isNotAssertionError, type.isAssertionError);


        runBasicTest([new RangeError("RE")], type.isRangeError, type.isNotRangeError);
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray,
                aString, bString, aDate, aInteger, aFloat, aRegExp, aBuffer,
                aError, aBoolean, aNaN, aInfinity, bInfinity, aNull, aUndefined, 
                new AssertionError({}), new ReferenceError("RefE"), new TypeError("TE"), new SyntaxError("SE"), 
            ],
            type.isNotRangeError, type.isRangeError);

        runBasicTest([new ReferenceError("RefE")], type.isReferenceError, type.isNotReferenceError);
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray,
                aString, bString, aDate, aInteger, aFloat, aRegExp, aBuffer,
                aError, aBoolean, aNaN, aInfinity, bInfinity, aNull, aUndefined, 
                new AssertionError({}), new RangeError("RE"), new TypeError("TE"), new SyntaxError("SE")
            ],
            type.isNotReferenceError, type.isReferenceError);


        runBasicTest([new TypeError("TE")], type.isTypeError, type.isNotTypeError);
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray,
                aString, bString, aDate, aInteger, aFloat, aRegExp, aBuffer,
                aError, aBoolean, aNaN, aInfinity, bInfinity, aNull, aUndefined, 
                new AssertionError({}), new RangeError("RE"), new ReferenceError("RefE"), new SyntaxError("SE"), 
            ],
            type.isNotTypeError, type.isTypeError);


        runBasicTest([new SyntaxError("SE")], type.isSyntaxError, type.isNotSyntaxError);
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray,
                aString, bString, aDate, aInteger, aFloat, aRegExp, aBuffer,
                aError, aBoolean, aNaN, aInfinity, bInfinity, aNull, aUndefined, 
                new AssertionError({}), new RangeError("RE"), new ReferenceError("RefE"), new TypeError("TE"),
            ],
            type.isNotSyntaxError, type.isSyntaxError);
    });
    it('test for Date', function () {
        runBasicTest([aDate, "2015 01 05", 'Tue Feb 06 2018 12:05:02 GMT+0800 (中国标准时间)',
            'Tue Feb 06 2018', "0001 01 01"
        ], type.isDate, type.isNotDate);
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray,
                aString, bString, aInteger, aFloat, aRegExp, aBuffer,
                aError, aBoolean, aNaN, aInfinity, bInfinity, aNull, aUndefined,
                "2018 a 01 04", 'Tue Feb 06 2018 a 12:05:02', "12:23:02"
            ],
            type.isNotDate, type.isDate);
    });
    it('test for RegExp', function () {
        runBasicTest([aRegExp], type.isRegExp, type.isNotRegExp);
    });
    it('test for Object', function () {
        runBasicTest([aObject, bObject, aFunction, bFunction, aArray, bArray, aDate,
            aRegExp, aBuffer, aError, aNull
        ], type.isObject, type.isNotObject);
    });
});