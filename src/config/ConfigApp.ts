import {EnumAppEnv} from "../data/enums/EnumAppEnv";

/**
 * @description Application configuration
 */
export const ConfigApp = {
	environment: process.env.NODE_ENV as EnumAppEnv,
	port: process.env.PORT || 3001,
	springBootServerBaseUrl: process.env.SPRING_BOOT_SERVER_BASE_URL || '',
	cookie: {
		defaultMaxAgeMs: 3600000
	},
	printerVisibility: {
		_all: true,
		_callerDetails: false,
		controller: true,
		axios: true,
		info: true,
		env: true,
		error: true
	}
};

/**
 * @description Check if the current environment is production
 */
export const isProduction = ConfigApp.environment === EnumAppEnv.PRODUCTION;