import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserHeader from '../../UserHeader';
import Footer from '../../footer';
import { useNavigate } from 'react-router-dom';

const UserOrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalAmounts, setTotalAmounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/order/orders/show');
        if (response.data.success) {
          setOrders(response.data.OrderShow || []);
        } else {
          setErrorMessage(response.data.message || "Failed to fetch orders");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching orders");
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const calculatedTotalAmounts = orders.map(order => {
      const productTotal = order.Product.reduce((acc, product) => {
        const priceValue = typeof product.price === 'string'
          ? parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
          : product.price || 0;
        return acc + priceValue * product.quantity;
      }, 0);

      const deliveryPricing = parseFloat(order.DeliveryPricing) || 0;
      return (productTotal + deliveryPricing).toFixed(2);
    });

    setTotalAmounts(calculatedTotalAmounts);
  }, [orders]);

  const storedUserData = localStorage.getItem('userdata');
  const userdata = storedUserData ? JSON.parse(storedUserData) : null;

  const filteredOrders = userdata
    ? orders.filter(order =>
      order.email === userdata.email &&
      (order.orderId.includes(searchQuery) || order.DeliveryStatus.includes(searchQuery))
    )
    : [];

  return (
    <>
      <UserHeader />
      <div className=" bg-gray-50 pl-20 pr-16 pt-4 pb-4 mb-4">
        {/* User Info Section */}
        <div className="flex items-center gap-4 bg-pink-300 rounded shadow p-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-300">
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQGhYPSmz_u4ZA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730441088583?e=1735776000&v=beta&t=XmA39x9gU44NSNEESpiDUIKyXAu9MZQNn3SFf4280VQ" alt="User profile" className="rounded-full w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-lg font-bold">{userdata?.name}</div>
            <div className="text-gray-500">{userdata?.email}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {/* Order History Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Order History</h2>
          <div>
            <table className="min-w-full mt-4 bg-white border border-gray-300">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">Delivery Status</th>
                  <th className="py-2 px-4">Total Amount</th>
                  <th className="py-2 px-4">Payment Method</th>
                  <th className="py-2 px-4">Created At</th>
                  <th className="py-2 px-4">Delivered Date</th>
                  <th className="py-2 px-4">Invoice</th>

                </tr>
              </thead>
              <tbody>

                {filteredOrders && filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr key={order._id} className="border-b text-center">
                      <td className="py-2 px-4">{order.orderId}</td>
                      <td className="py-2 px-4">{order.DeliveryStatus}</td>
                      <td className="py-2 px-4">
                        ${((parseFloat(order.TotalAmount) || 0) + (parseFloat(order.DeliveryPricing) || 0)).toFixed(2)}
                      </td>
                      <td className="py-2 px-4">{order.PaymentMethod}</td>
                      <td className="py-2 px-4">{new Date(order.createdAt).toLocaleString()}</td>
                      <td className="py-2 px-4">{order.DeliveredDate}</td>
                      {
                        order.DeliveryStatus === "Delivered" ? (
                          <td className="py-2 px-4 bg-green-300">
                            <button onClick={() => navigate(`/Invoice/${order.orderId}`)}>Download Invoice</button>
                          </td>
                        ) : (
                          <td className="py-2 px-4 bg-yellow-300">{order.DeliveryStatus}</td>
                        )
                      }
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7" className="text-center py-2">You don't have any data</td></tr>
                )}

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserOrderTracking;
