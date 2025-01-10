import { css } from '@emotion/react'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

interface ThankCustomersProps { }

const ThankCustomers: FunctionComponent<ThankCustomersProps> = () => {
  return (
    <div className="flex items-center justify-center h-min">
      <div className=" w-[90%] m-3 p-2 shadow-xl bg-gradient-to-r">
        <div className="flex flex-col items-center p-36 space-y-2 bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-blue-600 w-60 h-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-8xl font-bold font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500 pb-12">KiKi Thank You !</h1>
          <div className='text-3xl text-center max-sm:w-full w-2/4'>
            Cảm ơn bạn đã tin tưởng và lựa chọn sản phẩm của <b>KiKi</b>. Mong rằng bạn đã có 1 trải nghiệm mua sắm
            hài lòng tại <b>KiKi</b>. Rất vui khi được phục vụ bạn và mong rằng sẽ được tiếp tục đồng hành cùng
            bạn.
            <br />
            <p className='p-6'>Xin Chân Thành Cảm Ơn Quý Khách!</p>
          </div>

          <div className='flex justify-between'>
            <div className="inline-flex items-center px-6 py-4 text-white bg-black border border-black rounded-3xl hover:text-black hover:bg-white focus:outline-none focus:ring mx-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <button className="text-3xl font-medium px-6">
                < Link to={'/products'}>Tiếp tục mua hàng</Link>
              </button>
            </div>

            <div className="inline-flex items-center px-6 py-4 text-white bg-black border border-black rounded-3xl hover:text-black hover:bg-white focus:outline-none focus:ring">
              <button className="text-3xl font-medium px-6">
                < Link to={'/manage'}>Xem đơn hàng</Link>
              </button>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H3" />
              </svg>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankCustomers

const cssmain = css`
  width: 100%;
  .thankyou {
    width: 400px;
    margin: 0 auto;    
  }
  .name {
    text-align: center;
    font-size: 50px;
    padding-top: 10px;
    font-family: 'Comic Sans MS', cursive, sans-serif;
  }
  .desc {
    margin: 0 auto;
    padding: 20px;
    font-size: 40px;
    color: #EE6AA7;
  }
  .thank {
    text-align: center;
    padding-top: 8px;
  }
  .btn {
    font-size: 15px;    
    width:300px;
    height:50px;
  }
  .btn-back {
    border: 1px solid gray;
    color: gray;
    padding: 8px;
    border-radius: 8px;
  }
  .btn-back:hover {
    border: 1px solid #fff;
    color: #fff;
    padding: 8px;
    border-radius: 8px;
    background-color: #000;
  }
`
