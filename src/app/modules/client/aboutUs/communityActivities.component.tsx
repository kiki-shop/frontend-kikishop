import { useState, FC } from 'react';
import { css } from '@emotion/react';
import TitleProducts from '../products/titleProducts/titleProducts.component';

interface CommunityActivitiesTypes {
    props?: any
}
const CommunityActivities: FC<CommunityActivitiesTypes> = () => {

    return (
        <div css={Community_Activities}>
            <TitleProducts>
                Fashion Show
            </TitleProducts>

            <div className='fashion'>
                <div className='title-big'>
                    HOẠT ĐỘNG CỘNG ĐỒNG
                </div>
            </div>

            <div className='story-section'>
                <div className='context'>
                    <h2>
                        <a href="https://ivymoda.com/tin-tuc/bai-viet/enchanted-thanh-am-loi-cuon-tu-ve-dep-nu-tinh-1278">IVY moda - Tổng kết một năm 2022: “Trao sức mạnh - Nhân gắn kết</a>
                    </h2>
                    <p>
                        Hãy cùng điểm lại một năm 2022 với những hoạt động tinh thần: “Trao sức mạnh - Nhân gắn kết” mà thương hiệu thời trang IVY moda đã thực hiện.
                    </p>
                    <div className='time'>13/01/2023</div>
                    <div className='action'>
                        <a href="#" rel="nofollow">XEM NGAY</a>
                    </div>
                </div>

                <div className='img'>
                    <img src="https://pubcdn.ivymoda.com/files/news/2023/02/04/be3c1129f8d8793d43a3b9bbcc5caf7b.png" className='w-[100%]' alt="LIFESTYLE"></img>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-10 pt-20'>
                <div>
                    <div>
                        <img src="https://pubcdn.ivymoda.com/files/news/2023/02/04/65b8c253995a3778300534128a6d32db.png" alt="Thương hiệu thời trang IVY moda trao tặng 1500 bộ quần áo bảo hộ cho Bệnh viện Đa khoa tỉnh Phú Thọ để phục vụ công tác phòng chống Dịch Covid-19"></img>
                    </div>
                    <div className='pt-8'>
                        <div className='title'>
                            Thương hiệu thời trang IVY moda trao tặng 1500 bộ quần áo bảo hộ cho Bệnh viện Đa khoa tỉnh Phú Thọ để phục vụ công tác phòng chống Dịch Covid-19
                        </div>
                        <div className="time"> 10/01/2023</div>
                    </div>
                </div>

            </div >
        </div>
    )

}
export default CommunityActivities;
const Community_Activities = css`    
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
