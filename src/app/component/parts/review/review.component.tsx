import React, { useEffect } from 'react'
import StarComponent from '../star/star.component'
import { useParams } from 'react-router-dom'
import { useCommentRedux } from '~/app/modules/client/redux/hook/useCommentReducer'

const ReviewComponent = () => {
    let { id } = useParams()
    const { data: {comments}, actions: commentActions } = useCommentRedux()
    useEffect(() => {
        commentActions.getAllComments(id)
    }, [id])
    return (
        <div>
            {comments?.map((item: any, index: any) => (
                <div>
                    <div className='flex justify-between mt-5 ' key={index + 1}>
                        <div className='w-fulll py-2'>
                            <div className='flex items-center py-2'>
                                <div >
                                    <h2 className='font-semibold'>{item?.userId?.fullname}</h2>
                                </div>
                                <div className='px-5'>
                                    <p>{item.star == "1" && <StarComponent/>}</p>
                                    <p>{item.star == "2" && <p className='flex'><StarComponent/><StarComponent/></p>}</p>
                                    <p>{item.star == "3" && <p className='flex'><StarComponent/><StarComponent/><StarComponent/></p>}</p>
                                    <p>{item.star == "4" && <p className='flex'><StarComponent/><StarComponent/><StarComponent/><StarComponent/></p>}</p>
                                    <p>{item.star == "5" && <p className='flex'><StarComponent/><StarComponent/><StarComponent/><StarComponent/><StarComponent/></p>}</p>
                                </div>
                            </div>
                            <div className=''>
                                <p className='text-gray-600 mt-3 mb-3 py-2'>
                                    {item?.comment}
                                </p>

                                <em className='text-[13px] font-mono font-bold'>
                                    by {item?.createdAt}
                                </em>

                            </div>
                        </div>

                    </div>
                    <hr className='mt-4 ' />
                </div>
            ))}

        </div>
    )
}

export default ReviewComponent