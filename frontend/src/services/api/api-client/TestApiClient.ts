//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.18.2.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming
import * as Types from '../api-client';
import type { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

import { throwException, isAxiosError } from '../api-client';
import { getAxios, getBaseUrl } from './helpers';

/**
 * Resets tenant to a default state.
Resetting in practice is usually faster then creating new tenant
(in cases when creating  a tenant involves seeding the data).
            
Also resetting allows to reuse the browser session in UI Tests without re-login in every test.
 */
export function resetTenant(config?: AxiosRequestConfig | undefined): Promise<void> {
    let url_ = getBaseUrl() + "/api/test/tenant/reset";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigResetTenant,
        ...config,
        method: "POST",
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
        return processResetTenant(_response);
    });
}

function processResetTenant(response: AxiosResponse): Promise<void> {
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

/**
 * Creates a test tenant to be used in UI Tests
 */
export function createTestTenant(dto: Types.CreateTestTenantDto, config?: AxiosRequestConfig | undefined): Promise<void> {
    let url_ = getBaseUrl() + "/api/test/tenant";
      url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(dto);

    let options_: AxiosRequestConfig = {
        ..._requestConfigCreateTestTenant,
        ...config,
        data: content_,
        method: "POST",
        url: url_,
        headers: {
            "Content-Type": "application/json",
        }
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processCreateTestTenant(_response);
    });
}

function processCreateTestTenant(response: AxiosResponse): Promise<void> {
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
let _requestConfigResetTenant: Partial<AxiosRequestConfig> | null;
export function getResetTenantRequestConfig() {
  return _requestConfigResetTenant;
}
export function setResetTenantRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigResetTenant = value;
}
export function patchResetTenantRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigResetTenant = patch(_requestConfigResetTenant ?? {});
}

let _requestConfigCreateTestTenant: Partial<AxiosRequestConfig> | null;
export function getCreateTestTenantRequestConfig() {
  return _requestConfigCreateTestTenant;
}
export function setCreateTestTenantRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigCreateTestTenant = value;
}
export function patchCreateTestTenantRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigCreateTestTenant = patch(_requestConfigCreateTestTenant ?? {});
}