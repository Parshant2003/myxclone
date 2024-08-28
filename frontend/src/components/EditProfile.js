import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/userSlice';

const EditProfile = () => {
    const { user } = useSelector(store => store.user);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Load the current user's profile data
        const fetchProfile = async () => {
            try {
               
                setName(user?.name);
                setUsername(user?.username);
                setBio(user?.bio);
            } catch (error) {
                toast.error('Failed to load profile data.');
                console.error(error);
            }
        };

        fetchProfile();
    }, [user?._id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${USER_API_END_POINT}/profile/${user?._id}`, { name, username, bio }, { withCredentials: true });
            toast.success(response.data.message);
            console.log(response.data);
            dispatch(getUser(response?.data?.user));
            
            
            navigate(`/`);
           
        } catch (error) {
            toast.error('Failed to update profile.');
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4 mx-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className=" p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className=" p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        rows="4"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
