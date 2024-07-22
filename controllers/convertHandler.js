function ConvertHandler() {
  this.unitConversions = {
    gal: 'L',
    L: 'gal',
    mi: 'km',
    km: 'mi',
    lbs: 'kg',
    kg: 'lbs'
  }
  this.unitSpellings = {
    gal: 'gallons',
    L: 'liters',
    mi: 'miles',
    km: 'kilometers'
    ,lbs: 'pounds',
    kg: 'kilograms'
  }
  this.getNum = function(input) {
    const firstLetterIndex = input.search(/[a-zA-Z]/)
    if (firstLetterIndex == 0 || input == '') return 1;
    const result = input.slice(0, firstLetterIndex);
    if (result.split('').filter(x => x == '/' || x == '.').length > 1) {
      throw new Error('Error here');
    } 
    return eval(result);
  };
  
  this.getUnit = function(input) {
    const firstLetterIndex = input.search(/[a-zA-Z]/)
    const result = input.slice(firstLetterIndex);

    if (!['L', 'km', 'kg', 'lb', 'mi', 'gal'].includes(result)) throw Error
    
    return result != 'L' && result != 'l' ? result.toLowerCase(): 'L';
  };
  
  this.getReturnUnit = function(initUnit) {
    return this.unitConversions[initUnit];
  };

  this.spellOutUnit = function(unit) {
    return this.unitSpellings[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const val = initNum ? initNum : '1';
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const unitRatios = {
      'gal to L': galToL,
      'L to gal': 1/galToL,
      'lbs to kg': lbsToKg,
      'kg to lbs': 1/lbsToKg,
      'mi to km': miToKm,
      'km to mi': 1/miToKm
    }

    if (initNum.split('').filter(x => x == '/' || x == '.').length > 1) {
      throw new Error('Error here');
    } 

    return parseFloat((eval(val) * (unitRatios[`${initUnit} to ${this.unitConversions[initUnit]}`])).toFixed(5));

    // return this.unitConversions[initUnit]
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.unitSpellings[initUnit]} converts to ${returnNum} ${this.unitSpellings[returnUnit]}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
