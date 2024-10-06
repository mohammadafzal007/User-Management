// Home.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';

const New = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [updating, setUpdating] = useState(false);
    
    // Fetch users on component mount
    useEffect(() => {
        const getAllUsers = async () => {
            setLoading(true);
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(res.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        getAllUsers();
    }, []);

    // Delete user
    const handleDelete = async (id) => {
        setDeleting(true);
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            setUsers(users.filter(user => user.id !== id)); // Update state to remove the deleted user
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setDeleting(false);
        }
    };

    // Open modal for adding a user
    const openAddUserModal = () => {
        setCurrentUser(null); // Clear current user for adding new user
        setModalOpen(true);
    };

    // Open modal for editing a user
    const openEditUserModal = (user) => {
        setCurrentUser(user);
        setModalOpen(true);
    };

    // Handle form submission for adding/updating a user
    const handleSubmit = async (user) => {
        if (currentUser) {
            // Update user
            setUpdating(true);
            try {
                await axios.post(`https://jsonplaceholder.typicode.com/users/${currentUser.id}`, user);
                setUsers(users.map(u => (u.id === currentUser.id ? user : u)));
            } catch (error) {
                console.error("Error updating user:", error);
            } finally {
                setUpdating(false);
            }
        } else {
            // Add user (for demonstration purpose, using the same API)
            setUpdating(true);
            try {
                const res = await axios.post(`https://jsonplaceholder.typicode.com/users`, user);
                setUsers([...users, res.data]);
            } catch (error) {
                console.error("Error adding user:", error);
            } finally {
                setUpdating(false);
            }
        }

        setModalOpen(false); // Close the modal after submission
    };

    return (
        <section className='flex justify-center items-center w-full border-blue-600'>
            <section className='flex flex-col justify-center items-center p-20 border-black w-full gap-10'>
                <header className='flex w-full justify-between border-black'>
                    <button onClick={openAddUserModal} className='bg-blue-700 px-4 py-2'> + Add User</button>
                    <input type="text" placeholder="Search User" className='border border-sky-500 p-2 text-black' />
                </header>

                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <table className='divide-gray-200 border border-gray-300 w-full'>
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className='px-4 py-2 border'>Sr.No</th>
                                <th className='px-4 py-2 border'>Name</th>
                                <th className='px-4 py-2 border'>Username</th>
                                <th className='px-4 py-2 border'>Email</th>
                                <th className='px-4 py-2 border'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    
                                    
                                    <td className='text-center px-6 py-4 whitespace-nowrap'>{index+1}</td>
                                    <td className='text-center px-6 py-4 whitespace-nowrap'>{user.name}</td>
                                    <td className='text-center px-6 py-4 whitespace-nowrap'>{user.username}</td>
                                    <td className='text-center px-6 py-4 whitespace-nowrap'>{user.email}</td>
                                    <td className='text-center px-6 py-4 whitespace-nowrap'>
                                        <button onClick={() => openEditUserModal(user)} className='px-3 py-1 bg-blue-500 text-white rounded mr-2'>Edit</button>
                                        <button 
                                            className='px-3 py-1 bg-red-500 text-white rounded'
                                            onClick={() => handleDelete(user.id)} 
                                            disabled={deleting}
                                        >
                                            {deleting ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                
                {/* Modal for Add/Edit User */}
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <UserForm user={currentUser} onSubmit={handleSubmit} />
                </Modal>
            </section>
        </section>
    );
};

// UserForm Component for Modal
const UserForm = ({ user, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        company: '',
        website: ''
    });
    
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                username: user.username,
                email: user.email,
                phone: '', // Assuming phone number isn't provided by the API
                street: '', // Assuming street isn't provided by the API
                city: '', // Assuming city isn't provided by the API
                company: '', // Assuming company isn't provided by the API
                website: ''
            });
        } else {
            setFormData(prev => ({
                ...prev,
                username: `USER-${prev.name}` // Automatically fill with 'USER-name'
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Name validation
        if (!formData.name) {
            newErrors.name = "Name is required.";
        } else if (formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters.";
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email must be a valid email format.";
        }

        // Phone validation
        if (!formData.phone) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(formData.phone)) { // Simple validation for 10-digit phone numbers
            newErrors.phone = "Phone number must be a valid phone number.";
        }

        // Username validation (auto-filled and non-editable)
        if (!formData.username.startsWith('USER-')) {
            newErrors.username = "Username is required and must follow the format USER-name.";
        }

        // Address validation
        if (!formData.street) {
            newErrors.street = "Street is required.";
        }
        if (!formData.city) {
            newErrors.city = "City is required.";
        }

        // Company validation (optional but needs to be valid if provided)
        if (formData.company && formData.company.length < 3) {
            newErrors.company = "Company name must be at least 3 characters if provided.";
        }

        // Website validation (optional but needs to be valid if provided)
        if (formData.website && !/^https?:\/\/.+\..+/i.test(formData.website)) {
            newErrors.website = "Website must be a valid URL if provided.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({ ...formData });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white border rounded shadow-md">
            <h2 className="mb-4 text-xl font-bold col-span-full">{user ? 'Edit User' : 'Add User'}</h2>
            
            <div className="col-span-full">
                <label className="block mb-2">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full" 
                    required 
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>
            
            <div className="col-span-full">
                <label className="block mb-2">Username</label>
                <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    className="border border-gray-300 p-2 w-full" 
                     // Make it non-editable
                     
                />
                {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
            </div>
            
            <div>
                <label className="block mb-2">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full" 
                    required 
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            
            <div>
                <label className="block mb-2">Phone</label>
                <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full" 
                    required 
                />
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>
            
            <div>
                <label className="block mb-2">Street</label>
                <input 
                    type="text" 
                    name="street" 
                    value={formData.street} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full" 
                    required 
                />
                {errors.street && <span className="text-red-500 text-sm">{errors.street}</span>}
            </div>
            
            <div>
                <label className="block mb-2">City</label>
                <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full" 
                    required 
                />
                {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
            </div>
            
            <div>
                <label className="block mb-2">Company Name (optional)</label>
                <input 
                    type="text" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full" 
                />
                {errors.company && <span className="text-red-500 text-sm">{errors.company}</span>}
            </div>
            
            <div>
                <label className="block mb-2">Website (optional)</label>
                <input 
                    type="text" 
                    name="website" 
                    value={formData.website} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full" 
                />
                {errors.website && <span className="text-red-500 text-sm">{errors.website}</span>}
            </div>
            
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded col-span-full">
                {user ? 'Update User' : 'Add User'}
            </button>
        </form>
    );
};

export default New;
