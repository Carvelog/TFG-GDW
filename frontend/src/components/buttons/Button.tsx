import React, { FC } from "react";
import styled from "@emotion/styled";

interface ButtonProps {
  value: string;
  onClick: (e?: any) => void;
}

const ButtonTheme = styled.button`
  content: "New text";
  text-indent: 0;
  width: 120px;
  min-width: 100px;
  height: 60px;
  font-size: 25px;
  color: white;
  font-family: Arial, serif;
  border-radius: 6px;
  background: #5C068C;
  border: 2px solid white;
  cursor: pointer;
  outline: none;
  margin: 5px 10px;

  &:hover {
    background: #3B0458;
    border: 2px solid #ECECEC;
    color: #ECECEC;
  }
  &:active {
    border: 3px solid #ECECEC;
  }
`

const Button: FC<ButtonProps> = ({value, onClick}) => {
  const handleOnClick = (e: any) => {
    e.preventDefault();
    onClick();
  }

  return (
    <ButtonTheme onClick={handleOnClick}>{value}</ButtonTheme>
  )
}

export default Button;
