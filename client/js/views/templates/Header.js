module.exports = function( { model } ) {
    const navOptions = model.map(datum => `<div data-js='navList'>${ this.capitalizeWords(datum) }</div>`).join('')
    return `<nav>${ navOptions }</nav>`
}
