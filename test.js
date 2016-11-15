var dashes = [];
var placeGuess = ["a."]

for (var i = 0; i < placeGuess[0].length; i++) {
    if (isLetter(placeGuess[0][i]) === false) {
        dashes.push(placeGuess[0][i])
    } else if (placeGuess[0][i] === " ") {
        dashes[i] = "&nbsp;";
    } else {
        dashes[i] = " _ ";
    }
}


function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

console.log(isLetter(placeGuess[0][1]))

console.log(dashes);
dashes.push(placeGuess[0][1]);
console.log(dashes);
