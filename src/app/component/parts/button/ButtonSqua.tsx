import React, { Children, FunctionComponent } from 'react'
import { css } from '@emotion/react'
interface ButtonComponent {
  props?: any
  className?: string,
  children?: React.ReactNode
  outline?: boolean
  onClick?: any
  type?: any
}

const ButtonSqua: FunctionComponent<ButtonComponent> = ({ children, className, outline = false, onClick, type }) => {
  return (
    <button css={cssButton(outline)} className={className} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export default ButtonSqua
const cssButton = (outline: boolean) => css`
background-color: ${outline ? '#000' : '#fff'};
color: ${outline ? 'white' : '#black'};
height: auto;
font-size: 1.5rem;

font-size: 14px;
border: 1px solid #221F20;
box-sizing: border-box;
margin-right: 0;
:hover{
  background-color: ${outline ? '#fff' : '#000'};
  color: ${outline ? 'black' : 'white'};
}
`