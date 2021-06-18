import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BNetLocale, BNetParameters, OauthCredentials, Region, TokenResponse, UrlFetchType } from '@/utils/types.ts';
import qs from 'qs';

export default class CustomAxios {
  bnetParameters: BNetParameters;
  baseURL: string;
  instance: AxiosInstance | null = null;

  constructor(parameters: BNetParameters, baseUrl: string) {
    this.bnetParameters = parameters;
    this.baseURL = baseUrl;
    this.getInstance(true, baseUrl);
  }

  /**
   * Get singleton instance
   * @param getNewInstance create or not a new instance
   * @param baseUrl
   * @return AxiosInstance
   */
  getInstance(getNewInstance?: boolean, baseUrl?: string): AxiosInstance {
    if (!this.instance || getNewInstance) {
      this.instance = axios.create({
        baseURL: baseUrl || this.baseURL,
        params: {
          access_token: this.bnetParameters.token,
          locale: this.bnetParameters.locale
        }
      });
      return this.instance;
    }
    return this.instance;
  }

  /**
   * Return appropriate domain name to retrieve the OAuth token or API data
   * @param region Region
   * @param type UrlFetchType
   * @return string host URL
   */
  static getHost(region: Region, type = UrlFetchType.Oauth): string {
    if (region === Region.China) {
      return type === UrlFetchType.Oauth ? 'www.battlenet.com.cn' : 'gateway.battlenet.com.cn';
    } else {
      return type === UrlFetchType.Oauth ? `${region}.battle.net` : `${region}.api.blizzard.com`;
    }
  }
  /**
   * Return credentials to use the Battle.net API
   * @param axios instance
   * @param url OAuth URL
   * @param credentials OAuth credentials
   * @return Promise<TokenResponse>
   */
  static async getCredentials(axios: AxiosInstance, { url, ...credentials }: OauthCredentials): Promise<TokenResponse> {
    const config = {
      url,
      method: 'post',
      data: qs.stringify(credentials)
    };
    return axios(config as AxiosRequestConfig).then((res: AxiosResponse) => res.data);
  }
  /**
   * Return an Axios instance prepared to work properly with Battle.net API
   * @param parameters BNetParameters
   * @param baseUrl base API URL
   * @return CustomAxios instance
   */
  static async build(parameters: BNetParameters, baseUrl?: string): Promise<CustomAxios> {
    const region = parameters.region || Region.Europe;
    const host = CustomAxios.getHost(region);
    const authorizationURL = parameters.authorizationURL || `https://${host}/oauth/authorize`;
    const tokenURL = parameters.tokenURL || `https://${host}/oauth/token`;
    const credentials = await CustomAxios.getCredentials(axios.create(), {
      url: tokenURL,
      grant_type: 'client_credentials',
      client_id: process.env.VUE_APP_BNET_ID,
      client_secret: process.env.VUE_APP_BNET_SECRET,
      scope: parameters.scope || ''
    });
    parameters.token = credentials.access_token;
    parameters.authorizationURL = authorizationURL;
    parameters.tokenURL = tokenURL;
    parameters.locale = parameters.locale || BNetLocale.EnglishGreatBritain;

    return new CustomAxios(parameters, baseUrl || `https://${CustomAxios.getHost(region, UrlFetchType.Api)}`);
  }
}
