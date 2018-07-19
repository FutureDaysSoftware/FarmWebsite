module.exports = Object.assign({}, require('./__proto__'), {
	events: {
		blog: 'click'
	},
	onBlogClick(e) {
		this.emit('navigate', `/BlogRecipe`)
	}
})
