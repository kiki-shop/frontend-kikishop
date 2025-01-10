import { useState, FC } from 'react';
import { css } from '@emotion/react';
import TitleProducts from '../products/titleProducts/titleProducts.component';

interface FashionShowTypes {
    props?: any
}
const FashionShow: FC<FashionShowTypes> = () => {

    return (
        <div css={Fashion_Show}>
            <TitleProducts>
                Fashion Show
            </TitleProducts>

            <div className='fashion'>
                <div className='title-big'>
                    Fashion Show
                </div>
            </div>

            <div className='story-section'>
                <div className='context'>
                    <h2>
                        <a href="https://ivymoda.com/tin-tuc/bai-viet/enchanted-thanh-am-loi-cuon-tu-ve-dep-nu-tinh-1278">ENCHANTED - THANH ÂM LÔI CUỐN TỪ VẺ ĐẸP NỮ TÍNH</a>
                    </h2>
                    <p>
                        Say đắm trước vẻ đẹp thanh lịch và dịu dàng của nàng thơ IVY moda, BST là bản tuyên ngôn tươi mát với chất liệu ren cao cấp và xu hướng. Chi tiết xếp nhún trẻ trung trở thành điểm nhấn đầy sôi động trong mùa hè này. Đặc biệt, nàng có thể cảm nhận sự mềm mại, nhẹ tênh thông qua từng cử động trong những thước hình dưới đây. Và hãy ngắm nhìn các thiết kế xu hướng đến từ thương hiệu nhé!
                    </p>
                    <div className='time'>12/05/2023</div>
                    <div className='action'>
                        <a href="#" rel="nofollow">XEM NGAY</a>
                    </div>
                </div>

                <div className='img'>
                    <img src="	https://pubcdn.ivymoda.com/files/news/2023/09/07/43578e15bb694b27993dcabbfb63a45b.jpg" className='w-[100%]' alt="LIFESTYLE"></img>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-10 pt-20'>
                <div>
                    <div>
                        <img src="https://pubcdn.ivymoda.com/files/news/2023/03/29/e0752a92ad214924d6324e1ccef10252png.png" alt="HARMONY - SS23 FASHION SHOW | ĐÁNH THỨC THANH ÂM TRONG BẠN"></img>
                    </div>
                    <div className='pt-8'>
                        <div className='title'>
                            HARMONY - SS23 FASHION SHOW | ĐÁNH THỨC THANH ÂM TRONG BẠN
                        </div>
                        <div className="time"> 29/03/2023</div>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="https://pubcdn.ivymoda.com/files/news/2023/02/27/e57128bf9a8954a080cf30a0cc688479.png" alt="TIMELESS | FW22 FASHION SHOW - VẺ ĐẸP TỎA RẠNG VƯỢT THỜI GIAN"></img>
                    </div>
                    <div className='pt-8'>
                        <div className='title'>
                            TIMELESS | FW22 FASHION SHOW - VẺ ĐẸP TỎA RẠNG VƯỢT THỜI GIAN
                        </div>
                        <div className="time"> 27/02/2023</div>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="https://pubcdn.ivymoda.com/files/news/2023/02/27/38e425b561662a9632d8547dca9d125c.png" alt="Xu hướng màu ombre huyền ảo được thổi hồn trong BST “Mơ Nhuộm Nắng”"></img>
                    </div>
                    <div className='pt-8'>
                        <div className='title'>
                            Xu hướng màu ombre huyền ảo được thổi hồn trong BST “Mơ Nhuộm Nắng”
                        </div>
                        <div className="time">  15/04/2022</div>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="https://pubcdn.ivymoda.com/files/news/2023/02/27/af70acc11c7f0d728f2b997d96dc478f.png" alt="Digital Show 2022"></img>
                    </div>
                    <div className='pt-8'>
                        <div className='title'>
                            Digital Show 2022
                        </div>
                        <div className="time">  04/04/2022</div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default FashionShow;
const Fashion_Show = css`    
max-width: 1440px;
box-sizing: border-box;
margin:auto;
justify-content:center;


    .fashion{
        max-width: 100%;
        padding: 40px 0 80px;
    }
    .title-big{
        font-size: 100px;
        line-height: 98px;        
        font-weight: 750;
        margin-bottom: 40px;
        text-align: center;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #221F20;
    }
    .story-section{        
        display: flex;        
        border: 1px solid #e7e8e9;
        grid-gap: 60px;
        border-radius: 80px 0px;
        overflow: hidden;
        min-height: 400px;        
    }
    .context{
        padding: 30px 0px 0px 30px;
        width : 50%
    }
    .context h2{
        color: #221f20;
        font-size: 50px;
        line-height: 46px;
        margin-bottom: 24px;
        letter-spacing: 2px;
    }

    .context p{
        font-size: 14px;
        line-height: 24px;
        color: #57585a;
        margin-bottom: 32px;
        letter-spacing: 1px;
    }
    .time{
        font-size: 20px;
        line-height: 23px;
        color: #939598;
        padding-top:40px;
    }

    .action{        
        padding: 80px 0px 0px 0px
    }

    .action a{
        font-size: 20px;
        color: #57585a;
        display: inline-flex;
        text-decoration: underline;
        border:0;
        
    }

    .img{
        border-radius: 80px 0px;
        overflow: hidden;
        width:50%        
    }
    .title{
        color: #221f20;
        font-size: 16px;
        font-weight: 600;
        margin-top: 8px;
    }
`
