module.exports = function( { model } ) {
	const images = model.reduce((memo, image) => {
	  	const markup = `<div class='${ image.class }'>
	    	<img data-src='${ this.ImageSrc(image.filename) }' alt='${ image.alt }'/> 
	    	<div>${ image.date }<br/>${ image.caption }</div>
	  	</div>`
	  	return memo + markup
	}, '')
    return `<div>
    	<div>
	    	<div><img data-src='${ this.ImageSrc('FarmScene.jpg') }' alt='Farm Scene'/></div>
	    	<div>
	    		<div>Headline for About Us and the Farm</div><br/><br/>
	    		<div>Praesent laoreet ornare ligula, ac accumsan turpis sagittis at. Integer auctor egestas eleifend. Etiam luctus mattis justo, vitae fermentum libero euismod lacinia. Proin at consequat risus. Praesent sollicitudin vestibulum felis, ut sodales enim.</div><br/>
	    		<div>Ar egestas eleifend. Etiam luctus mattis justo, vitae fermentum libero euismod lacinia. Proin at consequat risus. Praesent sollicitudin vestibu.</div><br/>
	    		<div>about the farm</div><br/>
	    		<div>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</div><br/>
	    		<div>Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</div><br/>
	    		<div>Donec ullamcorper nulla non metus auctor fringilla. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. </div>
	    	</div>
	    </div>
    	<div>${ images }</div>
    </div>`
}
