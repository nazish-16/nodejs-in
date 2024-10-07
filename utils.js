function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
function celciusToFarhenheit(celcius){
    return(celcius * 9)/5 +32
}
module.exports = {
    generateRandomNumber,
    celciusToFarhenheit
};