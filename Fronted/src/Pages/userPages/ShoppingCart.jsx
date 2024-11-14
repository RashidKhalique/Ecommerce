import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import UserHeader from '../../UserHeader.jsx';
import Footer from '../../footer.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51Q9hCRKrBgfqkwHlJdKP4yOrs58p0CUmE8lT6jP8WFQB9sxlnar5ZrGpWvlN0FfPNWTJyuYqs4OTlAzybdbCCkph00G2pdCHrH');
const CheckoutModal = ({ isOpen, onClose, cartItems, totalPrice, discount, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [couponCode, setCouponCode] = useState('');  // Use string to store coupon code
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

 
  
  const handleCouponApply = async () => {
    if (!couponCode) {
      toast.error('Please enter a coupon code');
      return;
    }
  
    setCouponDiscount(0); // Reset discount when applying a new coupon
  
    try {
      let totalCouponDiscount = 0;
      let success = false;
  
      // Loop through each item in the cart
      for (let item of cartItems) {
        if (item._id) {
          try {
            const response = await axios.post('http://localhost:3000/api/discount/coupon/validate', {
              code: couponCode,
              productIds: [item._id], // Send an array of productIds, even if it contains only one
            });
  
            if (response.data.success) {
              const productDiscountAmount = response.data.discount.discountValue / 100;
              totalCouponDiscount += item.price * item.quantity * productDiscountAmount ; // Apply coupon per product quantity
              
              success = true;
            }
          } catch (err) {
      
            toast.error('Coupon is not valid for any of the products in your cart.');

          }
        }
      }
  
      // If any valid discount was found, update the state
      if (success) {
        setCouponDiscount(totalCouponDiscount);
        toast.success(`Coupon applied successfully! You saved $${totalCouponDiscount.toFixed(2)}`);
      } else {
        toast.error('Coupon is not valid for any of the products in your cart.');
      }
    } catch (err) {
      console.error('Error applying coupon:', err);
      toast.error('An error occurred while applying the coupon. Please try again.');
    }
  };
  
  
  

  const token = localStorage.getItem('token');
  const finalTotal = totalPrice - couponDiscount + (totalPrice > 1000 ? 0 : discount) + (totalPrice * 0.04); // Tax calculation


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = JSON.parse(localStorage.getItem("userdata") || '{}');
    const id = `ORDER_${Date.now()}`;

    const submitOrder = async () => {
      const orderData1 = {
        orderId: id,
        Customer: userdata.name,
        email: userdata.email,
        Product: cartItems.map(item => ({
          id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        DeliveryPricing: totalPrice > 1000 ? 0 : discount,
        TotalAmount: finalTotal - (totalPrice > 1000 ? 0 : discount),
        DeliveryStatus: "Pending",
        PaymentMethod: "Stripe",
        CouponAmount: couponDiscount,
      };

      try {
        const response = await axios.post('http://localhost:3000/api/order/orders', orderData1, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Order response:', response.data);
        localStorage.setItem("cart", JSON.stringify([]));
        toast.success("Order Successfully placed");
      } catch (error) {
        console.error('Error submitting order:', error);
        setErrorMessage(error.message || 'Failed to submit order. Please try again.');
      }
    };

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    try {
      await submitOrder();
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://localhost:5173/PaymentSuccess/${id}`,
        },
      });
      toast.success("Payment Successful");
    } catch (error) {
      setErrorMessage(error.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-50 p-8 max-w-4xl mx-auto relative rounded shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-xl font-bold">X</button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
            <ul>
              {cartItems.map(item => (
                <li key={item._id} className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <img src={item.imageurl} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                    <span>{item.name}</span>
                  </div>
                  <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </li>
              ))}
              <li className="flex justify-between items-center mb-4">
                <span>Coupon Discount</span>
                <span>-${couponDiscount.toFixed(2)}</span>
              </li>
              <li className="flex justify-between items-center font-semibold text-lg">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </li>
            </ul>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="mt-4 p-2 border rounded"
            />
            <button onClick={()=>{handleCouponApply()}} className="mt-2 w-full bg-blue-600 text-white py-2 rounded">Apply Coupon</button>
            <p className="text-sm text-gray-500">Estimated delivery: 3-5 business days</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Your Payment Details</h2>
            {clientSecret ? (
              <form onSubmit={handleSubmit}>
                <PaymentElement />
                <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded" type="submit" disabled={!stripe || loading}>
                  {loading ? 'Processing...' : 'Pay Now'}
                </button>
                {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
              </form>
            ) : (
              <div>Loading payment details...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    const parsedCartItems = cartData ? JSON.parse(cartData) : [];
    setCartItems(parsedCartItems);
    calculateTotal(parsedCartItems);
    const user = JSON.parse(localStorage.getItem('userdata')) || { name: "Guest" };
    setUserData(user);
  }, []);

  const calculateTotal = (items) => {
    let subtotal = 0;
  
    // Ensure all items have valid price and quantity
    items.forEach(item => {
      const price = item.price || 0; // Default to 0 if price is invalid
      const quantity = item.quantity || 1; // Default to 1 if quantity is invalid
      const discount = item.discount || 0; // Default to 0 if discount is invalid
  
      // Ensure the price and quantity are numbers
      if (typeof price === 'number' && typeof quantity === 'number') {
        subtotal += (price * quantity) - discount;
      }
    });
  
    setTotalPrice(subtotal);
  
    // Calculate the discount (e.g., if subtotal is above $1000)
    const discountAmount = subtotal > 1000 ? 0 : subtotal * 0.10;
    setDiscount(discountAmount);
  };
  
  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map(item =>
      item._id === id ? { ...item, quantity: parseInt(quantity, 10) || 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart); // Recalculate total to ensure correct pricing.
  };
  

  const handleCheckout = async () => {
    // Get token and cart from localStorage
    const token = localStorage.getItem("token");
    const cart = localStorage.getItem("cart");
  
    // Check if user is logged in
    if (!token) {
      navigate('/login');
      toast.info("Login Before checkout or Place order");
      return; // Stop further execution
    }
  
    // Check if cart is empty

    // Fetch client secret if it hasn't been set
    if (!clientSecret) {
   
    
      try {
        const response = await fetch('http://localhost:3000/api/product/stripe-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: totalPrice, user: userData }),
        });
        
        const responseData = await response.json();
  
        if (responseData.clientSecret) {
          setClientSecret(responseData.clientSecret);
        } else {
          navigate('/ProductStore');
          toast.info("Before checkout must add to cart");
        }
      } catch (error) {
        toast.info(`error`);
      }
    }
    if (cart) {
      setIsCheckoutOpen(true);
    }
   


    // Open the checkout modal/dialog

  
  };
  
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div>
      <UserHeader />
      <div className="max-w-7xl mx-auto pl-20 pr-16 pt-4 pb-4 mb-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between border p-4">
                  <img src={item.imageurl} alt={item.name} className="w-20 h-20 object-cover" />
                  <div className="flex-1 mx-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-800">${item.price * (item.quantity || 1) - item.discount }</p>
                    <label htmlFor=""> Quantity : </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                      className="mt-2 w-16 p-1 border rounded items-center"
                    />
                  </div>
                  <button className="ml-4 text-red-600" onClick={() => handleRemoveItem(item._id)}>Remove</button>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="border p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping estimate</span>
                <span>${totalPrice > 1000 ? '0.00' : discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax estimate</span>
                <span>${(totalPrice * 0.04).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold">
                <span>Order total</span>
                <span>${(totalPrice + (totalPrice > 1000 ? 0 : discount) + totalPrice * 0.04).toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md">Checkout</button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            cartItems={cartItems}
            totalPrice={totalPrice}
            discount={discount}
            clientSecret={clientSecret}
          />
        </Elements>
      )}

      <Footer />
    </div>
  );
};

export default ShoppingCart;