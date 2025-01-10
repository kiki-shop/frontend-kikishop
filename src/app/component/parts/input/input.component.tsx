import { css } from '@emotion/react'
import React from 'react'
import { CiSearch } from 'react-icons/ci'
interface InputProps {
  prop?: any
  hideIcon?: boolean
  placeholder?: string
  onChange?: any
  value?: any
  hasErorr?: any
  type?: any
  onFocus?: any
  onClick?: any
  css?: any
}
type RefType = any

const InputComponent = React.forwardRef<RefType, InputProps>(
  (
    { hideIcon = true, placeholder = 'TÌM KIẾM SẢN PHẨM', onChange, onClick, onFocus, value, type, hasErorr, prop },
    ref
  ) => {
    return (
      <div css={cssInput(hideIcon, hasErorr)} className='relative z-22'>
        {hideIcon && (
          <button onClick={onClick} className='icon px-[9px]'>
            <CiSearch />
          </button>
        )}
        <input
          ref={ref}
          type={type}
          className='h-full w-full flex-1 block outline-none input'
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          onFocus={onFocus}
        />
        {/* {hideIcon && <button className='button-search' >Tìm kiếm</button>} */}
      </div>
    )
  }
)

export default InputComponent

const cssInput = (hideIcon: boolean, hasErorr: any) => css`
  display: flex;
  align-items: center;
  z-index: 22;
  background-color: white;
  flex: 1;
  ${hasErorr ? 'border: 1px solid rgb(255, 93, 93);' : 'border: 1px solid rgb(221, 221, 227);'}
  border-radius: 12px;
  overflow: hidden;
  min-height: 38px;
  transition: all 0.3s ease;
  .icon {
    font-size: 22px;
    color: var(--color-gray-200);
  }
  .input {
    padding-left: 10px;
    width: 100%;
    height: 40px;
    background: #fff;
    font-weight: 400;
    font-size: 12px;

    ${hideIcon ? 'border-radius: 0 4px 4px 0 ;' : 'border-radius: 4px;'}
  }
  .button-search {
    color: var(--color-blue-primary);
    height: 100%;
    padding: 0 15px;
    width: 92px;
    height: 38px;
    &:hover {
      background-color: var(--color-blue-hover);
    }
  }
`
