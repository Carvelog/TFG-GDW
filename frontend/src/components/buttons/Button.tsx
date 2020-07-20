import React, { FC } from "react";
import styled from "@emotion/styled";
import close from '../../assets/closeIcon.svg'

type buttonTypes = 'square' | 'round'

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
  color: white;
  font-family: Arial, serif;
  border-radius: ${props => props.theme.borderRadius};
  background: #5C068C;
  border: 2px solid white;
  cursor: pointer;
  outline: none;
  margin: ${props => props.theme.margin};
  padding: 0;

  &:hover {
    background: #3B0458;
    border: 2px solid #ECECEC;
    color: #ECECEC;
  }
  &:active {
    border: 3px solid #ECECEC;
  }
`

const Img = styled.img`
display: block;
margin-left: auto;
margin-right: auto;
`

const Button: FC<ButtonProps> = ({value, onClick, type}) => {

  const square = {
    width: '120px',
    minWidth: '100px',
    height: '60px',
    borderRadius: '6px',
    fontSize: '25px',
    margin: '5px 10px'
  }

  const round = {
    width: '20px',
    minWidth: '5px',
    height: '20px',
    borderRadius: '50%',
    fontSize: '15px',
    margin: '0'
  }

  const handleOnClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  }

  if(type === 'square')
    return <ButtonTheme theme={square} onClick={handleOnClick}>{value}</ButtonTheme>
  else
    return <ButtonTheme theme={round} onClick={handleOnClick}><Img src={close} alt="delete upload" height={8} width={8}/></ButtonTheme>
}

export default Button;
