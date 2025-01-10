import { useState, useEffect } from 'react';
import { Select, Button, DatePicker, Row, Col, Table } from 'antd';
import { Bar, Line } from '@ant-design/plots';
import { Column } from '@ant-design/plots';
import { getAllOrder, getAllOrderByStatus } from './service/statistics.service';
import LayoutLoading from '~/app/component/stack/layout-loadding/layout-loadding.component';
import moment from 'moment';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { BiLineChart, BiLineChartDown } from "react-icons/bi"
import { getAllUser } from '../user/service/user.service';
const { Option } = Select;
const { RangePicker } = DatePicker;

const Statistical = () => {
    const [dataChart, setDataChart] = useState<any>([]);
    const [dataResponse, setDataResponse] = useState<any>()
    const [subTotal, setSubTotal] = useState<any>()
    const [subCancel, setSubCancel] = useState<any>()
    const [peopel, setPeople] = useState<any>()
    const [user, setUser] = useState<any>()
    const [user1, setUser1] = useState<any>()
    const [dataRequest, setDataRequest] = useState<any>({
        startDate: '',
        endDate: '',
        granularity: '',
    });
    const [orders, setOrders] = useState<any>([])
    const [productSalesData, setProductSalesData] = useState<any>([]);

    useEffect(() => {
        getAllUser().then((res) => {
            if (res) {
                setUser(res?.data)
            }
        })
    }, [])

    const calculateChartDataUser = () => {
        const genderUser: any = {};
        user?.forEach((item: any) => {
            const gendelData = item.gender;
            if (genderUser[gendelData]) {
                genderUser[gendelData]++;
            } else {
                genderUser[gendelData] = 1;
            }
        })
        const data = Object.keys(genderUser).map((method) => ({
            gender: method,
            count: genderUser[method],
        }));
        return data
    }

    useEffect(() => {
        setUser1(calculateChartDataUser());
    }, [user]);
    const conFig1: any = {
        data: user1,
        xField: 'count',
        yField: 'gender',
        legend: {
            position: 'top-left',
        },
        barBackground: {
            style: {
                fill: 'rgba(0,0,0,0.1)',
            },
        },
        interactions: [
            {
                type: 'active-region',
                enable: false,
            },
        ],
    };
    const calculateChartData = () => {
        const paymentMethodCounts: any = {};

        dataResponse?.orders?.forEach((order: any) => {
            const paymentMethod = order.payment_methods;
            if (order.orderStatus === 'hoàn thành') {
                if (paymentMethodCounts[paymentMethod]) {
                    paymentMethodCounts[paymentMethod]++;
                } else {
                    paymentMethodCounts[paymentMethod] = 1;
                }
            }
        });

        const data = Object.keys(paymentMethodCounts).map((method) => ({
            paymentMethod: method,
            count: paymentMethodCounts[method],
        }));

        return data;
    };


    const [data, setData] = useState<any>();
    useEffect(() => {
        setData(calculateChartData());
    }, [dataResponse?.orders]);
    const coNfig: any = {
        data,
        xField: 'count',
        yField: 'paymentMethod',
        legend: {
            position: 'top-left',
        },
        barBackground: {
            style: {
                fill: 'rgba(0,0,0,0.1)',
            },
        },
        interactions: [
            {
                type: 'active-region',
                enable: false,
            },
        ],
    };
    useEffect(() => {
        getAllOrder().then((res) => {
            const completedOrders = res.data.filter((order: any) => order.orderStatus === "hoàn thành");
            setOrders(completedOrders);
        })
    }, [])

    useEffect(() => {
        const productSales: any = {};
        orders.forEach((order: any) => {
            order.productOrder.forEach((productOrder: any) => {
                const productId = productOrder.product.name;
                const quantitySold = productOrder.quantityOrder.quantity;

                if (productSales[productId]) {
                    productSales[productId] += quantitySold;
                } else {
                    productSales[productId] = quantitySold;
                }
            });
        });
        const productSalesArray = Object.entries(productSales).map(([productId, quantity]) => ({
            productId,
            quantity,
        }));
        setProductSalesData(productSalesArray);
    }, [orders]);
    const paletteSemanticRed = '#F4664A';
    const brandColor = '#5B8FF9';
    const conFig: any = {
        data: productSalesData,
        xField: 'productId',
        yField: 'quantity',
        seriesField: '',
        color: (quantity: any) => {
            if (quantity == 1) {
                return paletteSemanticRed;
            }
            return brandColor;
        },
        label: {
            content: (originData: any) => {
                const val = parseFloat(originData.value);
                if (val < 0.05) {
                    return (val * 100).toFixed(1) + '%';
                }
            },
            offset: 10,
        },
        legend: false,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
    };

    useEffect(() => {

        console.log(orders)
        if (orders) {
            console.log(dataChart)
            handleStatistical();
            setDataRequest({
                startDate: '2023-11-19',
                endDate: '2023-12-06',
                granularity: 'day',
            })
        }

    }, [orders]);

    // useEffect(() => {
    //     getAllOrderByStatus({
    //         startDate: '2023-11-01',
    //         endDate: '2023-11-29',
    //     }).then((res) => {
    //         const orderChartData = res.data.listOrderChart;
    //         const orderData = res.data.orders.filter((order: any) => order.orderStatus === "hoàn thành");
    //         setDataResponse(res.data)
    //         const totalPrices = orderChartData.map((chartData: any) => {
    //             const date = chartData.date;
    //             const totalPrice = orderData
    //                 .filter((order: any) => order.createdAt.startsWith(date))
    //                 .reduce((total: any, order: any) => total + order.totalprice, 0);
    //             return {
    //                 date,
    //                 totalprice: totalPrice,
    //                 subtotal: chartData.subtotal
    //             };
    //         });
    //         setDataChart(totalPrices);
    //     });
    // }, []);

    const handleStatistical = async () => {
        setDataChart([]);
        const res = await getAllOrderByStatus(dataRequest);
        setDataResponse(res.data)

        if (res.data) {
            const orderChartData = res.data.listOrderChart;
            const orderData = res.data.orders;
            const completedOrders = orderData.filter((item: any) => item.orderStatus === 'hoàn thành');
            const cancelOrders = orderData.filter((item: any) => item.orderStatus === 'huỷ đơn');
            setSubTotal(completedOrders);
            setSubCancel(cancelOrders)


            const orderCounts: any = {};
            orders.forEach((order: any) => {
                const userId = order.user;
                orderCounts[userId] = (orderCounts[userId] || 0) + 1;
            });

            const sortedPeople = Object.entries(orderCounts)
                .sort((a: any, b: any) => b[1] - a[1])
                .map(([userId, orderCount]) => {
                    const userOrder = orders.find((order: any) => order.user === userId);
                    return {
                        userId,
                        fullName: userOrder?.fullname,
                        phoneNumber: userOrder?.phoneNumber,
                        district: userOrder?.district,
                        orderCount,
                    }
                })

            setPeople(sortedPeople)

            let totalPrices = [];
            if (dataRequest.granularity === 'day'
                || dataRequest.granularity === 'week'
                || dataRequest.granularity === 'month'
                || dataRequest.granularity === 'year') {
                const productSales: any = {};
                totalPrices = orderChartData.map((chartData: any) => {
                    const date = chartData.date;
                    const ordersInDay = orders.filter((order: any) => {
                        const orderDate = moment(order.createdAt).format('YYYY-MM-DD');
                        return orderDate === date;
                    })

                    ordersInDay.forEach((order: any) => {
                        order.productOrder.forEach((productOrder: any) => {
                            const productId = productOrder.product.name;
                            const quantitySold = productOrder.quantityOrder.quantity;

                            if (productSales[productId]) {
                                productSales[productId] += quantitySold;
                            } else {
                                productSales[productId] = quantitySold;
                            }
                        });
                    });
                    const productSalesArray = Object.entries(productSales).map(([productId, quantity]) => ({
                        productId,
                        quantity,
                    }));
                    setProductSalesData(productSalesArray);
                });
            }
            if (dataRequest.granularity === 'day') {
                const productSales: any = {};
                totalPrices = orderChartData.map((chartData: any) => {
                    const date = chartData.date;
                    const ordersInDay = orders.filter((order: any) => {
                        const orderDate = moment(order.createdAt).format('YYYY-MM-DD');
                        return orderDate === date;
                    });
                    const totalPrice = ordersInDay.reduce((total: any, order: any) => total + order.totalprice, 0);
                    ordersInDay.forEach((order: any) => {
                        order.productOrder.forEach((productOrder: any) => {
                            const productId = productOrder.product.name;
                            const quantitySold = productOrder.quantityOrder.quantity;

                            if (productSales[productId]) {
                                productSales[productId] += quantitySold;
                            } else {
                                productSales[productId] = quantitySold;
                            }
                        });
                    });
                    // const productSalesArray = Object.entries(productSales).map(([productId, quantity]) => ({
                    //     productId,
                    //     quantity,
                    // }));
                    // setProductSalesData(productSalesArray);

                    return {
                        date,
                        totalprice: totalPrice,
                        subtotal: chartData.subtotal,
                    };
                });
            }

            if (dataRequest.granularity === 'week') {
                totalPrices = orderChartData.map((chartData: any) => {
                    const date = chartData.date;
                    const weekNumber = moment(date, 'YYYY-MM-DD').isoWeek();
                    const ordersInWeek = orders.filter((order: any) => {
                        return moment(order.createdAt, 'YYYY-MM-DD').isoWeek() === weekNumber;
                    });
                    const totalPrice = ordersInWeek.reduce((total: any, order: any) => total + order.totalprice, 0);

                    const productSales: any = {};
                    ordersInWeek.forEach((order: any) => {
                        order.productOrder.forEach((productOrder: any) => {
                            const productId = productOrder.product.name;
                            const quantitySold = productOrder.quantityOrder.quantity;

                            if (productSales[productId]) {
                                productSales[productId] += quantitySold;
                            } else {
                                productSales[productId] = quantitySold;
                            }
                        });
                    });

                    // const productSalesArray = Object.entries(productSales).map(([productId, quantity]) => ({
                    //     productId,
                    //     quantity,
                    // }));
                    // setProductSalesData(productSalesArray);

                    return {
                        date: `Tuần ${weekNumber}`,
                        totalprice: totalPrice,
                        subtotal: chartData.subtotal,
                    };
                });
            }

            if (dataRequest.granularity === 'month') {
                totalPrices = orderChartData.map((chartData: any) => {
                    const date = chartData.date;
                    const month = moment(date, 'YYYY-MM-DD').format('MM/YYYY');
                    const ordersInMonth = orders.filter((order: any) => {
                        return moment(order.createdAt, 'YYYY-MM-DD').format('MM/YYYY') === month;
                    });
                    const totalPrice = ordersInMonth.reduce((total: any, order: any) => total + order.totalprice, 0);
                    const productSales: any = {};
                    ordersInMonth.forEach((order: any) => {
                        order.productOrder.forEach((productOrder: any) => {
                            const productId = productOrder.product.name;
                            const quantitySold = productOrder.quantityOrder.quantity;

                            if (productSales[productId]) {
                                productSales[productId] += quantitySold;
                            } else {
                                productSales[productId] = quantitySold;
                            }
                        });
                    });

                    // const productSalesArray = Object.entries(productSales).map(([productId, quantity]) => ({
                    //     productId,
                    //     quantity,
                    // }));
                    // setProductSalesData(productSalesArray);

                    return {
                        date: month,
                        totalprice: totalPrice,
                        subtotal: chartData.subtotal,
                    };
                });
            }

            if (dataRequest.granularity === 'year') {
                totalPrices = orderChartData.map((chartData: any) => {
                    const date = chartData.date;
                    const year = moment(date, 'YYYY-MM-DD').format('YYYY');
                    const ordersInYear = orders.filter((order: any) => {
                        return moment(order.createdAt, 'YYYY-MM-DD').format('YYYY') === year;
                    });
                    const totalPrice = ordersInYear.reduce((total: any, order: any) => total + order.totalprice, 0);
                    const productSales: any = {};
                    ordersInYear.forEach((order: any) => {
                        order.productOrder.forEach((productOrder: any) => {
                            const productId = productOrder.product.name;
                            const quantitySold = productOrder.quantityOrder.quantity;

                            if (productSales[productId]) {
                                productSales[productId] += quantitySold;
                            } else {
                                productSales[productId] = quantitySold;
                            }
                        });
                    });

                    // const productSalesArray = Object.entries(productSales).map(([productId, quantity]) => ({
                    //     productId,
                    //     quantity,
                    // }));
                    // setProductSalesData(productSalesArray);

                    return {
                        date: year,
                        totalprice: totalPrice,
                        subtotal: chartData.subtotal,
                    };
                });
            }
            setDataChart(totalPrices);
        }
    };

    const handleGranularityChange = (value: string) => {
        setDataRequest((prev: any) => ({
            ...prev,
            granularity: value,
        }));
    };

    const onChange = (value: any, dateString: [string, string]) => {
        setDataRequest((prev: any) => ({
            ...prev,
            startDate: dateString[0],
            endDate: dateString[1],
        }));
    };

    const config: any = {
        data: dataChart,
        padding: 'auto',
        xField: 'date',
        yField: 'totalprice',
        xAxis: {
            tickCount: 10,
        },
        legend: {
            position: 'top',
        },
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (text: any, record: any, index: any) => index + 1,
        },
        {
            title: 'Họ và Tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Số Đơn Hàng',
            dataIndex: 'orderCount',
            key: 'orderCount',
        },
    ];
    return (
        <LayoutLoading condition={orders?.length == 0}>

            <div className='py-5 sticky bg-white z-[1] top-[-24px]'>
                <Row justify='center'>

                    <Col span={6}>
                        <RangePicker format={'YYYY-MM-DD'} onChange={onChange} />
                    </Col>
                    <Col span={6}>
                        <Select
                            defaultValue="day"
                            style={{ width: 200 }}
                            onChange={handleGranularityChange}
                        >
                            <Option value="day">Ngày</Option>
                            <Option value="week">Tuần</Option>
                            <Option value="month">Tháng</Option>
                            <Option value="year">Năm</Option>
                        </Select>
                    </Col>
                    <Col span={1}>
                        <Button type='primary' onClick={handleStatistical}>
                            Thống kê
                        </Button>
                    </Col>
                </Row>
            </div>
            <div className='flex space-x-8 p-8'>

                <div className='bg-gradient-to-br from-blue-500 to-indigo-700 rounded-lg p-6 mb-8 block w-[300px] h-44'>
                    <div className='flex items-center justify-between'>
                        <div className='text-4xl text-white font-semibold'>Doanh Thu</div>
                        <div><FaMoneyCheckAlt className='text-5xl text-white' /></div>
                    </div>
                    <div className='text-white text-3xl font-bold pt-2'>
                        {dataResponse?.totalQuantity?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </div>
                </div>


                <div className='bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 mb-8 block w-[300px] h-44'>
                    <div className='flex items-center justify-between'>
                        <div className='text-4xl text-white font-semibold'>Số đơn bán được</div>
                        <div><BiLineChart className='text-5xl text-white' /></div>
                    </div>
                    <div className='text-white text-3xl font-bold pt-2'>
                        {subTotal?.length}
                    </div>
                </div>

                <div className='bg-gradient-to-br from-red-500 to-red-700 rounded-lg p-6 mb-8 block w-[300px] h-44'>
                    <div className='flex items-center justify-between'>
                        <div className='text-4xl text-white font-semibold'>Số đơn bị huỷ</div>
                        <div><BiLineChartDown className='text-5xl text-white' /></div>
                    </div>
                    <div className='text-white text-3xl font-bold pt-2'>
                        {subCancel?.length}
                    </div>
                </div>
            </div>
            <div className='chart'>
                <h1 className='py-10 font-semibold text-4xl'>Biểu đồ thống kê</h1>
                <Line {...config} />
            </div>
            <div className='py-10 my-10'>
                <h1 className='mt-10 font-semibold text-4xl'>Thống kê sản phẩm</h1>
                {productSalesData?.length == 0 ? (<div className='text-center mt-5 text-[25px]'>Không có đơn nào để thống kê sản phẩm</div>) : (<Column {...conFig} />)}

            </div>
            <div className='py-10 my-10 h-[200px]'>
                <h1 className='mt-10 font-semibold text-4xl'>Biểu đồ thống kê hình thức thanh toán</h1>
                {productSalesData?.length == 0 ? (<div className='text-center mt-5 text-[25px]'>Không có đơn nào để thống kê </div>) : (<Bar {...coNfig} />)}

            </div>
            <div className='py-10 mt-[80px] my-10 h-[200px]'>
                <h1 className='mt-10 font-semibold text-4xl'>Biểu đồ thống kê giới tính khách hàng</h1>
                {productSalesData?.length == 0 ? (<div className='text-center mt-5 text-[25px]'>Không có đơn nào để thống kê </div>) : (<Bar {...conFig1} />)}

            </div>
            <div>
                <h1 className="mt-52 font-semibold text-4xl mb-4 text-center">Bảng Xếp Hạng Khách hàng mua nhiều nhất</h1>
                <Table
                    columns={columns}
                    dataSource={peopel}
                    bordered
                    size="middle"
                    pagination={false}
                    className="ranking-table"
                />
            </div>

        </LayoutLoading>
    );
};

export default Statistical;
