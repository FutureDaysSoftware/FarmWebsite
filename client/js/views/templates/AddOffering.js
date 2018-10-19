module.exports = function({ model }) {
	return `<div>
	<form>
	  Item Name:<br>
	  <input data-js="name" type="text">
	  <br>
	  Item Quantity:<br>
	  <input data-js="quantity" type="text">
	  <br>
	  Item Price:<br>
	  <input type="text">
	  <br><br>
	  <input data-js="submit" type="button" value="Submit">
	</form> 
	</div>`
}