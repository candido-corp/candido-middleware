import {ConfigApp} from "../config/ConfigApp";
import path from "node:path";

enum PrinterType {
	controller = "controller",
	axios = "axios",
	env = "env",
	info = "info",
	error = "error"
}

/**
 * A simple printer function that replaces placeholders in a message with the provided parameters.
 * @param type The type of the printer.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function customPrinter(type: PrinterType, message: string, ...params: any[]): void {
	const placeholderCount = (message.match(/{}/g) || []).length;

	if (placeholderCount !== params.length) {
		let mismatchMessage = 'Printer error -> Mismatch between placeholders and parameters. Expected {} parameters, but received {}.';
		printer.error(mismatchMessage, placeholderCount, params.length);
	}

	let result = message;
	for (let param of params) {
		if (param instanceof Object) {
			param = JSON.stringify(param)
		}
		result = result.replace(/{}/, String(param));
	}

	switch (type) {
		case PrinterType.controller:
			console.log('\x1b[32m%s\x1b[0m', result);
			break;
		case PrinterType.axios:
			console.log('\x1b[35m%s\x1b[0m', result);
			break;
		case PrinterType.env:
			console.log(result);
			break;
		case PrinterType.info:
			console.log('\x1b[34m%s\x1b[0m', result);
			break;
		case PrinterType.error:
			console.log('\x1b[41m%s\x1b[0m', result);
			break;
	}
}

/**
 * A printer function that prints a message if the visibility is set to true.
 * @param type The type of the printer.
 * @param visibility The visibility of the message.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
function printerHelp(type: PrinterType, visibility: boolean, message: string, ...params: any[]) {
	const stackTrace = new Error().stack || '';
	const stackLines = stackTrace.split('\n');

	let callerLine = '';
	let callerInfo = {functionName: '<unknown>', file: '<unknown>', fileName: '<unknown>', line: '<unknown>'};
	let index = 2;
	do {
		callerLine = stackLines[index] || '';
		callerInfo = parseStackTrace(callerLine);
	} while (callerInfo.file.includes('customPrinter.ts') && stackLines[index++]);

	let messageApp = `[APP::${type}]`;

	let finalMessage =
		ConfigApp.printerVisibility._callerDetails ?
			`\n${callerInfo.file}:${callerInfo.line} - ${callerInfo.functionName}\n${messageApp}` :
			`${messageApp} (from: ${callerInfo.fileName} ${callerInfo.functionName})`;

	ConfigApp.printerVisibility._all
	&& visibility
	&& customPrinter(type, `${finalMessage} ${message}`, ...params);
}

/**
 * A printer function for the controller layer.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function printerController(message: string, ...params: any[]) {
	printerHelp(PrinterType.controller, ConfigApp.printerVisibility.controller, message, ...params);
}

/**
 * A printer function for the axios layer.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function printerAxios(message: string, ...params: any[]) {
	printerHelp(PrinterType.axios, ConfigApp.printerVisibility.axios, message, ...params);
}

/**
 * A printer function for the env layer.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function printerEnv(message: string, ...params: any[]) {
	printerHelp(PrinterType.env, ConfigApp.printerVisibility.env, message, ...params);
}

/**
 * A printer function for the app layer.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function printerInfo(message: string, ...params: any[]) {
	printerHelp(PrinterType.info, ConfigApp.printerVisibility.info, message, ...params);
}

/**
 * A printer function for the app layer.
 * @param message The message to be printed.
 * @param params The parameters to replace the placeholders in the message with.
 */
export function printerError(message: string, ...params: any[]) {
	printerHelp(PrinterType.error, ConfigApp.printerVisibility.error, message, ...params);
}

/**
 * Parses a stack trace line and returns the file, line, and function name.
 * @param stackLine
 */
function parseStackTrace(stackLine: string): { file: string, line: string, fileName: string, functionName: string } {
	const match = stackLine.match(/at (.+?) \((.+?):(\d+):\d+\)/) || stackLine.match(/at (.+?):(\d+):\d+/);
	if (match) {
		if (match.length === 4) {
			let file = match[2];
			return {functionName: match[1], file: file, fileName: path.basename(file), line: match[3]};
		} else if (match.length === 3) {
			let file = match[1];
			return {functionName: '<anonymous>', file: file, fileName: path.basename(file), line: match[2]};
		}
	}
	return {functionName: '<unknown>', file: '<unknown>', fileName: '<unknown>', line: '<unknown>'};
}

const printer = {
	controller: printerController,
	axios: printerAxios,
	env: printerEnv,
	info: printerInfo,
	error: printerError
};

export default printer;