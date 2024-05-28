
/**
 * A simple printer function that replaces placeholders in a message with the provided parameters.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function printer(message: string, ...params: any[]): void {
	const placeholderCount = (message.match(/{}/g) || []).length;

	if (placeholderCount !== params.length) {
		console.log('[APP::error] -> Printer error')
		throw new Error(
			`Mismatch between placeholders and parameters. Expected ${placeholderCount} parameters, but received ${params.length}.`
		);
	}

	let result = message;
	for (const param of params) {
		result = result.replace(/{}/, String(param));
	}

	console.log(result);
}

/**
 * A printer function for the controller layer.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function printerController(message: string, ...params: any[]) {
	printer(`[APP::controller] ${message}`, ...params)
}