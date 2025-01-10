import { Link } from "react-router-dom"
import { css } from '@emotion/react';

const PaymentComponennt = () => {
    return (
        <div css={cssPayment}>
            <Link to="https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm">
                <button>Truy cập VNPay</button>
            </Link>
        </div>

    )
}

export default PaymentComponennt

const cssPayment = css`
button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    text-decoration: none;
}
`