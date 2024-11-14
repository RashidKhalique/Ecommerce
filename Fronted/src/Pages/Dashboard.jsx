import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCoins, faUtensils, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import Nav from '../Nav';

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [shows, setShows] = useState(null);  
  const [totalOrders, setTotalOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [weekrecord, setWeekRecord] = useState(null);

  useEffect(() => {
    if (shows) {
      setTotalOrders(shows.TotalOrder || 0);
      setDeliveredOrders(shows.DeliveredOrders || 0);
      setPendingOrders(shows.PendingOrders || 0);
    }
  }, [shows]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/product/showuser');
        setUsers(response.data.usera || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const allFetch = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/discount/all');
        if (response.data.success) {
          setShows(response.data); // Set shows to the data
        } else {
          console.error('Failed to load products');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    allFetch();
  }, []);

  useEffect(() => {
    const weekDataFetch = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/order/alldaysdata');
        if (response.data.success) {
          // Process the week data
          const weekData = processWeekData(response.data.data);
          setWeekRecord(weekData); // Set week data to the state
        } else {
          console.error('Failed to load week data');
        }
      } catch (err) {
        console.error('Error fetching week data:', err);
      }
    };

    weekDataFetch();
  }, []);

  // Process API data to fit the 7 days of the week
  const processWeekData = (data) => {
    const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const revenue = new Array(7).fill(0);
    const sale = new Array(7).fill(0);

    data.forEach(item => {
      const date = new Date(item.date);
      const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const dayIndex = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Adjust Sunday (0) to last day (6)
      revenue[dayIndex] = item.revenue;
      sale[dayIndex] = item.sale;
    });
console.log(`Rev : ${revenue} , Sale : ${sale}`);

    return { revenue, sale };
  };

  const barChartData = weekrecord ? {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sale',
        data: weekrecord.sale,
        backgroundColor: '#4F46E5',
      },
      {
        label: 'Revenue',
        data: weekrecord.revenue,
        backgroundColor: ' #34D399',
       
      },
    ],
  } : null;

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Pie Chart Data Example
  const pieChartData = {
    labels: ['Total', 'Delivered', 'Pending'],
    datasets: [
      {
        label: 'Order Status',
        data: [totalOrders, deliveredOrders, pendingOrders],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };


  return (
    <main>
      <div id="main-wrapper" className="flex">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 h-screen w-[270px] border-r-[1px] border-gray-400 bg-white">
          <Nav />
        </div>

        <div className="ml-[270px] flex-1 p-6 bg-white">
          {/* Dashboard Title */}
          <h1 className="text-3xl font-semibold text-gray-700 mb-4">Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {shows ? (
              <>
                <div className="flex flex-col p-4 bg-blue-400 shadow-lg rounded-lg gap-y-3 text-white">
                  <div className="text-xl font-bold">Total Products</div>
                  <div className="text-3xl font-semibold">{shows.TotalProduct || 0}</div>
                </div>

                <div className="flex flex-col p-4 bg-blue-400 shadow-lg rounded-lg gap-y-3 text-white">
                  <div className="text-xl font-bold">Total Orders</div>
                  <div className="text-3xl font-semibold">{shows.TotalOrder || 0}</div>
                </div>

                <div className="flex flex-col p-4 bg-blue-400 shadow-lg rounded-lg gap-y-3 text-white">
                  <div className="text-xl font-bold">Delivered Orders</div>
                  <div className="text-3xl font-semibold">{shows.DeliveredOrders || 0}</div>
                </div>

                <div className="flex flex-col p-4 bg-blue-400 shadow-lg rounded-lg gap-y-3 text-white">
                  <div className="text-xl font-bold">Pending Orders</div>
                  <div className="text-3xl font-semibold">{shows.PendingOrders || 0}</div>
                </div>

                <div className="flex flex-col p-4 bg-blue-400 shadow-lg rounded-lg gap-y-3 text-white">
                  <div className="text-xl font-bold">Total Users</div>
                  <div className="text-3xl font-semibold">{shows.AllUsers || 0}</div>
                </div>
              </>
            ) : (
              <p>No data found</p>
            )}
          </div>

          {/* Second Section - Two Columns */}
          <div className="flex">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Transactions Section */}
              <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h2>
                <table className="text-left w-full whitespace-nowrap text-sm">
                  <thead className="text-gray-700">
                    <tr className="font-semibold text-gray-600">
                      <th scope="col" className="p-4">Id</th>
                      <th scope="col" className="p-4">Name</th>
                      <th scope="col" className="p-4">Email</th>
                      <th scope="col" className="p-4">Role</th>
                      <th scope="col" className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td className="p-4 font-semibold text-gray-600">{index + 1}</td>
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center py-[3px] px-[10px] rounded-2xl font-semibold ${user.role === 'admin' ? 'bg-green-600' : 'bg-blue-600'} text-white`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center py-[3px] px-[10px] rounded-2xl font-semibold ${user.Isactive ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                            {user.Isactive ? 'Active' : 'Deactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bar Chart - Sales & Revenue Report */}
              {barChartData && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales & Revenue Report</h2>
                  
                  <Bar data={barChartData} 
                  options={barChartOptions } 
                  
                  />
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Pie Chart - Total Views Performance */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Management</h2>
                <Pie data={pieChartData} />
              </div>
            </div>
          </div>

          <footer className="mt-8">
            <p className="text-base text-gray-500 font-normal p-3 text-center">
              Design and Developed by{' '}
              <a href="https://www.linkedin.com/in/rashid-web-developer/" target="_blank" className="text-blue-600 underline hover:text-blue-700">
                Rashid Khalique
              </a>
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
