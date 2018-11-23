module.exports = function({ model }) {
  const images = model.reduce((memo, image) => {
    const markup = `<div>
	    	<img data-src='${this.ImageSrc(image.filename)}' alt='${image.alt}'/> 
	    	<div>${image.date}<br/>${image.caption}</div>
	  	</div>`;
    return memo + markup;
  }, '');
  return `<div>
	<img data-src='${this.ImageSrc('FutureDaysFarmLogo.svg')}' alt='Logo'/> 
	<div>Welcome Headline</div>
	<div>allegan county, michigan</div>
	<div>Praesent laoreet ornare ligula, ac accumsan turpis sagittis at.  Integer auctor egestas eleifend. Etiam luctus 
		mattis justo, vitae fermentum libero euismod lacinia. Proin at consequat risus.  Praesent sollicitudin 
		vestibulum felis, ut sodales enim.</div>
	<div class='calendar-images'>${images}</div>
	</div>`;
};
