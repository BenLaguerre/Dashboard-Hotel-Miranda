import React from 'react';
import styled from "styled-components";
import { IoLogOutOutline } from "react-icons/io5";

const Logout = styled(IoLogOutOutline)`
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`

export default function Disconnect(props) {
  function buttonDisconnect(){
    props.authenticate(false);
  }

    return (
      <>
      <Logout onClick={buttonDisconnect} size={32}/>
      </>
    )
  }; 
