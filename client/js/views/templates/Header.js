module.exports = function({ model }) {
    const navOptions = model
        .map(
            datum =>
                `<li data-js='navList' data-name='${datum.name}'>${
                    datum.label
                }</li>`
        )
        .join('')
    return `<nav>${navOptions}</nav>`
}
