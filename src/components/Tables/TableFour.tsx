import { useState, useEffect } from 'react';

const TableFour = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('http://localhost:8000/index.php/user/list?limit=20')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.username}</td>
                            <td>{user.user_email}</td>
                            <td>{user.user_status === 1 ? 'Active' : 'Inactive'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableFour;
