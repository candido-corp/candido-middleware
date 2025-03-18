import {EnumAppEnv} from "../data/enums/EnumAppEnv";

export interface ConfigAppType {
	environment: EnumAppEnv;
	port: number;
	springBootServerBaseUrl: string;
	cookie: {
		defaultMaxAgeMs: number;
		defaultHttpOnly: boolean;
		defaultSecure: boolean;
		defaultSameSite: 'strict' | 'lax' | 'none';
		defaultPath: string;
		defaultDomain: string;
	},
	printerVisibility: {
		_all: boolean;
		_callerDetails: boolean;
		controller: boolean;
		axios: boolean;
		info: boolean;
		env: boolean;
		error: boolean;
	}
}

export const ConfigApp: ConfigAppType = {
	environment: process.env.NODE_ENV as EnumAppEnv,
	port: parseInt(process.env.PORT || '3001', 10),
	springBootServerBaseUrl: process.env.SPRING_BOOT_SERVER_BASE_URL || 'http://localhost:8080',
	cookie: {
		defaultMaxAgeMs: parseInt(process.env.COOKIE_DEFAULT_MAX_AGE || '3600000', 10),
		defaultHttpOnly: process.env.COOKIE_DEFAULT_HTTP_ONLY === 'true',
		defaultSecure: process.env.COOKIE_DEFAULT_SECURE === 'true',
		defaultSameSite: process.env.COOKIE_DEFAULT_SAME_SITE as 'strict' | 'lax' | 'none' || 'strict',
		defaultPath: process.env.COOKIE_DEFAULT_PATH || '/',
		defaultDomain: process.env.COOKIE_DEFAULT_DOMAIN || ''
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