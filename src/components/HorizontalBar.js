import React from "react";
import styled from "styled-components";
import Disconnect from '../components/Disconnect';
import { IoMailOutline } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { HiMenuAlt2 } from "react-icons/hi";

const BarWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  background-color: white;
  align-items: center;
  flex: 1;
  box-shadow: 0px 3px 10px #00000005;
  height: 80px;
  position: sticky;
  top: 0;
  padding: 0 5% 0 5%;
  z-index: 1;
  div {
    display:flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    h1 {
      font: 300 28px Poppins;
    }
  }
`
const HideMenu = styled(HiMenuAlt2) `
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`
const Mail = styled(IoMailOutline) `
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`
const Bell = styled(VscBell) `
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`

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
      <div>
        <HideMenu  onClick={hideMenu} size={26}></HideMenu>
        <h1>{props.name}</h1>
      </div>
      <div>
        <Mail size={32} />
        <Bell size={32} />
        <Disconnect authenticate={authenticate}/>
      </div>

    </BarWrapper>
    </>
  );
}