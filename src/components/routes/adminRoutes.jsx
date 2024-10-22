import React from 'react'
import { Route } from "react-router-dom";
import ProtectedRoute from '../auth/ProtectedRoute';
import Dashboard from '../admin/Dashboard';
import ListProducts from "../admin/ListProdcts";
import NewAdminProduct from '../admin/NewAdminProduct';
import UpdateProduct from '../admin/UpdateProduct';
import UploadProductImages from '../admin/UploadProductImages';
import ListOrders from '../admin/ListOrders';
import ProcessOrder from '../admin/ProcessOrder';
import ListUsers from '../admin/ListUsers';
import UpdateUsers from '../admin/UpdateUsers';
import ProductReviews from '../admin/ProductReviews';

const adminRoutes = () => {
  return (
    <>
      <Route path='/admin/dashboard' element={
        <ProtectedRoute admin={true}>
          <Dashboard />
        </ProtectedRoute>
      }></Route>

      <Route path='/admin/products' element={
        <ProtectedRoute admin={true}>
          <ListProducts />
        </ProtectedRoute>
      }></Route>


      <Route path='/admin/product/new' element={
        <ProtectedRoute admin={true}>
          <NewAdminProduct />
        </ProtectedRoute>
      }></Route>

      <Route path='/admin/products/:id' element={
        <ProtectedRoute admin={true}>
          <UpdateProduct />
        </ProtectedRoute>
      }></Route>

      <Route path='/admin/products/:id/upload_images' element={
        <ProtectedRoute admin={true}>
          <UploadProductImages />
        </ProtectedRoute>
      }></Route>

      <Route path='/admin/orders' element={
        <ProtectedRoute admin={true}>
          <ListOrders />
        </ProtectedRoute>
      }></Route>

      <Route path='/admin/orders/:id' element={
        <ProtectedRoute admin={true}>
          <ProcessOrder />
        </ProtectedRoute>
      }></Route>

      <Route path='/admin/users' element={
        <ProtectedRoute admin={true}>
          <ListUsers />
        </ProtectedRoute>
      }></Route>

      <Route path='/admin/users/:id' element={
        <ProtectedRoute admin={true}>
          <UpdateUsers />
        </ProtectedRoute>
      }></Route>

      <Route path='/admin/reviews' element={
        <ProtectedRoute admin={true}>
          <ProductReviews />
        </ProtectedRoute>
      }></Route>
    </>
  )
}

export default adminRoutes