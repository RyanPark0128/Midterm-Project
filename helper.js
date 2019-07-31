const generateRandomString = function() {
  let random6 = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for (let i = 0; i < 6; i++) {
    random6 += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return random6;
};


module.exports = generateRandomString;