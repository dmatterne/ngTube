import { OpaqueToken } from '@angular/core';

export const APP_CONFIG: OpaqueToken = new OpaqueToken('APP_CONFIG');

export interface AppConfiguration {
    apiKey: string;
    apiEndpoint: string;
}

export const config: AppConfiguration = {
    apiEndpoint: 'https://www.googleapis.com/youtube/v3',
    apiKey: 'AIzaSyAhOn0yuUcvrjXZrxcXh-7Bwu1d6-vOsjg'
}