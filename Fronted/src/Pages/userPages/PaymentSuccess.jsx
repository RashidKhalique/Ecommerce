import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const updatedId = `${id}`;
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/order/orders/show');

        if (response.data.success) {
          const filteredOrders = response.data.OrderShow.filter(order => order._id === updatedId);
          
          setOrders(filteredOrders);
        } else {
          setErrorMessage("No orders found.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching orders");
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrder();
  }, [updatedId]);

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-center">
          <div className="text-green-500 text-5xl mb-4">✔</div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">Payment Successful!</h1>
        
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="mb-2"><strong>Order ID:</strong> {order.orderId}</p>
              <p className="mb-2"><strong>Customer:</strong> {order.Customer}</p>
              <p className="mb-2"><strong>Email:</strong> {order.email}</p>
              <p className="mb-2"><strong>Delivery Pricing:</strong> ${(order.DeliveryPricing || 0).toFixed(2)}</p>
              <p className="mb-2"><strong>Delivery Status:</strong> {order.DeliveryStatus}</p>
              <p className="mb-2"><strong>Payment Method:</strong> {order.PaymentMethod}</p>

              <h3 className="font-semibold mt-4">Products:</h3>
              {order.Product.map((product) => (
                <div key={product.id} className="flex justify-between mb-2">
                  <span>{product.name} (x{product.quantity || 1})</span>
                  <span>${(product.price * (product.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}

              <div className="flex justify-between font-bold">
              <span>Coupon Amount:</span>
              <span>${order.CouponAmount}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Amount:</span>
                <span>${order.TotalAmount}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No order found for this ID. {updatedId}</p>
          
        )}
        
        <p className="text-center text-gray-500 mt-4">Please wait for some time for the amount to show up in your account.</p>
        <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" onClick={()=>{navigate('/')}}>Back Home</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
