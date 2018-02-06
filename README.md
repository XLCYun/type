# type

Type checking tool for javascript, testing in node.js v8.9.4 using mocha.

Every isType function has a match function call isNotType, which simply equals to `!isType()`.

# usage
```JavaScript
var type = require('type');

type.isInteger(2); // true
type.isNotInteger(2); // false
```

# API

Most of the checking function simply use `typeof` or `instanceof`, nothing fancy. 

* isUndefined(o) & isNotUndefined(o)
* isNull(o) & isNotNull(o)
* isAccessible(o) & isNotAccessible(o)
o is accessible while it is not null or undefined.
* isNaN(o) & isNotNaN(o)
* isNumber(o) & isNotNumber(o)
NaN is NOT A NUMBER.
* isFinite(o) & isNotFinite(o)
Simply use `isFinite()` in js to check, therefore, if the argument you pass is not a number, make sure you know how it work. 
if you want to check if o is a finite number, use `isFiniteNumber(o)`.
* isFiniteNumber(o) & isNotFiniteNumber(o)
* isString(o) & isNotString(o)
* isFunction(o) & isNotFunction(o)
* isArray(o) & isNotArray(o)
Same as Array.isArray(o)
* isBoolean(o) & isNotBoolean(o)
* isInteger(o) & isNotInteger(o)
o can be a string or number. If the decimal part is 0, string or number, it is regarded as an integer. 
```JavaScript
type.isInteger("1.0000"); // true
type.isInteger(23.0000); // true
```

If o is a string, any illegal character will cause a false result.
```JavaScript
type.isInteger(" 1.00"); // false
type.isInteger("1.00a"); // false
```

If you want to take "1.00"(in string) as a float, use `isFloatInString(o) && isNotFloatInString(o)`;
```JavaScript
o = "1.00";
type.isNumber(o) && type.isFloatInString(o); // true
```
* isFloat(o) && isNotFloat(o)
o can be a string or number. If the decimal part is 0, string or number, it is regarded as an integer, not float.
If you want to take "1.00"(in string) as a float, use `isFloatInString(o) && isNotFloatInString(o)`;
* isFloatInString(o) && isNotFloatInString(o)
Check a string o if it contains a float, any illegal character will cause a false result;
Return true even if the decimal part is zero or no decimal part.
```JavaScript
type.isFloatInString("-2.1"); // true
type.isFloatInString("2."); // = 2.0, true
type.isFloatInString(".1"); // = 0.1, true
type.isFloatInString("."); // = 0.0, true
type.isFloatInString(" .1"); // false, sapce is illegal as well
type.isFloatInString("2.1a"); // false
```
* isBuffer(o) && isNotBuffer(o)
* isError(o) && isNotError(o)
  * isAssertionError(o) & isNotAssertionError(o)
  * isSyntaxError(o) & isNotSyntaxError(o)
  * isRangeError(o) && isNotRangeError(o)
  * isReferenceError(o) && isNotReferenceError(o)
  * isTypeError(o) && isNotTypeError(o)
* isDate(o) && isNotDate(o)
if o is a string or an instance of Date that will be accepted by `Date.parse()`, isDate returns true; 
Therefore, time will not be acceptable.
```JavaScript
type.isDate("12:00:00"); // false;
```
* isRegExp(o) & isNotRegExp(o)
* isObject(o) & isNotObject(o)
NOTE: Function is an object.
```JavaScript
type.isObject(()=>{}); // true
```
