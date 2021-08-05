import React from "react";
import styled from "styled-components";
import Disconnect from '../components/Disconnect';
import { IoMailOutline } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const BarWrapper = styled.div`
  display:flex;
  background-color: white;
  align-items: center;
  flex: 1;
  box-shadow: 0px 3px 10px #00000005;
  height: 80px;
  position: sticky;
  top: 0;
  padding-right: 5%;
  h1 {
    flex: 1;
    font: 300 28px Poppins;
  }
`;

const Icons = styled.div`
  display:flex;
  flex: 0.5;
  justify-content: space-around;
  align-items: center;
  
`;

const ArrowLeft = styled(BsArrowLeft) `
  flex:0.3;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const ArrowRight = styled(BsArrowRight) `
  flex:0.3;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Mail = styled(IoMailOutline) `
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const Bell = styled(VscBell) `
  padding: 10px;
  
  &:hover {
    cursor: pointer;
  }
`;

export default function HorizontalBar(props) {
  
  function hideMenu (){
    props.handleNavBar()
  }

  function authenticate (){
    props.authenticate()
  }

  return (
    <>
    <BarWrapper>
      { props.navon ? 
        <ArrowLeft onClick={hideMenu} size={26} /> :
        <ArrowRight onClick={hideMenu} size={26} />
      }   
      <h1>{props.name}</h1>
      <Icons>
        <Mail size={32} />
        <Bell size={32} />
        <Disconnect authenticate={authenticate}/>
      </Icons>

    </BarWrapper>
    </>
  );
}