module.exports = function( { model } ) {
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
    	<div>
    		<div><img data-src='${ this.ImageSrc('LeftArrow.png') }' alt='Left Arrow'/></div>
    		<div>
				<img data-src='${ this.ImageSrc('Jam.jpg') }' alt='Jam'/>
		 		<div>Nov. 12<br/>Wild Berry Jam</div>
			</div>
			<div></div>
			<div>
				<img data-src='${ this.ImageSrc('Beets.jpg') }' alt="Beets"/> 
		 		<div>Oct. 4<br/>We Got The Beets</div>
			</div>
			<div></div>
			<div>
				<img data-src='${ this.ImageSrc('Squash.jpg') }' alt="Squash"/> 
		 		<div>Oct. 13<br/>It's Time For Squash</div>
			</div>
			<div><img data-src='${ this.ImageSrc('RightArrow.png') }' alt='Right Arrow'/></div>
    	</div>
    </div>`
}
