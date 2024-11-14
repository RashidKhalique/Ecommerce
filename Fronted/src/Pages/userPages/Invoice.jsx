import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoice = () => {
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/order/orders/show');
        if (response.data.success) {
          setOrder(response.data.OrderShow[0]); // Assuming you want the first order
        } else {
          setErrorMessage(response.data.message || "Failed to fetch order");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching order");
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, []);

  const handleDownload = () => {
    const input = document.getElementById('invoice');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('invoice.pdf');
    });
  };

  if (!order) {
    return <div className="text-center">Loading...</div>;
  }

  const { orderId, Customer, email, Product, DeliveryPricing, DeliveredDate, PaymentMethod } = order;

  // Calculate subtotal, tax, and total
  const subtotal = Product.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * 0.10; // Assuming 10% tax
  const total = subtotal + tax + DeliveryPricing;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg" id="invoice">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Invoice</h1>
          <p className="text-gray-600">Invoice #: {orderId}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
          <p className="text-gray-600">Due Date: {new Date(DeliveredDate).toLocaleDateString()}</p>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Billing Information</h2>
        <p className="text-gray-700">Name : {Customer}</p>
        <p className="text-gray-700">Email: {email}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Itemized Charges</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Item</th>
              <th className="py-2 px-4 border-b">Unit Price</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {Product.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">${item.price.toFixed(2)}</td>
                <td className="py-2 px-4">${item.price.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td className="py-2 px-4 font-semibold" colSpan="2">Subtotal</td>
              <td className="py-2 px-4">${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold" colSpan="2">Tax (10%)</td>
              <td className="py-2 px-4">${tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold" colSpan="2">Delivery Pricing</td>
              <td className="py-2 px-4">${DeliveryPricing.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold" colSpan="2">Total</td>
              <td className="py-2 px-4 text-lg font-bold">${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </section>

      <footer className="text-center mt-8">
        <p className="text-gray-600">Thank you for your business!</p>
        <p className="text-gray-600">Please make payment via: {PaymentMethod}</p>
      </footer>

      <div className="mt-6 text-center">
        <button
          onClick={handleDownload}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
