export interface IPageWrapperRequest {
  page: number;
  size: number;
}

export interface IPageWrapperResponse<T> {
  page: number;
  results: T[];
  totalRecord: number;
}
