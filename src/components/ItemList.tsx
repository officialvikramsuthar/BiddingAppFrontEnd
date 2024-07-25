// src/components/ItemList.tsx
import React, { useState, useEffect } from 'react';
import config from '../config';
import { useNavigate } from 'react-router-dom';

interface Item {
  id: number;
  title: string;
  description: string;
  starting_bid: number;
  bid_increment: number;
  highest_bid: number;
  auction_start:string;
  auction_end:string;
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [bids, setBids] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`${config.apiBaseUrl}/items`);
      const data = await response.json();
      setItems(data);
    };
    fetchItems();

    const socket = new WebSocket(config.websocketUrl);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const updatedItem: Item = JSON.parse(event.data);
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      setBids((prevBids) => ({ ...prevBids, [updatedItem.id]: updatedItem.highest_bid }));
    };

    socket.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);


  const handleBid = async (itemId: number, currentBid:number, increment:number) => {
    const newBid = currentBid + increment;
    setBids((prevBids) => ({ ...prevBids, [itemId]: newBid }));
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.error('No access token found');
      return navigate('/login');
    }

    await fetch(`${config.apiBaseUrl}/bids/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ item:itemId, amount: newBid }),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Auction Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p>{item.description}</p>
            <p>Started:{item.auction_start} End:{item.auction_end}</p>
            <p>Starting Bid: ${item.starting_bid}</p>
            <p>Current Bid: ${bids[item.id] || item.highest_bid}</p>
            <div>
              <button
                onClick={() => handleBid(item.id, item.highest_bid, item.bid_increment)}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-sm"
              >
                Place Bid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
