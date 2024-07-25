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
    if (result.toString().split('').filter(x => x == '/').length>1 || result.toString().split('').filter(x => x == '.').length>1) {
      throw new Error('Error here');
    } 
    return eval(result);
  };
  
  this.getUnit = function(input) {
    const firstLetterIndex = input.search(/[a-zA-Z]/)
    const result = input.slice(firstLetterIndex);
    const val = result != 'L' && result != 'l' ? result.toLowerCase(): 'L';

    if (!['L', 'km', 'kg', 'lbs', 'mi', 'gal'].includes(val)) throw Error
    
    return val;
  };
  
  this.getReturnUnit = function(initUnit) {
    return this.unitConversions[initUnit];
  };

  this.spellOutUnit = function(unit) {
    return this.unitSpellings[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const val = initNum ? initNum : '1';

    const unit = initUnit == 'L' || initUnit == 'l' ? 'L' : initUnit.toLowerCase();
    const returnUnit = this.unitConversions[unit]
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

    if (initNum.toString().split('').filter(x => x == '/').length>1 || initNum.toString().split('').filter(x => x == '.').length>1) {
      throw new Error('Error here');
    } 

    return parseFloat((eval(val) * (unitRatios[`${unit} to ${returnUnit}`])).toFixed(5));

    // return this.unitConversions[initUnit]
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const pluralInitUnit = initNum.toString() == "1" ? this.unitSpellings[initUnit].slice(0, -1) : this.unitSpellings[initUnit]
    const pluralReturnUnit = returnNum.toString() == "1" ? this.unitSpellings[returnUnit].slice(0, -1) : this.unitSpellings[returnUnit]
    let result = `${initNum} ${pluralInitUnit} converts to ${returnNum} ${pluralReturnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
