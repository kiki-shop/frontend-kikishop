import React, { FC, Fragment } from 'react'
import { Spinner } from '../../parts/spinner/spinner.component'
import { css } from '@emotion/react'

interface PropTypes {
    condition: boolean
    children: any
}

const LayoutLoading: FC<PropTypes> = ({ condition, children }) => {
    return (
        <Fragment>
            {condition && (
                <div css={cssLayoutLoading}>
                    <div className='spinner'>
                        <Spinner title={"Đang xử lý..."} />
                    </div>
                </div>
            )}
            {children}
        </Fragment>
    )
}

export default LayoutLoading

const cssLayoutLoading = css`
  position: fixed;
  inset: 0;
  background-color: #00000088;
  z-index: 100;
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
  }
`