import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EntityUpdateHistory() {

    const [updateHistory, setUpdateHistory] = useState([]);

    useEffect(() => {
        const fetchUpdateHistory = async () => {
            try {
                const response = await fetch('http://ec2-52-72-104-196.compute-1.amazonaws.com:8081/public/getUpdateHistory');
                if (!response.ok) throw new Error('Failed to fetch update history');
                const data = await response.json();
                setUpdateHistory(data.reverse());
            } catch (error) {
                console.error(error);
            }
        };
        fetchUpdateHistory();
    }, []);

    return (
        <div>
            <div style={{ paddingTop: '20px', paddingLeft: '15px', paddingBottom: '20px' }}>
                <Link to={'/entityManager'}>
                    <button>Return</button>
                </Link>
            </div>
            <h1 style={{ paddingLeft: '15px', paddingBottom: '20px' }}>Entity Pre-Update Archive History</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {updateHistory.map(update => (
                    <li style={{ paddingLeft: '15px' }} key={update.id}>
                        <strong>Date Archived: {update.dateArchived}</strong><br />
                        <strong>Requestor ID: {update.adminName}</strong><br />
                        <strong>Title:</strong> {update.title}<br />
                        <strong>Description:</strong> {update.description}<br />
                        <strong>Price:</strong> {update.price}<br />
                        <strong>Country:</strong> {update.country}<br />
                        <strong>Travel Period:</strong> {update.travelPeriod}<br />
                        <strong>Image URL:</strong> {update.ImageURL}<br />
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );

}