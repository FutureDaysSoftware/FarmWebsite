module.exports = function({ model }) {
  return `<div>
	<form>
		<div>Item Name:</div>
		<div><input data-js="name" type="text"></div>
		<div>Item Quantity:</div>
		<div><input data-js="quantity" type="text"></div>
		<div>Item Price:</div>
		<div><input type="text"></div>
		<div><input data-js="submit" type="button" value="Submit"></div>
	</form> 
	</div>`;
};
