module.exports = function( { model } ) {
	const navOptions = model.forEach(datum => `<span> ${ this.CapitalizeFirstLetter(datum) } </span>`)
	return `<nav>
	<div class = "hDiv"> <a class = "hLink" href = "InsertURLToAboutUS"> ABOUT US </a> </div>
	<div class = "hDiv"> <a class = "hLink" href = "InsertURLToWhereToFindUs"> WHERE TO FIND US </a> </div>
	<div class = "hDiv"> <a class = "hCurrent" href = "InsertURLToFutureDaysFarm"> FUTURE DAYS FARM </a> </div>
	<div class = "hDiv"> <a class = "hLink" href = "InserURLToTheBlog"> THE BLOG </a> </div>
	<div class = "hDiv"> <a class = "hLink" href = "InsertURLToOurOfferings"> OUR OFFERINGS </a> </div>
	<div class = "hLogo"> <img class = "hImg" src = "https://storage.googleapis.com/five-gallon/FutureDaysFarmLogo.svg" /> </div>
	</nav>`
}
