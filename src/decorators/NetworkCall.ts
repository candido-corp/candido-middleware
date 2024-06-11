import {AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError} from 'axios';
import axiosInstance from '../config/ConfigAxios';
import {StatusCodes} from "http-status-codes";
import {createError} from "../utils/createError";

type Method = 'get' | 'post' | 'put' | 'delete';

interface DecoratorConfig {
	url: string;
	method: Method;
	headers?: Record<string, string>;
}

interface RequestOptions {
	data?: any;
	axiosConfig?: AxiosRequestConfig;
}

function createDecorator({ url, method, headers }: DecoratorConfig) {
	return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (options: RequestOptions = {}): Promise<any> {
			const { data, axiosConfig = {} } = options;
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
				params: method === 'get' || method === 'delete' ? data : undefined,
				...axiosConfig
			};

			const client = (this as any).client || axiosInstance;
			let response: AxiosResponse = {} as AxiosResponse;

			try {
				response = await client(config);
			}catch (error: unknown) {
				if (isAxiosError(error)) {
					throw createError(
						error.response?.status || StatusCodes.INTERNAL_SERVER_ERROR,
						error.response?.data?.message || "An error occurred"
					);
				} else {
					throw createError(
						StatusCodes.INTERNAL_SERVER_ERROR,
						"An unexpected error occurred"
					);
				}
			}

			return response;
		};

		return descriptor;
	};
}

export function POST(url: string, headers: Record<string, string> = {}) {
	return createDecorator({ url, method: 'post', headers });
}

export function GET(url: string, headers: Record<string, string> = {}) {
	return createDecorator({ url, method: 'get', headers });
}

export function PUT(url: string, headers: Record<string, string> = {}) {
	return createDecorator({ url, method: 'put', headers });
}

export function DELETE(url: string, headers: Record<string, string> = {}) {
	return createDecorator({ url, method: 'delete', headers });
}
