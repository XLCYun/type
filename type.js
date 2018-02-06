const AssertionError = require('assert').AssertionError;
/**
 * A module use to check the type of an object.
 * 
 * isNotType(o) equals to !(isType(o))
 * 
 * By XLCYun, 2018-02-05
 */
var type = {
    // undefined
    isUndefined: o => (typeof o === 'undefined'),
    isNotUndefined: o => (!type.isUndefined(o)),

    // Null
    isNull: o => (o === null),
    isNotNull: o => (!type.isNull(o)),

    // isNot undefined or isNot null
    isAccessible: o => (type.isNotUndefined(o) && type.isNotNull(o)),
    isNotAccessible: o => (!type.isAccessible(o)),

    // NaN
    isNaN: o => (isNaN(o)),
    isNotNaN: o => (!type.isNaN(o)),

    // Finite
    isFinite: o => (isFinite(o)),
    isNotFinite: o => (!type.isFinite(o)),

    // Number
    isNumber: o => (typeof o === 'number' && type.isNotNaN(o)),
    isNotNumber: o => (!type.isNumber(o)),

    // Finite Number
    isFiniteNumber: o => (type.isNumber(o) && type.isFinite(o)),
    isNotFiniteNumber: o => (!type.isFiniteNumber(o)),

    // String
    isString: o => (typeof o === 'string'),
    isNotString: o => (!type.isString(o)),

    // Function
    isFunction: o => (typeof o === 'function'),
    isNotFunction: o => (!type.isFunction(o)),

    // Array
    isArray: o => (Array.isArray(o)),
    isNotArray: o => (!type.isArray(o)),

    // Boolean
    isBoolean: o => (typeof o === 'boolean'),
    isNotBoolean: o => (!type.isBoolean(o)),

    // int
    isInteger: o => (type.isNumber(o) && (String(Number.parseInt(o)) === String(o))),
    isNotInteger: o => (!type.isInteger(o)),
    // int in string
    isIntegerInString: o => (type.isString(o) && /^[+-]?[0-9]+$/.test(o)), 
    isNotIntegerInString: o => (!type.isIntegerInString(o)), 

    // float, test for Number || test for String, unlinke parseInt, parseFloat(Infinity) returns Infinity, not NaN
    isFloat: o => (type.isNumber(o) && type.isFiniteNumber(o) && type.isNotInteger(o) /* && String(Number.parseFloat(o)) === String(o)*/ ), 
    isNotFloat: o => (!type.isFloat(o)),
    // float in string
    isFloatInString: o => (type.isString(o) && /^[+-]?[0-9]*\.[0-9]*$/.test(o)),
    isNotFloatInString: o => (!type.isFloatInString(o)), 

    // Buffer
    isBuffer: o => (o instanceof Buffer),
    isNotBuffer: o => (!type.isBuffer(o)),

    // Error, AssertionError, RangeError, ReferenceError, SyntaxError, TypeError
    isError: o => (o instanceof Error),
    isNotError: o => (!type.isError(o)),
    isAssertionError: o => (o instanceof AssertionError),
    isNotAssertionError: o => (!type.isAssertionError(o)),
    isSyntaxError: o => (o instanceof SyntaxError), 
    isNotSyntaxError: o => (!type.isSyntaxError(o)), 
    isRangeError: o => (o instanceof RangeError),
    isNotRangeError: o => (!type.isRangeError(o)),
    isReferenceError: o => (o instanceof ReferenceError),
    isNotReferenceError: o => (!type.isReferenceError(o)),
    isTypeError: o => (o instanceof TypeError),
    isNotTypeError: o => (!type.isTypeError(o)),

    // Date
    isDate: o => (type.isNotNumber(o) && type.isNotNaN(Date.parse(o))),
    isNotDate: o => (!type.isDate(o)),

    // RegExp
    isRegExp: o => (o instanceof RegExp),
    isNotRegExp: o => (!type.isRegExp(o)),

    // Object
    isObject: o => (typeof o === 'object' || type.isFunction(o)),
    isNotObject: o => (!type.isObject(o)),

};

module.exports = type;
