var dataType = Object.freeze({ NUMBER: 0, STRING: 1, EMPTY: 3 });

/*
 * get random string with length
 * [len] - length of output string
 */
function getRandomString(len) {
  var charset = "abcdefghijklmnopqrstuvwxyz";
  var res = "";
  for(var i = 0; i < len; i++)
    res += charset.charAt(Math.floor(Math.random() * charset.length));
  return res;
}


/*
 * get random value depending on type
 * [dt] - type of random value to return (from dataType)
 */
function getRandomValue(dt=dataType.EMPTY) {
    var val;
    if (dt == dataType.NUMBER)
      return parseInt(Math.random() * 100);
    else if (dt == dataType.STRING)
      return getRandomString(Math.random()*10);
    else /* dataType.EMPTY */
      return "";
}


/* 
 * return array of size [rows][cols] with dt from dataType
 */
function fillArrayRandomly(rows, cols, dt=dataType.EMPTY) {
  return _.map(new Array(rows), (el) => {
    return _.map(new Array(cols), (el, idx) => { 
      if (idx >= cols)
        dt = dataType.EMPTY;
      return getRandomValue(dt) });
  });
}
