import { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import InputComponent from '~/app/component/parts/input/input.component';
import ButtonSqua from '~/app/component/parts/button/ButtonSqua';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { validateLogin } from '../utils/validateForm';
import { loginSystem } from '~/app/api/auth/auth.api';
import { useAuthRedux } from '../redux/hook/useAuthReducer';
import { message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartRedux } from '../redux/hook/useCartReducer';

interface LoginProps {
    props?: any
}
const Login: FunctionComponent<LoginProps> = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const {
        actions
      } = useCartRedux();
    let navigate = useNavigate()
    const { handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(validateLogin)
    });
    const onSubmit = (data: any) => {
        loginSystem(data).then((res) => {
            if (res) {
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('userID', res.data.user._id);
                localStorage.setItem("emailUser", res.data.user.email)
                message.success("Đăng nhập thành công", () => {
                    localStorage.removeItem('cartNoAccount')
                    localStorage.removeItem('listSelectCart')
                    navigate("/");
                    location.reload();
                });
            }
            localStorage.setItem("checkAuth", res.data.user.role)
            actions.clearCartNoAccount();
        },

            (err) => {
                message.error(err.response.data)
            })
    }
    return (
        <div className='box-border mt-10'>
            {contextHolder}
            <div css={cssLogin} >
                <div className='w-[40%] px-[15px] text-center'>

                    <h1 className='big-title'>Bạn đã có tài khoản KIKI</h1>
                    <h3 className='small-title'>Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className='px-[30px] pt-[24px] text-left space-y-[24px]'>
                        <div className=''>
                            <Controller
                                control={control}
                                name="email"
                                render={({
                                    field: { onChange, value, ref },
                                    fieldState: { error }
                                }) => {
                                    return (
                                        <div className='w-full h-[34px] mt-5' >
                                            <InputComponent
                                                type="email"
                                                hideIcon={false}
                                                placeholder="Email/SĐT"
                                                onChange={onChange}
                                                value={value}
                                                ref={ref}
                                                hasErorr={error}
                                            />
                                            {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Controller
                                control={control}
                                name="password"
                                render={({
                                    field: { onChange, value, ref },
                                    fieldState: { error }
                                }) => {
                                    return (
                                        <div className='w-full h-[34px] mt-16' >
                                            <InputComponent
                                                type="password"
                                                hideIcon={false}
                                                placeholder="Mật khẩu"
                                                onChange={onChange}
                                                value={value}
                                                ref={ref}
                                                hasErorr={error}
                                            />
                                            {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <input type="checkbox" name="" id="" />
                            <span>Ghi nhớ đăng nhập</span>
                        </div>
                        <div>
                            <Link to={'/customer/forgotpass'} className='text-[14px] text-[#221f20] underline'>Quên mật khảu</Link>
                        </div>
                        <ButtonSqua css={cssBtn} outline>Đăng nhập</ButtonSqua>
                    </form>

                </div>
                <div className='w-[1px] h-[300px] bg-[#e7e8e9]'></div>
                <div className='w-[40%] px-[15px] text-center'>
                    <h1 className='big-title'>
                        Khách hàng mới của KIKI
                    </h1>
                    <div className='small-title mb-[24px]'>
                        <h3 >
                            Nếu bạn chưa có tài khoản trên kiki, hãy sử dụng tùy chọn này để truy cập biểu mẫu đăng ký.
                        </h3>
                        <h3>
                            Bằng cách cung cấp cho IVY moda thông tin chi tiết của bạn, quá trình mua hàng trên kiki sẽ là một trải nghiệm thú vị và nhanh chóng hơn!
                        </h3>
                    </div>
                    <Link to={'/customer/register'}>
                        <ButtonSqua css={cssBtn} children='Đăng ký' outline />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;

const cssLogin = css`
width:90%;
display:flex;
justify-content:space-between;
margin: 0 auto;
padding: 0 90px;
.big-title{
  font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 0;
    color: #221f20;
    cursor: pointer;
}
.small-title{
    font-size: 14px;
    line-height: 24px;
    color: #6c6d70;
}
`
const cssBtn = css`
  width:100%;
  padding: 12px 24px;
  border-radius: 16px 0px;
  font-size: 16px;
  line-height: 24px;
`