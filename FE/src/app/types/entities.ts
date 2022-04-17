export interface IPageWrapperRequest {
  page: number;
  result: number;
}

export interface IPageWrapperResponse<T> {
  page: number;
  results: T[];
  totalRecord: number;
}
