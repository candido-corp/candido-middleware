import {EnumAppEnv} from "../data/enums/EnumAppEnv";

export const ConfigApp = {
	environment: process.env.NODE_ENV as EnumAppEnv,
	port: process.env.PORT || 3001,
	springBootServerBaseUrl: process.env.SPRING_BOOT_SERVER_BASE_URL || '',
	cookie: {
		defaultMaxAgeMs: 3600000
	},
	printerVisibility: {
		_all: true,
		_callerDetails: true,
		controller: true,
		axios: true,
		info: true,
		env: true,
		error: true
	}
};

export const isProduction = ConfigApp.environment === EnumAppEnv.PRODUCTION;