import React, { useEffect } from 'react';
import MetaData from "../layout/MetaData"
import Loader from '../layout/Loader';
import { useOrderDetailsQuery } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrderDetails = () => {

    const params = useParams()
    const { data, isLoading, error } = useOrderDetailsQuery(params?.id);

    const order = data?.order || {};

    const { orderItems, orderStatus, paymentMethod, paymentInfo, totalAmount, shippingInfo } = order;

    const { user } = useSelector((state) => state.auth);

    console.log(order)


    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "An Error Occurred");
        }
    }, [error])


    if (isLoading) return <Loader />;

    return (
        <>
            <MetaData title={"Order Details"} />
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-9 mt-5 order-details">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mt-5 mb-4">Your Order Details</h3>
                        <Link className="btn btn-success" to={`/invoice/orders/${order?._id}`}>
                            <i className="fa fa-print"></i> Invoice
                        </Link>
                    </div>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">ID</th>
                                <td>{order?._id}</td>
                            </tr>
                            <tr>
                                <th scope="row">Status</th>
                                <td className={orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                                    <b>{orderStatus}</b>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Date</th>
                                <td>{order?.createdAt.substring(0, 10)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="mt-5 mb-4">Shipping Info</h3>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">Name</th>
                                <td>{user?.name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Phone No</th>
                                <td>{shippingInfo?.phoneNo}</td>
                            </tr>
                            <tr>
                                <th scope="row">Address</th>
                                <td>{shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode}, {shippingInfo?.country}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="mt-5 mb-4">Payment Info</h3>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">Status</th>
                                <td className={paymentInfo?.status === "paid" ? "greenColor" : "redColor"}>
                                    <b>{paymentInfo?.status}</b>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Method</th>
                                <td>{paymentMethod}</td>
                            </tr>
                            <tr>
                                <th scope="row">Stripe ID</th>
                                <td>{paymentInfo?.id ? paymentInfo?.id : "Nill"}</td>
                            </tr>
                            <tr>
                                <th scope="row">Amount Paid</th>
                                <td>${totalAmount.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="mt-5 my-4">Order Items:</h3>

                    <hr />

                    {orderItems?.map((item,index) => {
                        return <>
                            <div className="cart-item my-1" key={index}>
                                <div className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <img
                                            src={item.image}
                                            alt={item?.name}
                                            height="45"
                                            width="65"
                                        />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <Link to={`/products/${item?.product}`}>{item?.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>${item?.price}</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{item?.quantity} Piece(s)</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </>
                    })}

                </div>
            </div>
        </>
    )
}

export default OrderDetails