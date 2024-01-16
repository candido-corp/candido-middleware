export function printer(message: string, ...params: any[]): void {
  const placeholderCount = (message.match(/{}/g) || []).length;

  if (placeholderCount !== params.length) {
    console.log('App::error::printer')
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
