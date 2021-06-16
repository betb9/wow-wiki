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
