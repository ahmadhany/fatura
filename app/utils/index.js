module.exports = {
    isNumber: (n) => {
        return n !== "" && n !== undefined && !isNaN(parseInt(n));
    }
}