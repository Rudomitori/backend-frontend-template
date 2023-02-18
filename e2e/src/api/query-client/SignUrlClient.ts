//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.18.2.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming
import * as Types from '../query-client';
import type { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

import { throwException, isAxiosError } from '../query-client';
import { getAxios, getBaseUrl } from './helpers';

export function getSignature(config?: AxiosRequestConfig | undefined): Promise<string> {
    let url_ = getBaseUrl() + "/api/sign-url/signature";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigGetSignature,
        ...config,
        method: "GET",
        url: url_,
        headers: {
            "Accept": "application/json"
        }
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processGetSignature(_response);
    });
}

function processGetSignature(response: AxiosResponse): Promise<string> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 400) {
        const _responseText = response.data;
        let result400: any = null;
        let resultData400  = _responseText;
        result400 = Types.ValidationProblemDetails.fromJS(resultData400);
        return throwException("A server side error occurred.", status, _responseText, _headers, result400);

    } else if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
        return Promise.resolve<string>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<string>(null as any);
}

export function setSignatureCookie(config?: AxiosRequestConfig | undefined): Promise<void> {
    let url_ = getBaseUrl() + "/api/sign-url/signature/cookie";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigSetSignatureCookie,
        ...config,
        method: "GET",
        url: url_,
        headers: {
        }
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processSetSignatureCookie(_response);
    });
}

function processSetSignatureCookie(response: AxiosResponse): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 400) {
        const _responseText = response.data;
        let result400: any = null;
        let resultData400  = _responseText;
        result400 = Types.ValidationProblemDetails.fromJS(resultData400);
        return throwException("A server side error occurred.", status, _responseText, _headers, result400);

    } else if (status === 200) {
        const _responseText = response.data;
        return Promise.resolve<void>(null as any);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<void>(null as any);
}
let _requestConfigGetSignature: Partial<AxiosRequestConfig> | null;
export function getGetSignatureRequestConfig() {
  return _requestConfigGetSignature;
}
export function setGetSignatureRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigGetSignature = value;
}
export function patchGetSignatureRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigGetSignature = patch(_requestConfigGetSignature ?? {});
}

let _requestConfigSetSignatureCookie: Partial<AxiosRequestConfig> | null;
export function getSetSignatureCookieRequestConfig() {
  return _requestConfigSetSignatureCookie;
}
export function setSetSignatureCookieRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigSetSignatureCookie = value;
}
export function patchSetSignatureCookieRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigSetSignatureCookie = patch(_requestConfigSetSignatureCookie ?? {});
}