module.exports = function( { model } ) {
	const markets = model.marketData.reduce((memo, market) => {
		const markup = `<div>
		<h3>${ market.name }</h3>
		<p>${ market.address1 }</p>
		<p>${ market.address2 }</p>
		<p>${ market.date }</p>
		<p>${ market.time }</p>
		</div>`
		return memo + markup
	}, '')
	const images = model.imageData.reduce((memo, image) => {
	  	const markup = `<div class='${ image.className }'>
	    	<img data-src='${ this.ImageSrc(image.filename) }' alt='${ image.alt }'/> 
	    	<div>${ image.date }<br/>${ image.caption }</div>
	  	</div>`
	  	return memo + markup
	}, '')
    return `<div>
	<h1>Where to Find Us</h1>
	<p>Ar egestas eleifend. Etiam luctus mattis justo, vitae fermentum libero euismod lacinia. Proin at consequat risus. Praesent sollicitudin vestibu.</p>
	<div>${ markets }</div>
	<div>${ images }</div>
    </div>`
}
