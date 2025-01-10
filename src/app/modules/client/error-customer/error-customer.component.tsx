import { Link } from 'react-router-dom'

type Props = {}

const ErrorCustomer = (props: Props) => {
    return (
        <main className="h-[400px] w-full flex flex-col justify-center items-center bg-white">
            <h1 className="text-[150px] font-extrabold text-black tracking-widest">ERROR</h1>
            <div className="bg-[#FF6A3D] p-2 text-3xl rounded rotate-12 absolute font-medium">
                Giao dịch của bạn với KiKi thất bại vui lòng thanh toán lại

            </div>
            <div className="mt-5">
                <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-9 group-hover:translate-x-9"></span>
                    <span className="relative block px-8 py-6 bg-stone-950 border border-current">
                        <button className='text-3xl'><Link to={"/"}>Go Home</Link></button>
                    </span>

                </div>
            </div>
        </main>
    )
}

export default ErrorCustomer