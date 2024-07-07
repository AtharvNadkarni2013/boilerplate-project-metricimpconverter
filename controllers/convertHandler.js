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
    gal: 'gallon',
    L: 'liter',
    mi: 'mile',
    km: 'kilometer'
    ,lbs: 'pound',
    kg: 'kilogram'
  }
  this.getNum = function(input) {
    const firstLetterIndex = input.search(/[a-zA-Z]/)
    if (firstLetterIndex == 0) return 1;
    const result = input.slice(0, firstLetterIndex);
    return eval(result);
  };
  
  this.getUnit = function(input) {
    const firstLetterIndex = input.search(/[a-zA-Z]/)
    const result = input.slice(firstLetterIndex);
    
    return result.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    return this.unitConversions[initUnit];
  };

  this.spellOutUnit = function(unit) {
    return this.unitSpellings[unit];
  };
  
  this.convert = function(initNum, initUnit) {
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

    console.log(`${initUnit} to ${this.unitConversions[initUnit]}`)
    
    return initNum * unitRatios[`${initUnit} to ${this.unitConversions[initUnit]}`];
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitPlural = (initUnit != 1) ? `${this.spellOutUnit(initUnit)}s` : this.spellOutUnit(initUnit);
    const returnUnitPlural = (returnUnit != 1) ? `${this.spellOutUnit(returnUnit)}s` : this.spellOutUnit(returnUnit);
    let result = `${initNum} ${initUnitPlural} converts to ${returnNum} ${returnUnitPlural}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
