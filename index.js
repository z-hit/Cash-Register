function checkCashRegister(price, cash, cid) {
  
  var change = cash*100 - price*100;
  var originalChange = cash*100 - price*100;
  var changeArr = [];

  var vals = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];

for (var i = 0; i < vals.length; i++) {
  cid[i].push(vals[i]);
}
 
  var coinsNeed = 0;
  var coinsHave = 0;
  var value = 0;
  var amount = 0;
  var name = '';

for (var j = cid.length-1; j >= 0; j--) {

  value = cid[j][2];
  amount = cid[j][1];
  name = cid[j][0];

  coinsNeed = Math.floor(change/value);
  coinsHave = amount*100/value;

    if (coinsHave >= coinsNeed) {
      change = change - value*coinsNeed;
      if (value*coinsNeed/100 > 0) {
     changeArr.push([name, value*coinsNeed/100]);
      }
               
    } else {
      change = change - value*coinsHave;
      if (value*coinsHave/100 > 0) {
     changeArr.push([name, value*coinsHave/100]);
      }
          
    }
  }
 
 var cidSum = cid.map(arr => arr[1]);
 cidSum = cidSum.reduce((a, b) => (a*100 + b*100)/100);
 var changeSum = changeArr.map(arr => arr[1]);
 changeSum = changeSum.reduce((a, b) => (a*100 + b*100)/100);

 var result = {};
 
if (cidSum > changeSum && originalChange === changeSum*100) {
   result.status = "OPEN";
   result.change = changeArr;
}
if (cidSum === changeSum) {
  result.status = "CLOSED";
  result.change = cid.map(arr => arr.slice(0, 2));
}
if (cidSum < changeSum || originalChange !== changeSum*100) {
  result.status = "INSUFFICIENT_FUNDS";
  result.change = [];
}

  return result;
}


checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
