import { css } from '@emotion/react'
import { FunctionComponent, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import ItemProduct from '~/app/component/parts/itemproduct/itemproduct.component'
import { Link } from 'react-router-dom'

interface ListProductProps {
  props?: any
  data: any
}

const ListProducts: FunctionComponent<ListProductProps> = ({ data }) => {


  const numEachPage = 12;
  const [currentPage, setCurrentPage] = useState(1);


  // Tính toán phần của mảng cần hiển thị trên trang hiện tại
  const itemsPerPage = data.slice((currentPage - 1) * numEachPage, currentPage * numEachPage);

  const handleChangePaginate = (value: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setCurrentPage(value);
  };
  useEffect(()=>{
    handleChangePaginate(1)
    setCurrentPage(1);
  },[data])

  return (
    <div css={cssListProducts} className='w-[100%]'>
      <div className='grid max-sm:grid-cols-2 grid-cols-4 gap-10 p-10'>
        {itemsPerPage.map((item: any, index: number) => (
          <Link to={`/detail/${item._id}`} key={index}>
            <ItemProduct itemProduct={item} />
          </Link>
        ))}
      </div>
      <div className='w-[100%] text-center'>
        <Pagination defaultPageSize={numEachPage} onChange={handleChangePaginate} defaultCurrent={currentPage} total={data.length} />
      </div>
    </div>
  );
};

export default ListProducts;
const cssListProducts = css`

.select-title{
    min-width: 240px;
    width: 100%;
    min-height: 50px;
    border: 1px solid #E7E8E9;
    border-radius: 24px;
    padding: 4px 20px 12px 16px;    
    position: relative;
    display: block;
}
.arrange-title{
    l
}
`
