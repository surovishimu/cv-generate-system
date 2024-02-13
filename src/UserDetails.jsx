import { useState, useEffect } from 'react';

function UserDetails({ submittedData }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, [submittedData]);

    const handleDownloadPDF = (pdfLink) => {
        // Convert base64 string to Blob
        const byteCharacters = atob(pdfLink);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'user.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h1>User Data</h1>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Phone Number</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.name}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.email}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.phoneNumber}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                <button onClick={() => handleDownloadPDF(user.pdfLink)}>Download PDF</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserDetails;
