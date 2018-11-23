module.exports = function({ model }) {
  const fallOfferings = model.fall.reduce((memo, offer) => {
    const markup = `<div>
			<div>${offer.item}</div>
			<div>${offer.quantity}</div>
			<div>${offer.price.toLocaleString('en', {
        style: 'currency',
        currency: 'USD',
      })}</div>
		</div>`;
    return memo + markup;
  }, '');
  const yearRoundOfferings = model.yearRound.reduce((memo, offer) => {
    const markup = `<div>
			<div>${offer.item}</div>
			<div>${offer.quantity}</div>
			<div>${offer.price.toLocaleString('en', {
        style: 'currency',
        currency: 'USD',
      })}</div>
		</div>`;
    return memo + markup;
  }, '');
  return `<div>
    <h1>Headline for List of Stuff that’s Available</h1>
    <p>Ar egestas eleifend. Etiam luctus mattis justo, vitae fermentum libero euismod lacinia. Proin at consequat risus. Praesent sollicitudin vestibu.</p>
    <div>
    	<h3>fall 2017</h3>
    	<div>${fallOfferings}</div>
    	<h3>year-round</h3>
    	<div>${yearRoundOfferings}</div>
    </div>
    </div>`;
};
