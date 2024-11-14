import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Nav';
import axios from 'axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [deliveredDate, setDeliveredDate] = useState("");

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

  const handleStatusChange = (orderId) => {
    const order = orders.find(order => order.orderId === orderId);
    setSelectedOrder(orderId);
    setNewStatus(order ? order.DeliveryStatus : "");
    setDeliveredDate(order ? order.DeliveredDate || "" : "");
    setModalVisible(true);
  };

  const updateStatus = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/order/orders/updateorder`, {
        orderId: selectedOrder,
        DeliveryStatus: newStatus,
        DeliveredDate: deliveredDate,
      });

      if (response.data.success) {
        setOrders(orders.map(order => 
          order.orderId === selectedOrder ? { ...order, DeliveryStatus: newStatus, DeliveredDate: deliveredDate } : order
        ));

        // Send email if status is "Delivered"
        if (newStatus === "Delivered") {
          await sendEmailNotification(response.data.order); // Use the updated order data
        }

        setModalVisible(false);
        setNewStatus("");
        setDeliveredDate("");
      } else {
        setErrorMessage(response.data.message || "Failed to update status");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the status");
      console.error('Error updating status:', error);
    }
  };

  const sendEmailNotification = async (order) => {
    try {
      const response = await axios.post('http://localhost:3000/api/product/send-email', {
        to: order.email,
        subject: 'Your Order has been Delivered!',
        text: `Your order with ID ${order.orderId} has been delivered on ${deliveredDate}. Thank you for shopping with us!`,
        html: `<p>Your order with ID <strong>${order.orderId}</strong> has been delivered on <strong>${deliveredDate}</strong>.</p><p>Thank you for shopping with us!</p>`
      });

      if (response.data.success) {
        console.log('Email sent successfully:', response.data);
      } else {
        console.error('Failed to send email:', response.data.message);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/order/orders/delete/${id}`);
      if (response.data.success) {
        setOrders(orders.filter(order => order.orderId !== id));
      } else {
        setErrorMessage(response.data.message || "Failed to delete order");
      }
    } catch (error) {
      setErrorMessage("An error occurred while deleting the order");
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      <Nav />
      <div className="flex-1 ml-[270px] p-6">
        <h2 className="text-3xl font-semibold mb-6">Order Management</h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <div className="bg-white shadow-md rounded overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-gray-600">OrderId</th>
                <th className="py-2 px-4 text-gray-600">Customer</th>
                <th className="py-2 px-4 text-gray-600">Email</th>
                <th className="py-2 px-4 text-gray-600">Delivery Date</th>
                <th className="py-2 px-4 text-gray-600">Product Price</th>
                <th className="py-2 px-4 text-gray-600">Delivery Status</th>
                <th className="py-2 px-4 text-gray-600">Delivered Date</th>
                <th className="py-2 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="py-2 px-4">{order.orderId}</td>
                  <td className="py-2 px-4">{order.Customer}</td>
                  <td className="py-2 px-4">{order.email}</td>
                  <td className="py-2 px-4">{order.DeliveryDate || "Not Available"}</td>
                  <td className="py-2 px-4">${order.Product.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0).toFixed(2)}</td>
                  <td className="py-2 px-4 text-green-500">{order.DeliveryStatus}</td>
                  <td className="py-2 px-4">{order.DeliveredDate || "Not Delivered"}</td>
                  <td className="py-2 px-4 space-x-2">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleStatusChange(order.orderId)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="text-red-500 cursor-pointer"
                      onClick={() => deleteOrder(order.orderId)}
                    />
                  </td>
                </tr>
              ))}
              {orders.length === 0 && !errorMessage && (
                <tr>
                  <td colSpan="8" className="py-2 px-4 text-center">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-4">Update Delivery Status</h3>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border rounded w-full p-2 mb-4"
              >
                <option value="" disabled>Select Delivery Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
              </select>
              <input
                type="date"
                value={deliveredDate}
                onChange={(e) => setDeliveredDate(e.target.value)}
                className="border rounded w-full p-2 mb-4"
                placeholder="Enter delivered date"
              />
              <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={updateStatus}>
                  Update
                </button>
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setModalVisible(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
