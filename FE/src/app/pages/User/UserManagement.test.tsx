/* eslint-disable testing-library/prefer-screen-queries */
import { cleanup } from '@testing-library/react';
import * as userClient from '../..//apis/userClient';
import { IPageWrapperResponse } from '../../types/entities';
import { UserResponse } from '../../types/userEntity';
import { render } from '../../utils/test-utils';
import UserManagement from './UserManagement';

afterEach(cleanup);

describe('Get users', () => {
  it('Should get users successfully', async () => {
    const fetchUsersMock = jest.spyOn(userClient, 'fetchUsers');
    const result: IPageWrapperResponse<UserResponse> = {
      totalRecord: 100,
      page: 1,
      results: [
        {
          name: {
            title: 'Mr',
            first: 'Mitchel',
            last: 'Weima',
          },
          login: {
            uuid: 'af63616f-c8f5-4c26-bea2-0bc31ba825cf',
            username: 'redcat116',
          },
          picture: {
            large: 'https://randomuser.me/api/portraits/men/19.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/19.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/19.jpg',
          },
        },
      ],
    };
    fetchUsersMock.mockImplementation(() => Promise.resolve(result));
    const { findByText } = render(<UserManagement />);
    await findByText(/Mr Mitchel Weima/i);
  });
});
