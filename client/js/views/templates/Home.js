module.exports = function( { model } ) { 
	return `<div>
	<img data-src='${ this.ImageSrc('FutureDaysFarmLogo.svg') }' alt='Logo'/> 
	<div>Welcome Headline</div>
	<div>allegan county, michigan</div>
	<div>Praesent laoreet ornare ligula, ac accumsan turpis sagittis at.  Integer auctor egestas eleifend. Etiam luctus 
		mattis justo, vitae fermentum libero euismod lacinia. Proin at consequat risus.  Praesent sollicitudin 
		vestibulum felis, ut sodales enim.</div>
	<div>
		<div>
			<img class='pic' data-src='${ this.ImageSrc('Jam.jpg') }' alt='Jam'/>
			<div class='text'>Nov. 12<br/>Wild Berry Jam</div>
		</div>
		<div>
			<img class='pic' data-src='${ this.ImageSrc('Beets.jpg') }' alt="Beets"/> 
			<div class='text'>Oct. 4<br/>We Got The Beets</div>
		</div>
		<div>
			<img data-src='${ this.ImageSrc('Squash.jpg') }' alt="Squash"/> 
			<div class='text'>Oct. 13<br/>It's Time For Squash</div>
		</div>
	</div>
	<div>
		<div>
			<img class='pic' data-src='${ this.ImageSrc('Vines.jpg') }' alt='Jam'/> 
			<div class='text'>August. 19<br/>Chicken In The Vine</div>
		</div>
		<div>
			<img class='pic' data-src='${ this.ImageSrc('Carrots.jpg') }' alt="Beets"/> 
			<div class='text'>July. 9<br/>Cute Misfit Carrots</div>
		</div>
		<div>
			<img data-src='${ this.ImageSrc('Kale.jpg') }' alt="Squash"/> 
			<div class='text'>June. 7<br/>First Kale Of 2017</div>
		</div>
	</div>
	</div>`
}
