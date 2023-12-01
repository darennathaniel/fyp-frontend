export interface IDeleteRequest {
  id: Number;
  owner: string;
  productId: string;
  approvals: Array<string>;
  rejected: boolean;
}
