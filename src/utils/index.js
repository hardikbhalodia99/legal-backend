import { customAlphabet } from "nanoid";

export function generateRandomString(){
	const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',12)
	const string = nanoid(12)
	return string
}


