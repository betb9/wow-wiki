import axios, { AxiosInstance } from 'axios';
import { BNetParameters } from '@/utils/types.ts';

export default class CustomAxios {
  bnetParameters: BNetParameters;
  baseURL: string;
  instance: AxiosInstance;

  constructor(parameters: BNetParameters, baseUrl: string) {
    this.bnetParameters = parameters;
    this.baseURL = baseUrl;
    this.instance = axios.create({
      baseURL: this.baseURL,
      params: {
        access_token: parameters.token
      }
    });
  }
}
