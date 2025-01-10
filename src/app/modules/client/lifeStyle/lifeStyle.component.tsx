import { useState, FC } from 'react';
import { css } from '@emotion/react';
import TitleProducts from '../products/titleProducts/titleProducts.component';
import SaleProduct from '../home/main-home/component/sale-product/sale-product.component';

interface LifeStyleTypes {
    props?: any
}
const LifeStyle: FC<LifeStyleTypes> = () => {

    return (
        <div css={Fashion_Show}>
            <TitleProducts>
                Tin tức
            </TitleProducts>

            <div className='fashion'>
                <div className='title-big'>
                    LIFESTYLE
                </div>
            </div>

            <div className='story-section '>
                <div className='context'>
                    <h2>
                        <a href="https://ivymoda.com/tin-tuc/bai-viet/enchanted-thanh-am-loi-cuon-tu-ve-dep-nu-tinh-1278">IVY moda - Tổng kết một năm 2022: “Trao sức mạnh - Nhân gắn kết</a>
                    </h2>
                    <p>
                        Trải qua gần hai thập kỷ, thương hiệu thời trang hàng đầu Việt Nam IVY moda, dưới sự điều hành của thế hệ F1 - CEO 9x Nguyễn Lê Vũ Linh đã có cho mình những định hướng mới mẻ, phù hợp hơn với vị thế hiện tại của doanh nghiệp.
                    </p>
                    <div className='time'>12/05/2023</div>
                    <div className='action'>
                        <a href="#" rel="nofollow">XEM NGAY</a>
                    </div>
                </div>

                <div className='img'>
                    <img src="	https://pubcdn.ivymoda.com/files/news/2023/02/04/fb3918767c2cfed9e4fe0589584ba811.png" className='w-[100%]' alt="LIFESTYLE"></img>
                </div>
            </div>

            <div className='story-section  my-28'>
                <div className='img'>
                    <img src="	https://pubcdn.ivymoda.com/files/news/2022/12/02/fd5dfa990dead559101de91ffd63e19a.jpg" className='w-[100%]' alt="LIFESTYLE"></img>
                </div>

                <div className='context text-center'>
                    <h2>
                        <a href="https://ivymoda.com/tin-tuc/bai-viet/enchanted-thanh-am-loi-cuon-tu-ve-dep-nu-tinh-1278">MERINO WOOL - LOẠI LEN THƯỢNG HẠNG BẬC NHẤT THẾ GIỚI</a>
                    </h2>
                    <p>
                        <a className='text-4xl'> 100% LÔNG CỪU TINH KHIẾT ĐƯỢC CHỨNG NHẬN BỞI THE WOOLMARK COMPANY - Tổ chức uy tín hàng đầu về thẩm định nguồn gốc & kiểm soát chất lượng.</a>
                    </p>
                    <div className='time'>12/05/2023</div>
                    <div className='action'>
                        <a href="#" rel="nofollow">XEM NGAY</a>
                    </div>
                </div>


            </div>

            <div className='grid grid-cols-3 gap-10 pt-20 max-sm:block max-sm:p-10 max-lg:block max-lg:p-10'>
                <div className='max-sm:py-8 max-lg:py-8'>
                    <div>
                        <img src="https://pubcdn.ivymoda.com/files/news/2022/11/22/46d792c11884c583a04b9b1fe745964e.jpg" alt="HARMONY - SS23 FASHION SHOW | ĐÁNH THỨC THANH ÂM TRONG BẠN"></img>
                    </div>
                    <div className='pt-8'>
                        <div className='author'>
                            Với Châu Gia, các thiết kế là cộng hưởng của hơi thở truyền thống quý giá qua những họa tiết thêu tay kì công và tỉ mỉ, cùng với đó là sự bay bổng về phom dáng, đường xếp nếp mềm mại đầy xu hướng giúp nàng khoe nét yêu kiều một cách đầy tình tứ.
                        </div>
                        <div className='title'>
                            CHÂU GIA - CUỐN HÚT NHƯ NGỌC QUÝ CÙNG CỐT CÁCH CAO SANG, ĐÀI CÁC TRONG TẤM ÁO DÀI IVY moda
                        </div>
                        <div className="time"> 02/12/2022</div>
                    </div>
                </div>
                <div className='max-sm:py-8 max-lg:py-8'>
                    <div>
                        <img src="	https://pubcdn.ivymoda.com/files/news/2022/11/15/423c529e4cb195591068c0c096bdaa53.jpg" alt="TIMELESS | FW22 FASHION SHOW - VẺ ĐẸP TỎA RẠNG VƯỢT THỜI GIAN"></img>
                    </div>
                    <div className='pt-8'>
                        <div className='author'>
                            Mùa Thu/Đông 2022, IVY moda không ngừng tiến bước khi trình làng các thiết kế len/jeans mang phiên bản hoàn toàn mới, dẫn đầu xu hướng thông qua những chi tiết, họa tiết, chất liệu...cao cấp &amp; thịnh hành nhất.
                        </div>
                        <div className='title'>
                            FEELIN' CLASSY - ĐÓN ĐẦU XU HƯỚNG THỜI TRANG VÀ BẬT CHẾ ĐỘ ẤM ÁP
                        </div>
                        <div className="time">   15/11/2022</div>
                    </div>
                </div>
                <div className='max-sm:py-8 max-lg:py-8'>
                    <div >
                        <img src="	https://pubcdn.ivymoda.com/files/news/2022/10/08/966fd3eddea70e84ae852f7f57731909.jpg" alt="Xu hướng màu ombre huyền ảo được thổi hồn trong BST “Mơ Nhuộm Nắng”"></img>
                    </div>
                    <div className='pt-8 '>
                        <div className='author'>
                            Là sự kiện bùng nổ nhất mùa Thu/Đông 2022, IVY moda ra mắt bộ sưu tập TIMELESS kết hợp sản xuất cùng tạp chí L'Officiel đẳng cấp thế giới với hơn 100 năm lịch sử. Các thiết kế được lấy cảm hứng từ phong cách thời trang Academia, cộng hưởng với những ý tưở
                        </div>
                        <div className='title'>
                            TIMELESS | FALL/WINTER 2022 COLLECTION - VẺ ĐẸP TỎA RẠNG VƯỢT THỜI GIAN
                        </div>
                        <div className="time">   08/10/2022</div>
                    </div>
                </div>

            </div>

            <div className='moder'>
                <div className='title-moder'>MORDERN TRENDING</div>
                <div>
                    <SaleProduct />
                </div>
            </div>
        </div>
    )

}
export default LifeStyle;
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
        padding: 30px 20px 0px 30px;
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
    .author{
        font-size: 14px;
        line-height: 24px;
        color: #57585a;
        margin-bottom: 32px;
        letter-spacing: 1px;
    }
    .moder{
        padding-top: 80px;
        padding-bottom: 40px;
    }
    .title-moder{
        text-align: center;
        color: #221f20;
        font-size: 40px;   
        font-weight: 550;
        letter-spacing: 3px;        
    }
    @media (min-width: 0) and (max-width: 739px) {
        .title-big{
            font-size: 30px ;
        }
        .story-section{
            display:block;
        }
        .context{
            width:100%;      
            text-align: center;                  
        }
        .img{
            width:100%;
            padding:30px;
        }
        .action{
            padding-bottom:30px;
        }
      }
      @media (min-width: 740px) and (max-width: 1023px) {
        .title-big{
            font-size: 50px ;
        }
        .story-section{
            display:block;
        }
        .context{
            width:100%;      
            text-align: center;                  
        }
        .img{
            width:100%;
            padding:30px;
        }
        .action{
            padding-bottom:30px;
        }
      }
`
