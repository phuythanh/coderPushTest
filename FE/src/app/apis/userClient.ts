import { IPageWrapperRequest, IPageWrapperResponse } from '../types/entities';
import { UserResponse } from '../types/userEntity';

export async function fetchUsers(request: IPageWrapperRequest): Promise<IPageWrapperResponse<UserResponse>> {
  const response = await fetch(`https://randomuser.me/api/?page=${request.page}&results=${request.result}`);
  return await response.json();
}
