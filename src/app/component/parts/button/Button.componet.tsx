import { type } from 'os'
import React, { Children, FunctionComponent } from 'react'
import { css } from '@emotion/react'
interface ButtonComponent {
  props?: any
  className?: string,
  children?: React.ReactNode
  outline?: boolean
  outlineNew?:boolean 
  onClick?: any
  title?: String
}

const ButtonComponent: FunctionComponent<ButtonComponent> = ({ children, className, outline = false, onClick, outlineNew= false }) => {
  return (
    <button css={cssButton(outline,outlineNew)} onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default ButtonComponent
const cssButton = (outline: boolean,outlineNew: boolean) => css`
background-color: ${outline ? '#EF4444' : '#fff'};
background-color: ${outlineNew ? '#EF4444' : '#fff'};
color: ${outline ? 'white' : 'black'};
    height: auto;
    font-size: 15px;
    color: ${outlineNew ? 'white' : 'black'};
    height: auto;
    font-size: 15px;
`