import { Table, Image } from 'antd';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchUsersAsync, userList, totalRecordOfUser } from '../../stores/userSlice';
import { IPageWrapperRequest } from '../../types/entities';
import { UserResponse } from '../../types/userEntity';
import { PAGE_SIZE, PAGE_START } from '../../utils/constant';

interface SortType {
  columnKey: string;
  order: 'ascend' | 'descend';
}
const UserManagement = () => {
  const dispatch = useAppDispatch();
  const totalRecord = useAppSelector(totalRecordOfUser);
  const users = useAppSelector(userList);
  const [query, setQuery] = useState<IPageWrapperRequest>({
    page: PAGE_START,
    result: PAGE_SIZE,
  });
  // const [sortDetail, setSortDetail] = useState<SortType>({
  //   columnKey: 'Username',
  //   order: 'ascend',
  // });

  // const userListSorted = useMemo(() =>{
  //   if(sortDetail.columnKey)
  //   {
  //     userList.sorter
  //   }
  // }, input)

  useEffect(() => {
    dispatch(fetchUsersAsync(query));
  }, [query]);

  const columns: any[] = [
    {
      title: 'Full Name',
      key: 'FullName',
      defaultSortOrder: 'descend',
      sorter: (a: UserResponse, b: UserResponse) => {
        const aText = `${a?.name?.title} ${a?.name?.first} ${a?.name?.last}`;
        const bText = `${b?.name?.title} ${b?.name?.first} ${b?.name?.last}`;
        return !aText.localeCompare(bText);
      },
      render: (value: string, record: UserResponse, index: number) =>
        `${record?.name?.title} ${record?.name?.first} ${record?.name?.last}`,
    },
    {
      title: 'Username',
      key: 'Username',
      sorter: true,
      // sorter: (a: UserResponse, b: UserResponse) => !a.login.username.localeCompare(b.login.username),
      render: (value: string, record: UserResponse) => record?.login?.username,
    },
    {
      title: 'Thumbnail Icon',
      key: 'Thumbnail',
      render: (value: string, record: UserResponse, index: number) => (
        <>{record && record.picture && <Image src={record?.picture?.thumbnail} preview={false} />}</>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={users}
        columns={columns}
        pagination={{
          current: query.page,
          pageSize: query.result,
          onChange: (page: number, pageSize: number) => {
            setQuery({ ...query, page: page, result: pageSize });
          },
          total: totalRecord || 0,
        }}
      />
    </div>
  );
};

export default UserManagement;
