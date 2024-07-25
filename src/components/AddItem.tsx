// src/components/AddItem.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const AddItem: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState(0);
  const [bidIncrement, setBidIncrement] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.error('No access token found');
      return navigate('/login');
    }

    let success = await fetch(`${config.apiBaseUrl}/items/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title, description, 'starting_bid':startingBid, 'bid_increment':bidIncrement, 'auction_start':startDate, 'auction_end':endDate }),
    });

    if(success.ok){
      navigate('/items');
    }else{
      if(success.statusText === "Unauthorized"){
        alert("Login Required")
        navigate("/login")
      }
    }
    
  };

  if (!localStorage.getItem('authenticated')) {
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startingBid">
            Starting Bid
          </label>
          <input
            type="number"
            id="startingBid"
            value={startingBid}
            onChange={(e) => setStartingBid(parseFloat(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bidIncrement">
            Bid Increment
          </label>
          <input
            type="number"
            id="bidIncrement"
            value={bidIncrement}
            onChange={(e) => setBidIncrement(parseFloat(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bidIncrement">
            Start Date
          </label>
          <input
            type="date"
            id="bidIncrement"
            value={startDate}
            onChange={(e:any) => setStartDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bidIncrement">
            End Date
          </label>
          <input
            type="date"
            id="bidIncrement"
            value={endDate}
            onChange={(e:any) => setEndDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
