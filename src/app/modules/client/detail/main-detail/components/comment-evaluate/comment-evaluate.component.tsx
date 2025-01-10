import { css } from "@emotion/react";
import { Modal, Rate, Select } from "antd"
import { FunctionComponent, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { createComment } from "~/app/api/comment/comment.api";
import ButtonComponent from "~/app/component/parts/button/Button.componet"
import ButtonSqua from "~/app/component/parts/button/ButtonSqua";
import { useCommentRedux } from "~/app/modules/client/redux/hook/useCommentReducer";
import { useProductRedux } from "~/app/modules/client/redux/hook/useProductReducer";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";

interface DetailInformation { }
const CommentEvaluateComponent: FunctionComponent<DetailInformation> = () => {
    const {
        data: { product: productDetail }
    } = useProductRedux()
    const image = productDetail?.images?.map((item: any) => item?.url) || [];
    let { id } = useParams()
    const [commentText, setCommentText] = useState('')
    const { actions } = useCommentRedux()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState(5);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const handleTextAreaChange = (event: any) => {
        setCommentText(event.target.value)
    }
    const userId = localStorage.getItem("userID")
    const { data: { product } } = useProductRedux()
    const email: any = localStorage.getItem("emailUser")
    const handelSubmitComment = () => {
        createComment({ comment: commentText, productId: { _id: id, name: product.name }, star: value, userId: { _id: userId, name: email } }).then((res) => {
            if (res) {
                toast.success("Đánh giá và bình luận thành công")
                setIsModalOpen(false);
                actions.getAllComments(id)
            }
        }, (err) => {
            toast.error("không thành công")
        })
    }
    return (
        <div css={CommentCss} className="max-sm:px-2">
            <hr className='mt-20' />
            <div className='block md:flex justify-between my-7 mt-5'>
                <div>
                    <div className="flex items-center">
                        <h2 className='text-[22px] font-semibold mt-[16px]'>Tất cả đánh giá</h2>
                        <div className='px-8'>
                            <Select
                                defaultValue="0"
                                style={{ width: 150 }}
                                //   onChange={handleChange}
                                options={[
                                    { value: '0', label: 'Tìm tất cả' },
                                    { value: '1', label: '5 Sao' },
                                    { value: '2', label: '4 Sao' },
                                    { value: '3', label: '3 Sao' },
                                    { value: '4', label: '2 Sao' },
                                    { value: '5', label: '1 Sao' },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="rating-product mt-[40px]">
                        <div className="flex gap-[20px] mb-[20px] items-center">
                            <h1 className="text-[60px] text-[#ffaa00] font-[700] ">5</h1>
                            <div>
                                <div className="flex gap-[8px] comment-star">
                                    <TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline />
                                </div>
                                <span className="comment-quantity">0 nhận xét</span>
                            </div>
                        </div>
                        <div>
                            <div className="five-star flex gap-[20px] my-[10px]">
                                <div className="star flex gap-[6px]"><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /></div>
                                <div className="h-[4px] w-[180px] rounded-[4px] bg-[rgba(37,36,37,.11)] my-auto"></div>
                                <div className="text-[16px] text-[rgba(37,36,37,.5)]">0</div>
                            </div>
                            <div className="five-star flex gap-[20px] my-[10px]">
                                <div className="star flex gap-[6px]"><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarOutline /></div>
                                <div className="h-[4px] w-[180px] rounded-[4px] bg-[rgba(37,36,37,.11)] my-auto"></div>
                                <div className="text-[16px] text-[rgba(37,36,37,.5)]">0</div>
                            </div>
                            <div className="five-star flex gap-[20px] my-[10px]">
                                <div className="star flex gap-[6px]"><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarOutline /><TiStarOutline /></div>
                                <div className="h-[4px] w-[180px] rounded-[4px] bg-[rgba(37,36,37,.11)] my-auto"></div>
                                <div className="text-[16px] text-[rgba(37,36,37,.5)]">0</div>
                            </div>
                            <div className="five-star flex gap-[20px] my-[10px]">
                                <div className="star flex gap-[6px]"><TiStarFullOutline /><TiStarFullOutline /><TiStarOutline /><TiStarOutline /><TiStarOutline /></div>
                                <div className="h-[4px] w-[180px] rounded-[4px] bg-[rgba(37,36,37,.11)] my-auto"></div>
                                <div className="text-[16px] text-[rgba(37,36,37,.5)]">0</div>
                            </div>
                            <div className="five-star flex gap-[20px] my-[10px]">
                                <div className="star flex gap-[6px]"><TiStarFullOutline /><TiStarOutline /><TiStarOutline /><TiStarOutline /><TiStarOutline /></div>
                                <div className="h-[4px] w-[180px] rounded-[4px] bg-[rgba(37,36,37,.11)] my-auto"></div>
                                <div className="text-[16px] text-[rgba(37,36,37,.5)]">0</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <div>
                        <h2 className='text-[22px] font-semibold mb-6 text-center'>
                            Bình luận, đánh giá suy nghĩ của bạn
                        </h2>
                        <ButtonSqua className="btn float-right" children={"Bình luận, đánh giá tại đây"} onClick={showModal} />
                        <div>
                            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1200} bodyStyle={{ height: 540 }} footer={null}>
                                <div className='flex my-5 gap-[16px]'>
                                    <div>
                                        <img src={image[0]} alt="" className='h-[445px] w-[395px] max-sm:h-auto' />
                                    </div>
                                    <div className='px-4 w-full'>
                                        <h1 className='text-[22px] font-semibold'>{productDetail?.name}</h1>
                                        <p className='text-[14px] text-gray-600 font-semibold py-4'>Thương hiệu: {productDetail?.brand}</p>
                                        <div className='mt-2'>
                                            <div className='text-[16px] text-gray-600 font-semibold mb-10'>
                                                Bạn cảm thấy sản phẩm này như thế nào ? <span className="text-red-600">*</span>
                                            </div>
                                            <div>
                                                <span>
                                                    <Rate onChange={setValue} value={value} />
                                                </span>
                                            </div>
                                        </div>
                                        <hr />
                                        <h2 className='text-[15px] mt-10 my-4 font-semibold '>Bình luận</h2>

                                        <textarea onChange={handleTextAreaChange} placeholder='Bình luận tại đây' className='w-full h-[220px] py-4 mt-4 rounded-tl-2xl rounded-br-2xl border border-gray-600 px-4'></textarea>

                                        <div className='flex items-center mt-6 float-right'>
                                            <div>
                                                <ButtonSqua onClick={handelSubmitComment} children={"Gửi ngay"} className="rounded-tl-2xl rounded-br-2xl w-[100px] py-3" />
                                            </div>
                                            <div>
                                                <ButtonComponent outlineNew onClick={handleCancel} children={"Hủy"} className="rounded-tl-2xl rounded-br-2xl mx-3 w-[100px] py-3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>


                </div>
            </div>
            <hr className='my-5' />
        </div>
    )
}

export default CommentEvaluateComponent

const CommentCss = css`
.btn{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px 0;
    padding: 15px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    height: 48px;
  }
  .ant-select-selector{
    isplay: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 16px 0;
    padding: 15px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    height: 48px !important;
    border:1px solid black !important;
  }
  .ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled){
    background-color: #ffaa00 !important
  }
  .comment-star svg{
    font-size: 20px;
    color: #fadb14;
  }
  .star{
    font-size: 16px;
    color: #fadb14;
  }
  .comment-quantity{
    color: rgba(37,36,37,.5);
    display: inline-block;
    margin-top: 10px;
    font-size: 16px;
  }
`
