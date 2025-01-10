export const getListColor = (productDetail: any, type?: any) => {
  let arrayQuantityTranform
  if (type == 'cart') {
    arrayQuantityTranform = productDetail?.product?.listQuantityRemain
  } else {
    arrayQuantityTranform = productDetail?.listQuantityRemain
  }
  const _temp: any = []
  const tempColor = arrayQuantityTranform?.reduce((acc: any[], item: any) => {
    const findElement = _temp?.find((itemFind: any) => itemFind.nameColor == item.nameColor)
    if (findElement) {
      const index = acc.findIndex((itemIndex) => itemIndex.nameColor == findElement.namecolor)
      const indexTemp = _temp.findIndex((itemIndex: any) => itemIndex.nameColor == findElement.namecolor)
      _temp[indexTemp] = {
        ...findElement
      }
      acc[index] = {
        id: findElement._id,
        colorHex: findElement.colorHex,
        nameColor: findElement.nameColor,
        quantity: findElement.quantity + item.quantity
      }
    } else {
      _temp.push(item)
      acc.push({
        quantity: item.quantity,
        colorHex: item.colorHex,
        nameColor: item.nameColor,
        id: item._id
      })
    }
    return acc
  }, [])
  return tempColor
}

export const getListSize = (productDetail: any, type?: any) => {
  let arrayQuantityTranform
  if (type == 'cart') {
    arrayQuantityTranform = productDetail?.product?.listQuantityRemain
  } else {
    arrayQuantityTranform = productDetail?.listQuantityRemain
  }
  const _temp: any = []

  const tempSize = arrayQuantityTranform?.reduce((acc: any[], item: any) => {
    const findElement = _temp?.find((itemFind: any) => itemFind.nameSize == item.nameSize)
    if (findElement) {
      const index = acc.findIndex((itemIndex) => itemIndex.nameSize == findElement.nameSize)
      const indexTemp = _temp.findIndex((itemIndex: any) => itemIndex.nameSize == findElement.nameSize)
      _temp[indexTemp] = {
        ...findElement
      }

      acc[index] = {
        id: findElement._id,
        nameSize: findElement.nameSize,
        quantity: findElement.quantity + item.quantity
      }
    } else {
      _temp.push(item)
      acc.push({
        quantity: item.quantity,
        nameSize: item.nameSize,
        id: item._id
      })
    }
    return acc
  }, [])
  return tempSize
}
