import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Nav';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserManagements() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/product/showuser');
        setUsers(response.data?.usera || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/product/userDelete/${id}`);
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
      toast.success(`User with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="fixed w-[270px] h-full bg-white border-r border-gray-400">
        <Nav />
      </div>
      <div className="flex-1 ml-[270px] p-6">
        <h2 className="text-3xl font-semibold mb-6">All Users</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="border rounded w-full p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white shadow-md rounded overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-gray-600">Id</th>
                <th className="py-2 px-4 text-gray-600">Name</th>
                <th className="py-2 px-4 text-gray-600">Email</th>
                <th className="py-2 px-4 text-gray-600">Role</th>
                <th className="py-2 px-4 text-gray-600">Password</th>
                <th className="py-2 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role}</td>
                    <td className="py-2 px-4">*****</td>
                    <td className="py-2 px-4 space-x-2">
                      <FontAwesomeIcon 
                        icon={faEdit} 
                        className="text-blue-500 cursor-pointer" 
                        onClick={() => navigate(`/updateUser/${user._id}`)} 
                      />
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="text-red-500 cursor-pointer"
                        onClick={() => deleteUser(user._id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-2 px-4 text-center">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagements;
