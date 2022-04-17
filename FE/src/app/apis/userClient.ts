import { IPageWrapperRequest, IPageWrapperResponse } from '../types/entities';
import { UserResponse } from '../types/userEntity';
const baseApi = process.env.REACT_APP_BASE_API_URL;
export async function fetchUsers(request: IPageWrapperRequest): Promise<IPageWrapperResponse<UserResponse>> {
  const response = await fetch(`${baseApi}/user?page=${request.page}&size=${request.size}`);
  return await response.json();
}

export async function passhOrLikeUser(userId: number, isPassed: boolean): Promise<IPageWrapperResponse<UserResponse>> {
  const url = isPassed ? `${baseApi}/user/pass` : `${baseApi}/user/like`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  });
  return await response.json();
}
