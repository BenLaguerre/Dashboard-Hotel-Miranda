import React from "react";
import styled from "styled-components";

const ColoredButton = styled.button`
  background : ${props => props.color};
  border: none;
  border-radius: 12px;
  width: 80%;
  height: 45px;
  color: white;
`;

export default function Button(props) {
  return (
    <>
    <ColoredButton color = {props.color}>{props.name}</ColoredButton>
    </>
  )
}

