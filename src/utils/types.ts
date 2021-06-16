export type OauthCredentials = {
  url: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
  scope?: string;
};

export type BNetParameters = {
  region?: string;
  locale?: string;
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
