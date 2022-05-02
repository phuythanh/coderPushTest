import { CloseOutlined, HeartTwoTone, LikeOutlined, WechatOutlined } from '@ant-design/icons';
import { Button, Card, notification, Row, Space, Spin } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  fetchUserByIdAsync,
  fetchUsersAsync,
  isLoading,
  passOrLikeUsersAsync,
  totalRecordOfUser,
  userDetail,
  userList,
} from '../stores/userSlice';
import { IPageWrapperRequest } from '../types/entities';
import { UserResponse } from '../types/userEntity';
import { PAGE_SIZE, PAGE_START } from '../utils/constant';

const serverUrl = process.env.REACT_APP_BASE_SERVER_URL;

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const totalRecord = useAppSelector(totalRecordOfUser);
  const users = useAppSelector(userList);
  const uDetail = useAppSelector(userDetail);
  const loading = useAppSelector(isLoading);

  const [query, setQuery] = useState<IPageWrapperRequest>({
    page: PAGE_START,
    size: PAGE_SIZE,
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [selectedUser, setSelectUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    dispatch(fetchUsersAsync(query));
  }, [dispatch, query]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchUserByIdAsync(selectedUser.id));
    }
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (users) {
      const [first] = users;
      setSelectUser(first);
    }
  }, [dispatch, users]);

  const totalPage = useMemo(() => {
    return Math.ceil(totalRecord / PAGE_SIZE);
  }, [totalRecord]);

  const doNextPage = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectUser(users[currentIndex + 1]);
    } else {
      if (query.page < totalPage) {
        setQuery({
          ...query,
          page: query.page + 1,
        });
      }
    }
  };

  const doPass = async () => {
    dispatch(passOrLikeUsersAsync({ userId: selectedUser?.id!, isPassed: true }));
    notification.info({
      message: 'Not feeling it?',
      description: 'Keep dicovering',
    });
    doNextPage();
  };
  const doLike = async () => {
    dispatch(passOrLikeUsersAsync({ userId: selectedUser?.id!, isPassed: false }));
    doNextPage();
  };

  const imageUrl = () => {
    return `${serverUrl}/assets/${selectedUser?.imageUrl}`;
  };
  return (
    <>
      <Card
        hoverable
        cover={<img height={454.33} alt="example" src={loading ? '' : imageUrl()} />}
        actions={[
          <span key="Like">
            <LikeOutlined key="Like" /> Liked
          </span>,
          <span key="Discover">
            <HeartTwoTone /> Discover
          </span>,
          <span key="Matches">
            <WechatOutlined key="Like" /> Matches
          </span>,
        ]}
      >
        <>
          {loading ? <Spin /> : <Meta description={`${selectedUser?.fullName},${uDetail?.age}`} />}
          <Row justify="center">
            <Space>
              <Button shape="circle" icon={<CloseOutlined style={{ color: 'red' }} />} onClick={doPass} />
              <Button shape="circle" icon={<HeartTwoTone />} onClick={doLike} />
            </Space>
          </Row>
        </>
      </Card>
      ,
    </>
  );
};
