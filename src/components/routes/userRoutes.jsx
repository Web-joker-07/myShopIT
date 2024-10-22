import React from 'react';
import { Route } from "react-router-dom";
import Home from '../Home';
import ProductDetails from '../Products/ProductDetails';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Profile from "../user/Profile";
import UpdateProfile from '../user/UpdateProfile';
import ProtectedRoute from '../auth/ProtectedRoute';
import UploadAvatar from '../user/UploadAvatar';
import UpdatePassword from '../user/UpdatePassword';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import Cart from '../cart/Cart';
import ShippingInfo from '../cart/ShippingInfo';
import ConfirmOrder from '../cart/ConfirmOrder';
import PaymentMethod from '../cart/PaymentMethod';
import MyOrders from '../orders/MyOrders';
import OrderDetails from '../orders/OrderDetails';
import Invoice from '../invoice/Invoice';

const userRoutes = () => {
    return (
        <>
            <Route path='/' element={<Home />}></Route>
            <Route path='/products/:id' element={<ProductDetails />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>

            <Route path='/me/profile' element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            }></Route>

            <Route path='/me/update_profile' element={
                <ProtectedRoute>
                    <UpdateProfile />
                </ProtectedRoute>
            }></Route>

            <Route path='/me/upload_avatar' element={
                <ProtectedRoute>
                    <UploadAvatar />
                </ProtectedRoute>
            }></Route>


            <Route path='/me/update_password' element={
                <ProtectedRoute>
                    <UpdatePassword />
                </ProtectedRoute>
            }></Route>

            <Route path='/password/forgot' element={
                <ForgotPassword />
            }></Route>

            <Route path='/password/reset/:token' element={
                <ResetPassword />
            }></Route>

            <Route path='/cart' element={
                <Cart />
            }></Route>

            <Route path='/shipping' element={
                <ProtectedRoute>
                    <ShippingInfo />
                </ProtectedRoute>}>
            </Route>

            <Route path='/confirm_order' element={
                <ProtectedRoute>
                    <ConfirmOrder />
                </ProtectedRoute>}>
            </Route>

            <Route path='/payment' element={
                <ProtectedRoute>
                    <PaymentMethod />
                </ProtectedRoute>}>
            </Route>

            <Route path='/me/orders' element={
                <ProtectedRoute>
                    <MyOrders />
                </ProtectedRoute>}>
            </Route>

            <Route path='/me/orders/:id' element={
                <ProtectedRoute>
                    <OrderDetails />
                </ProtectedRoute>}>
            </Route>


            <Route path='/invoice/orders/:id' element={
                <ProtectedRoute>
                    <Invoice />
                </ProtectedRoute>}>
            </Route>
        </>
    )
}

export default userRoutes