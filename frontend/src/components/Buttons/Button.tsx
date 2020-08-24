import React, { FC } from "react";
import styled from "@emotion/styled";
import closeIcon from '../../assets/closeIcon.svg'
import { square, close, outline } from "./utils";

type buttonTypes = 'square' | 'close' | 'outline'

interface ButtonProps {
  value?: string;
  onClick: (e?: any) => void;
  type: buttonTypes
}

const ButtonTheme = styled.button<any>`
  text-indent: 0;
  width: ${props => props.theme.width};
  min-width: ${props => props.theme.minWidth};
  height: ${props => props.theme.height};
  font-size: ${props => props.theme.fontSize};
  color: #FFFFFF;
  font-family: Arial, serif;
  border-radius: ${props => props.theme.borderRadius};
  background: #5C068C;
  border: ${props => props.theme.border};
  cursor: pointer;
  outline: none;
  margin: ${props => props.theme.margin};
  padding: 0;

  &:hover {
    background: ${props => props.theme.hoverBackground};
    border: ${props => props.theme.hoverBorder};
    color: #ECECEC;
  }
  &:active {
    background: ${props => props.theme.activeBackground};
    border: ${props => props.theme.activeBorder};
  }
`

const Img = styled.img`
display: block;
margin-left: auto;
margin-right: auto;
`

const Button: FC<ButtonProps> = ({value, onClick, type}) => {
  const handleOnClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  }

  switch (type) {
    case "square": return <ButtonTheme theme={square} onClick={handleOnClick}>{value}</ButtonTheme>;
    case "close": return <ButtonTheme theme={close} onClick={handleOnClick}><Img src={closeIcon} alt="delete upload" height={8} width={8}/></ButtonTheme>;
    case "outline": return <ButtonTheme theme={outline} onClick={handleOnClick}>{value}</ButtonTheme>;
  }
}

export default Button;
