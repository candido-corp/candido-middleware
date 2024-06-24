import {AxiosRequestConfig, AxiosResponse, isAxiosError} from 'axios';
import axiosInstance from '../config/ConfigAxios';
import {createError, isSpringBootError} from "../utils/createError";
import {EnumErrorType} from "./enums/EnumErrorType";
import printer from "../utils/customPrinter";

type Method = 'get' | 'post' | 'put' | 'delete';

interface DecoratorConfig {
	url: string;
	method: Method;
	headers?: Record<string, string>;
}

interface RequestOptions {
	data?: any;
	params?: Record<string, any>;
	axiosConfig?: AxiosRequestConfig;
}

function createDecorator({url, method, headers}: DecoratorConfig) {
	return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (options: RequestOptions = {}): Promise<any> {
			const {data, params, axiosConfig = {}} = options;

			printer.info('CALL -> Data: {} | Params: {} | AxiosConfig: {}', data, params, axiosConfig);

			let customHeader = {
				'Content-Type': 'application/json',
				...headers,
				...axiosConfig.headers
			};

			const config: AxiosRequestConfig = {
				url,
				method,
				headers: customHeader,
				data: method === 'post' || method === 'put' ? data : undefined,
				params: method === 'get' || method === 'delete' ? params : undefined,
				...axiosConfig
			};

			const client = (this as any).client || axiosInstance;
			let response: AxiosResponse = {} as AxiosResponse;

			try {
				response = await client(config);
			} catch (error: any) {
				if(
					error != undefined &&
					error.cause != undefined &&
					'code' in error.cause &&
					error.cause.code === 'ECONNREFUSED'
				) {
					throw createError({type: EnumErrorType.ERROR_APP, status: 500, errors: [{code: 'ECONNREFUSED', message: 'Connection refused'}]});
				}

				if (isAxiosError(error) && isSpringBootError(error.response?.data)) {
					printer.error(JSON.stringify(error.response?.data));
					throw createError({type: EnumErrorType.ERROR_SPRING_BOOT_API, ...error.response?.data});
				}

				printer.error(error.response?.data || "No data in error response");
				throw createError({type: EnumErrorType.ERROR_APP, status: error.response.status});
			}

			return response;
		};

		return descriptor;
	};
}

export function POST(url: string, headers: Record<string, string> = {}) {
	return createDecorator({url, method: 'post', headers});
}

export function GET(url: string, headers: Record<string, string> = {}) {
	return createDecorator({url, method: 'get', headers});
}

export function PUT(url: string, headers: Record<string, string> = {}) {
	return createDecorator({url, method: 'put', headers});
}

export function DELETE(url: string, headers: Record<string, string> = {}) {
	return createDecorator({url, method: 'delete', headers});
}
