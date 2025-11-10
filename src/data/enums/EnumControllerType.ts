export enum EnumControllerType {
	PROTECTED, PUBLIC
}

export function isControllerPublic(controllerType: EnumControllerType): boolean {
	return controllerType === EnumControllerType.PUBLIC;
}