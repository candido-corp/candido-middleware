import {ConfigApp} from "../config/ConfigApp";

/**
 * A simple printer function that replaces placeholders in a message with the provided parameters.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function customPrinter(message: string, ...params: any[]): void {
	const placeholderCount = (message.match(/{}/g) || []).length;

	if (placeholderCount !== params.length) {
		console.log('[APP::error] -> Printer error')
		throw new Error(
			`Mismatch between placeholders and parameters. Expected ${placeholderCount} parameters, but received ${params.length}.`
		);
	}

	let result = message;
	for (let param of params) {
		if(param instanceof Object) { param = JSON.stringify(param) }
		result = result.replace(/{}/, String(param));
	}

	console.log(result);
}

/**
 * A printer function that prints a message if the visibility is set to true.
 * @param label The label to be printed before the message.
 * @param visibility The visibility of the message.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
function printerHelp(label: string, visibility: boolean, message: string, ...params: any[]) {
	ConfigApp.printerVisibility._all
	&& visibility
	&& customPrinter(`[APP::${label}] ${message}`, ...params);
}

/**
 * A printer function for the controller layer.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function printerController(message: string, ...params: any[]) {
	printerHelp("controller", ConfigApp.printerVisibility.controller, message, ...params);
}

/**
 * A printer function for the axios layer.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function printerAxios(message: string, ...params: any[]) {
	printerHelp("axios", ConfigApp.printerVisibility.axios, message, ...params);
}

/**
 * A printer function for the env layer.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function printerEnv(message: string, ...params: any[]) {
	printerHelp("env", ConfigApp.printerVisibility.env, message, ...params);
}

/**
 * A printer function for the app layer.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function printerInfo(message: string, ...params: any[]) {
	printerHelp("info", ConfigApp.printerVisibility.info, message, ...params);
}

const printer = {
	controller: printerController,
	axios: printerAxios,
	env: printerEnv,
	info: printerInfo
};

export default printer;