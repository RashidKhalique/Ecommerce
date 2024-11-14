import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Reusable InputField component
const InputField = ({ id, label, type = "text", value, onChange, placeholder, ...rest }) => (
  <div className="mb-5">
    <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      {...rest}
    />
  </div>
);

const CouponManager = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");

  // Fetch products only once (no dependency on products list)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product/show");
        setProducts(response.data.existProduct || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch coupons only once (no dependency on products)
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/discount/coupon");
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const addCoupon = async (code, discountValue, expirationDate, productId) => {
    const newCoupon = {
      code,
      discountValue,
      expirationDate,
      productId,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/discount/coupon", newCoupon);

      if (response.data.success) {
        toast.success(response.data.message);
        setCoupons([...coupons, response.data.coupon]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding coupon:", error);
      toast.error("An error occurred while adding the coupon.");
    }
  };

  // Remove a coupon via the API
  const removeCoupon = async (code) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/discount/coupon/${code}`);
      if (response.data.success) {
        setCoupons(coupons.filter((coupon) => coupon.code !== code));
        toast.info(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error removing coupon:", error);
      toast.error("An error occurred while removing the coupon.");
      window.location.reload();
    }
  };

  // Check if coupon is expired
  const isCouponExpired = (expirationDate) => {
    return dayjs(expirationDate).isBefore(dayjs());
  };

  // Handle form submit to add coupon
  const handleAddCouponSubmit = (e) => {
    e.preventDefault();
    addCoupon(couponCode, discountValue, expirationDate, selectedProductId);
    setShowPopup(false); // Close the popup after adding coupon
  };

  return (
    <>
      <Nav />
      <div className="flex-1 ml-[270px] p-6 bg-gradient-to-b from-blue-50 to-white">
        <div>
        <h2 className="text-2xl font-bold mb-4">Coupon Manager</h2>
  
  {/* Add Coupon Button */}
  <div className="flex justify-end mb-4"> {/* Flex container for left-alignment */}
    <button
      onClick={() => setShowPopup(true)}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Add Coupon
    </button>
  </div>
        </div>
      
  
        {/* Popup Form */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-sm mx-4 sm:mx-auto">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Coupon</h3>
              <form onSubmit={handleAddCouponSubmit}>
                <InputField
                  id="couponCode"
                  label="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon Code"
                  required
                />
  
                {/* Select Product Dropdown */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="options">
                    Select Product
                  </label>
                  <select
                    id="options"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a Product</option>
                    {Products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name || "Unnamed Product"}
                      </option>
                    ))}
                  </select>
                </div>
  
                <InputField
                  id="discountValue"
                  label="Discount Value (%)"
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder="Enter Discount Percentage"
                  min="1"
                  max="100"
                  required
                />
  
                <InputField
                  id="expirationDate"
                  label="Expiration Date"
                  type="datetime-local"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  required
                />
  
                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                    disabled={!selectedProductId} // Disable button if no product selected
                  >
                    Add Coupon
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
  
        {loading && <div className="text-center">Loading...</div>}
  
        {/* Table of Coupons */}
        {coupons.length === 0 ? (
          <p className="text-center">No coupons available.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 border-b">Coupon Code</th>
                <th className="px-4 py-2 border-b">Discount (%)</th>
                <th className="px-4 py-2 border-b">Expires On</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr
                  key={coupon.code} // Adding the key prop here
                  className={isCouponExpired(coupon.expirationDate) ? "bg-red-100" : "bg-green-100"}
                >
                  <td className="px-4 py-2 border-b">{coupon.code}</td>
                  <td className="px-4 py-2 border-b">{coupon.discountValue}%</td>
                  <td className="px-4 py-2 border-b">
                    {dayjs(coupon.expirationDate).format("MMMM D, YYYY")}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span
                      className={`${
                        isCouponExpired(coupon.expirationDate) ? "text-red-600" : "text-green-600"
                      } font-semibold`}
                    >
                      {isCouponExpired(coupon.expirationDate) ? "Expired" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => removeCoupon(coupon._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </>
  );
  
};

export default CouponManager;
