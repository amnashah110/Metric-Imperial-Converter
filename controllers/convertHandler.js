const smallUnits = ['km', 'kg', 'L'];
const bigUnits = ['mi', 'lbs', 'gal'];

function parseFraction(str) {
  let slashCount = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '/') {
      slashCount++;
    }
  }

  if (slashCount === 1) {
    const [numerator, denominator] = str.split('/').map(Number);
    if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
      return numerator / denominator;
    } else {
      return NaN;
    }
  } else {
    return NaN;
  }
}

function ConvertHandler() {
  this.getNum = function(input) {
    let result = input.slice(0, input.search(/[a-zA-Z]/));
    if (!result) {
      result = 1;
    } else if (result.includes(' ')) {
      result = NaN;
    } else if (result.includes('/')) {
      result = parseFraction(result);
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = input.slice(input.search(/[a-zA-Z]/));
    if (result === 'l') {
      return 'L';
    } else if (result === 'L') {
      return result;
    } else {
      result = result.toLowerCase();
    }
    if (!smallUnits.includes(result) && !bigUnits.includes(result)) {
      return NaN;
    } else {
      return result;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    if (smallUnits.includes(initUnit)) {
      result = bigUnits[smallUnits.indexOf(initUnit)];
    } else if (bigUnits.includes(initUnit)) {
      result = smallUnits[bigUnits.indexOf(initUnit)];
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    const units = ['mi', 'km', 'L', 'gal', 'lbs', 'kg'];
    const unitStrings = ['miles', 'kilometers', 'liters', 'gallons', 'pounds', 'kilograms'];
    let result = unitStrings[units.indexOf(unit)];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const weights = [1.60934, 0.453592, 3.78541];
    let result;
    if (smallUnits.includes(initUnit)) {
      result = Number(initNum) / weights[smallUnits.indexOf(initUnit)];
    } else if (bigUnits.includes(initUnit)) {
      result = Number(initNum) * weights[bigUnits.indexOf(initUnit)];
    }
    return parseFloat(Number(result).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let initString = this.spellOutUnit(initUnit);
    let returnString = this.spellOutUnit(returnUnit);
    let unitI = initUnit === 'l' ? 'L' : initUnit;
    let unitR = returnUnit === 'l' ? 'L' : returnUnit;

    let string = `${initNum} ${initString} converts to ${returnNum} ${returnString}`;
    let result = { initNum, initUnit: unitI, returnNum, returnUnit: unitR, string };
    return result;
  };
}

module.exports = ConvertHandler;
