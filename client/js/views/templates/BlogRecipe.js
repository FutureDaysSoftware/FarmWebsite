module.exports = function( { model } ) {
	const content = model.blogRecipe.reduce((memo, item) => {
		const markup = `<div>
			<div>
				<img data-src='${ this.ImageSrc(item.image1) }' alt='${ item.alt1 }'/>
			</div>
			<div>
				<h1>${ item.headline }</h1>
				<p>${ item.content }</p>
			</div>
		</div>
		<div>
			<div>
				<div>${ item.recipeTitle }</div>
				<p>${ item.instructions }</p>
				<div>directions</div>
				<p>${ item.directions }</p>
			</div>
			<div>
				<img data-src='${ this.ImageSrc(item.image2) }' alt='${ item.alt2 }'/>
			</div>
		</div>`
		return memo + markup
	}, '')
	const images = model.calendarImages.reduce((memo, image) => {
	  	const markup = `<div data-js='${ image.dataJS }' class='${ image.className }'>
	    	<img data-src='${ this.ImageSrc(image.filename) }' alt='${ image.alt }'/> 
	    	<div>${ image.date }<br/>${ image.caption }</div>
	  	</div>`
	  	return memo + markup
	}, '')
    return `<div>
    	<div>${ content }</div>
    	<div>${ images }</div>
    </div>`
}