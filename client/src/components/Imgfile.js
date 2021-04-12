import React from 'react';
import { PictureOutlined } from '@ant-design/icons';
import styled from 'styled-components';

function Imgfile(props) {
  return (
    <>
      <InputLabel className='input-file-button' htmlFor='input-file'>
        <PictureOutlined />
      </InputLabel>
      <Input type='file' id='input-file' />
    </>
  );
}

const InputLabel = styled.label`
  background: none;
  border: none;
  outline: none;
  font-size: 24px;
  color: #ced0d4;
  cursor: pointer;
  &:hover {
    color: #00a400;
    transform: scale(1.2);
    transition: all 200ms ease-in-out;
  }
`;

const Input = styled.input`
  display: none;
`;

export default Imgfile;
