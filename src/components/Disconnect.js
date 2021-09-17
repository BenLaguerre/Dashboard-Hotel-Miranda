import React from 'react';
import styled from "styled-components";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import {authenticationHanlder} from '../features/authSlice';

const Logout = styled(IoLogOutOutline)`
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`

export default function Disconnect(props) {
  const dispatch = useDispatch();
    return (
      <>
      <Logout onClick={() => dispatch(authenticationHanlder({status: false}))} size={32}/>
      </>
    )
  }; 
