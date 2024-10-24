import React, { useEffect } from 'react';
import { MDBDataTable } from "mdbreact";
import { useMyOrdersQuery } from '../../redux/api/orderApi';
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import MetaData from "../layout/MetaData"
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cartSlice';

const MyOrders = () => {

    const [searchParams] = useSearchParams();
    const { data, isLoading, error } = useMyOrdersQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const order_success = searchParams.get("order_success");


    useEffect(()=>{
        if(error){
            toast.error(error?.data?.message || "An Error Occurred");
        }
        if(order_success){
            dispatch(clearCart());
            navigate("/me/orders");
        }
    },[error,order_success])


    if (isLoading) return <Loader />;

    const setOrders = () => {
        // Create the orders object here
        const orders = {
            columns: [
                {
                    label : "ID",
                    field : "id",
                    sort : "asc"
                },
                {
                    label : "Amount Paid",
                    field : "amount",
                    sort : "asc"
                },
                {
                    label : "Payment Status",
                    field : "status",
                    sort : "asc"
                },
                {
                    label : "Order Status",
                    field : "orderStatus",
                    sort : "asc"
                },
                {
                    label : "Actions",
                    field : "actions",
                    sort : "asc"
                }
            ],
            rows: [],
        };

        data?.order?.forEach((order)=>{
            orders.rows.push({
                id : order?._id,
                amount : order?.totalAmount.toFixed(2),
                status : order?.paymentInfo.status,
                orderStatus : order?.orderStatus,
                actions : (
                    <>
                    <Link to={`/me/orders/${order?._id}`} className="btn btn-primary">
                        <i className='fa fa-eye'></i>
                    </Link>
                    <Link to={`/invoice/orders/${order?._id}`} className='btn btn-success ms-2'>
                        <i className='fa fa-print'></i>
                    </Link>
                    </>
                )
            })
        })

        return orders; 
    };

    return (
        <>
            <MetaData title={"My Orders"}/>
            <h1 className='my-5'>{data?.order?.length} Orders</h1>
            <MDBDataTable
                data={setOrders()}
                className='px-3'
                bordered
                striped
                hover
            />
        </>
    );
};

export default MyOrders;
