export type OauthCredentials = {
  url: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
  scope?: string;
};

export interface BNetApiResponse {
  _links: BNetSelf;
}

export interface BNetLink {
  href: string;
}

export interface BNetRef {
  key: BNetLink;
  name?: string;
  id: number;
}

export interface BNetSelf {
  self: BNetLink;
}

export type BNetParameters = {
  region?: Region;
  namespace?: RegionNamespace;
  locale?: BNetLocale;
  scope?: string;
  authorizationURL?: string;
  tokenURL?: string;
  token?: string;
};

export type TokenResponse = {
  access_token: string;
  expires_in: number;
  scope?: string;
  sub: string;
  token_type: string;
};

export enum UrlFetchType {
  Api,
  Oauth
}

export enum BNetLocale {
  EnglishUnitedStates = 'en_US',
  SpanishMexico = 'en_MX',
  Portuguese = 'pt_BR',
  German = 'de_DE',
  EnglishGreatBritain = 'en_GB',
  SpanishSpain = 'es_ES',
  French = 'fr_FR',
  Italian = 'it_IT',
  Russian = 'ru_RU',
  Korean = 'ko_KR',
  ChineseTraditional = 'zh_TW',
  ChineseSimplified = 'zh_CN'
}

export enum BNetNamespace {
  Static = 'static',
  Dynamic = 'dynamic',
  Profile = 'profile'
}

export enum Region {
  NorthAmerica = 'us',
  Europe = 'eu',
  Korea = 'kr',
  Taiwan = 'tw',
  China = 'cn'
}

export type RegionNamespace = `${BNetNamespace}-${Region}`;
