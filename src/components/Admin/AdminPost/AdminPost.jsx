import React from 'react';

const AdminPost = () => {
    const posts = [
        { id: 1, title: 'Post 1', date: '2023-10-01' },
        { id: 2, title: 'Post 2', date: '2023-10-02' },
        // Add more posts here
    ];

    const handleEdit = (id) => {
        console.log(`Edit post with id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete post with id: ${id}`);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Posts</h1>
            <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Add New Post</button>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {posts.map(post => (
                    <tr key={post.id}>
                        <td className="py-2 px-4 border-b">{post.id}</td>
                        <td className="py-2 px-4 border-b">{post.title}</td>
                        <td className="py-2 px-4 border-b">{post.date}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                                onClick={() => handleEdit(post.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleDelete(post.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPost;