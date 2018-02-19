module.exports = function( { model } ) {
	const navOptions = model.forEach(datum => `<span> ${ this.CapitalizeFirstLetter(datum) } </span>`)
	return `<nav>
	<div> <a href = "InsertURLToAboutUS"> ABOUT US </a> </div>
	<div> <a href = "InsertURLToWhereToFindUs"> WHERE TO FIND US </a> </div>
	<div> <a class = "hCurrent" href = "InsertURLToFutureDaysFarm"> FUTURE DAYS FARM </a> </div>
	<div> <a href = "InserURLToTheBlog"> THE BLOG </a> </div>
	<div> <a href = "InsertURLToOurOfferings"> OUR OFFERINGS </a> </div> <br>
	<div class = "hLogo"> <img src = "https://storage.googleapis.com/five-gallon/FutureDaysFarmLogo.svg" /> </div>
	</nav>`
}
