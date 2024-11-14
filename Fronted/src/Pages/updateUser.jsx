import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../Nav';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { id } = useParams();

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('');
    setSelectedUserId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUserId) {
        await axios.put(`http://localhost:3000/api/product/updateUser/${id}`, { 
          name, 
          email, 
          password, 
          role 
        });
        toast.success('User updated successfully!');
      } else {
      }
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Failed to save user. Please try again.');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/product/showuser');
      const userList = response.data.usera || [];
      setUsers(userList);

      if (id) {
        const userToEdit = userList.find(user => user._id === id);
        if (userToEdit) {
          setSelectedUserId(userToEdit._id);
          setName(userToEdit.name);
          setEmail(userToEdit.email);
          setRole(userToEdit.role);
        } else {
          toast.error('User not found.');
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [id]); // Add id as a dependency to refetch if it changes

  return (
    <div className="flex h-screen bg-gray-100">
      <Nav />
      <div className="flex-1 ml-[270px] p-6 bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-3xl font-semibold mb-6">{selectedUserId ? 'Update User' : 'Create User'}</h2>
        <Card className="p-6 bg-white shadow-lg rounded-lg">
          <CardBody>
            {selectedUserId !== null ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded flex items-center hover:bg-blue-700 transition"
                >
                  <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                  {selectedUserId ? 'Update' : 'Submit'}
                </button>
              </form>
            ) : (
              <p>User not found.</p>
            )}
          </CardBody>
        </Card>
        <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          pauseOnHover 
          draggable 
          pauseOnFocusLoss 
        />
      </div>
    </div>
  );
};

export default UpdateUser;
