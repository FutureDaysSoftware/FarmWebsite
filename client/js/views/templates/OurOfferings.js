module.exports = function( { model } ) {
	const offerings = model.reduce((memo, offer) => {
		const markup = `<div>
			<h3>${ offer.header }</h3>
			<div>${ offer.item }</div>
			<div>${ offer.quantity }</div>
			<div>${ offer.price }</div>
		</div>`
		return memo + markup
	}, '')
    return `<div>
    <h1>Headline for List of Stuff that’s Available</h1>
    <p>Ar egestas eleifend. Etiam luctus mattis justo, vitae fermentum libero euismod lacinia. Proin at consequat risus. Praesent sollicitudin vestibu.</p>
    <div>${ offerings }</div>
    </div>`
}
