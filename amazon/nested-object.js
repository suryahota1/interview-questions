// Given a HTML structure

{/* <form id="parent">
	<input type="text" name="foo.bat" />
	<input type="text" name="foo.bar.baz" />
	<input type="text" name="fizz" />
</form> */}
// Write a function (in JS) that returns an object with values of text inputs in the form id passed to it.
// For eg:

// getValues("parent") should return object like

// {
// 	"foo": {
// 		"bat" : _____, //Actual value of 1st text box
// 		"bar" : {
// 			"baz" : _____ // Value of 2nd text box
// 		}
// 	},
// 	"fizz" : _____ // Value of 3rd text box
// }

function putValue ( obj, value, list, idx ) {
	if ( idx === list.length ) return value;
	if ( !obj.hasOwn(list[idx]) ) obj[list[idx]] = {};
	return obj[list[idx]] = putValue(obj[list[idx]], value, list, idx + 1);
}

function getValues ( formId ) {
	const formEle = document.getElementById(formId);
	const inputs = formEle.querySelectorAll("input");
	const parent = {};
	inputs.forEach(( inputEle ) => {
		const names = inputEle.getAttribute("name").split(".");
		const value = inputEle.value;
		putValue(parent, value, names, 0);
	});
}