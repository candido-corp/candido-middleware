import {EnumAppEnv} from "../models/enums/EnumAppEnv";

export const ConfigApp = {
	environment: process.env.NODE_ENV as EnumAppEnv,
	serverBaseUrl: process.env.SERVER_BASE_URL || '',
	cookie: {
		defaultMaxAge: 3600000
	},
	printerVisibility: {
		_all: true,
		controller: true,
		axios: true,
		info: true,
		env: true
	}
};

export const isProduction = ConfigApp.environment === EnumAppEnv.PRODUCTION;