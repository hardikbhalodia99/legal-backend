const { customAlphabet } = require("nanoid");


function generateRandomString(){
	const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',12)
	return nanoid(12)
}


module.exports.generateRandomString = generateRandomString;
