import axios, { AxiosInstance } from 'axios';
import { BNetParameters, UrlFetchType } from '@/utils/types.ts';

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

  /**
   * Return appropriate domain name to retrieve the OAuth token or API data
   * @param region string
   * @param type UrlFetchType
   * @return string host URL
   */
  static getHost(region: string, type = UrlFetchType.Oauth): string {
    if (region === 'cn') {
      return type === UrlFetchType.Oauth ? 'www.battlenet.com.cn' : 'gateway.battlenet.com.cn';
    } else {
      return type === UrlFetchType.Oauth ? `${region}.battle.net` : `${region}.api.blizzard.com`;
    }
  }
}
