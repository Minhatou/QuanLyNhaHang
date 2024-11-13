import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReservationSchedule = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const storedToken = localStorage.getItem('token');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('https://localhost:7001/api/Booking', {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`
                    }
                });
                setBookings(response.data.result || []);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [storedToken]);

    const fetchBookingDetails = async (bookingId) => {
        try {
            const response = await axios.get(`https://localhost:7001/api/Booking/${bookingId}`, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            setSelectedBooking(response.data.result);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching booking details:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            await axios.put(`https://localhost:7001/api/Booking/${bookingId}`, { bookingStatus: newStatus }, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            setBookings(bookings.map(booking => booking.id === bookingId ? { ...booking, bookingStatus: newStatus } : booking));
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(bookings.length / itemsPerPage);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Danh sách đặt bàn</h1>
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
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map(booking => (
                    <tr key={booking.id}>
                        <td className="py-2 px-4 border-b">{booking.id}</td>
                        <td className="py-2 px-4 border-b">{booking.name}</td>
                        <td className="py-2 px-4 border-b">{booking.phoneNumber}</td>
                        <td className="py-2 px-4 border-b">{booking.bookingDate}</td>
                        <td className="py-2 px-4 border-b">{booking.numberOfGuests}</td>
                        <td className="py-2 px-4 border-b">{booking.specialRequest}</td>
                        <td className="py-2 px-4 border-b">{booking.dateCreated}</td>
                        <td className="py-2 px-4 border-b">{booking.bookingStatus}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                onClick={() => fetchBookingDetails(booking.id)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                View Details
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {isModalOpen && selectedBooking && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-2/3">
                        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
                        <p><strong>ID:</strong> {selectedBooking.id}</p>
                        <p><strong>Name:</strong> {selectedBooking.name}</p>
                        <p><strong>Phone Number:</strong> {selectedBooking.phoneNumber}</p>
                        <p><strong>Booking Date:</strong> {selectedBooking.bookingDate}</p>
                        <p><strong>Number of Guests:</strong> {selectedBooking.numberOfGuests}</p>
                        <p><strong>Special Request:</strong> {selectedBooking.specialRequest}</p>
                        <p><strong>Date Created:</strong> {selectedBooking.dateCreated}</p>
                        <p><strong>Booking Status:</strong></p>
                        <select
                            value={selectedBooking.bookingStatus}
                            onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value)}
                            className="bg-white border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminReservationSchedule;