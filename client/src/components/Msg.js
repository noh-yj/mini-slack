import React from 'react';
import styled from 'styled-components';
import { Avatar, Row, Col } from 'antd';
import { useSelector } from 'react-redux';

function Msg(props) {
  const me = useSelector((state) => state.user.user);

  return (
    <>
      {/* 상대방 메세지 왼쪽 */}
      {me?.nickname !== props.username ? (
        <>
          <Row style={{ margin: '10px 0' }}>
            <Col>
              <FlexContainer>
                <Avatar
                  size={40}
                  src={props.profile_img}
                  style={{ backgroundColor: '#87d068' }}
                >
                  {props.profile_img === ' ' ? props.username[0] : null}
                </Avatar>
                <MsgDiv>{props.msg}</MsgDiv>
              </FlexContainer>
            </Col>
          </Row>
        </>
      ) : (
        <>
          {/* 내 메세지 오른쪽 */}
          <Row
            style={{
              margin: '10px 0',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Col>
              <MyMsgDiv>{props.msg}</MyMsgDiv>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MsgDiv = styled.div`
  width: auto;
  max-width: 200px;
  word-break: break-all;
  background: #e2e2e2;
  padding: 5px 15px;
  border-radius: 20px;
  color: #000;
  margin-left: 10px;
`;
const MyMsgDiv = styled.div`
  width: auto;
  max-width: 200px;
  word-break: break-all;
  background: #1890ff;
  padding: 5px 15px;
  border-radius: 20px;
  color: #fff;
`;

export default Msg;
