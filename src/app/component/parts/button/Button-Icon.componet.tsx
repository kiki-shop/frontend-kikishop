import React, { FunctionComponent } from 'react'
import { css } from '@emotion/react'
interface ButtonIcon {
  props?: any
  children?: React.ReactNode
  outline?: boolean
  className?: string
}

const ButtonIcon: FunctionComponent<ButtonIcon> = ({ children, outline = false, className }) => {
  return (
    <button css={buttonIcon(outline)} className={className}>
      {children}
    </button>
  )
}

export default ButtonIcon
const buttonIcon = (outline: boolean) => css`
    background-color: ${outline ? '#fff' : '#2597F3'};
`