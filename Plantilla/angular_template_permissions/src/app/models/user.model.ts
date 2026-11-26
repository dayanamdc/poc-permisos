export declare interface UserModel {
  displayableId: string;
  name: string;
  identityProvider: string;
  userIdentifier: string;
  idToken: Record<string, unknown>;
  access_token: string;
}
