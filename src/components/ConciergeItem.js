import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { convertDate } from './GuestItem';
import { GrPhone } from "react-icons/gr";

const PadTd= styled.td `
  padding-left: 20px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #393939;
  display: flex;
  align-items: center;
  gap: 20px;
  opacity: 1;
  transition: filter 0.5s;
  transition: opacity 0.5s;
  &:hover{
    opacity: 0.7;
  }
`
const Picture = styled.div `
  width: 65px;
  height: 65px;
  background: #C5C5C5;
  border-radius: 8px;
`
const NameId = styled.div `
  p:nth-of-type(1){
    color: #212121;
  }
  p:nth-of-type(2), p:nth-of-type(3){
    font-size: 14px;
  }
`
const Job= styled.td `
  width: 45%;
`
const Status= styled.p `
  color : ${props => props.color};
  font-weight: bold;
`

export default function ConciergeItem(props) {
  return (
    <>
      <PadTd>
        <StyledLink to={`/conciergelist/${props.id}`}>
          <Picture />
          <NameId>
            <p>{props.name}</p> 
            <p>6345 - {props.id}24</p>
            <p>Join on {convertDate(props.joinDate)} </p>
          </NameId>
        </StyledLink>
      </PadTd>
      <Job>{props.job}</Job>
      <td><GrPhone /> {props.phone}</td>
      <td>{props.status === 1 ? <Status color= {'green'}>ACTIVE</Status> : <Status color= {'red'}>INACTIVE</Status>}</td>
    </>
  );                        
} 
