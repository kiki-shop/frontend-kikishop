import { css } from '@emotion/react'
import { FunctionComponent } from 'react'

interface Ibutton {
    props?: any
}

const ButtonComponent: FunctionComponent<Ibutton> = () => {
    return (
        <button css={cssButton}>Tìm kiếm</button>
    )
}

export default ButtonComponent
const cssButton = css`
    
    cursor: pointer;
    border: 0px;
    width: 92px;
    height: 38px;
    padding: 4px;
    border-radius: 0px 8px 8px 0px;
    background: transparent;
    color: var(--color-blue-primary);
    font-weight: 400;
    font-size: 0.875 rem;
    line-height: 150%;
    outline: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
  
    &:hover{
        background:var( --color-blue-hover)
    }
`