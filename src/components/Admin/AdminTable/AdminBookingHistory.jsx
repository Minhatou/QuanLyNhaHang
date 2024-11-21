import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const storedToken = localStorage.getItem('adminToken');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('https://localhost:7001/api/Booking', {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`
                    }
                });
                const filteredBookings = response.data.result.filter(booking =>
                    booking.bookingStatus === 'Completed' || booking.bookingStatus === 'Cancelled'
                );
                setBookings(filteredBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
        fetchBookings();
    }, [storedToken]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Booking History</h1>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Phone Number</th>
                    <th className="py-2 px-4 border-b">Booking Date</th>
                    <th className="py-2 px-4 border-b">Number of Guests</th>
                    <th className="py-2 px-4 border-b">Special Request</th>
                    <th className="py-2 px-4 border-b">Date Created</th>
                    <th className="py-2 px-4 border-b">Booking Status</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map(booking => (
                    <tr key={booking.id}>
                        <td className="py-2 px-4 border-b">{booking.id}</td>
                        <td className="py-2 px-4 border-b">{booking.name}</td>
                        <td className="py-2 px-4 border-b">{booking.phoneNumber}</td>
                        <td className="py-2 px-4 border-b">{booking.bookingDate}</td>
                        <td className="py-2 px-4 border-b">{booking.numberOfGuests}</td>
                        <td className="py-2 px-4 border-b">{booking.specialRequest}</td>
                        <td className="py-2 px-4 border-b">{booking.dateCreated}</td>
                        <td className="py-2 px-4 border-b">{booking.bookingStatus}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminBookingHistory;