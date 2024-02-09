import { EntitySelectTestId } from './testId.js';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, selectEntity, togglePinEntity, deleteEntity } from './entityReducer.js';
import { Link } from 'react-router-dom';

export default function Entity({ entity }) {
    const dispatch = useDispatch();

    const { id, category, title, description, price, country, travelPeriod, imageURL, pinned } = entity;

    const entityList = useSelector(function (store) {
        return store.entity.entityList;
    });

    let pinnedEntity = entityList.find((item) => item.id === id);
    let isPinned = pinnedEntity.pinned === 'No' ? '' : '📌';
    let pinButtonText = pinnedEntity.pinned === 'Yes' ? 'Unpin' : 'Pin';

    const handleDeleteEntity = async (entityId) => {
        const token = localStorage.getItem('authToken'); // Retrieve the stored token
        if (!token) {
            console.error("No token found");
            return false;
        }
        try {
            const response = await fetch(`http://ec2-52-72-104-196.compute-1.amazonaws.com:8081/admin/rmListing/${entityId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // Include the JWT in the Authorization header
                }
            });
            if (!response.ok) throw new Error('Failed to delete the entity.');
            alert("Successfully deleted entity");
            dispatch(deleteEntity([entityId]));
            return true; // Return true if the deletion was successful
        } catch (error) {
            console.error('Error deleting entity:', error);
            return false; // Return false if there was an error
        }
    };


    return (
        <div>
            {/* Checkbox for multiple select and delete */}
            <input
                type="checkbox"
                data-testid={EntitySelectTestId}
                style={{ marginBottom: '10px' }}
                onChange={() => dispatch(selectEntity(id))}
            />{' '}
            {isPinned}
            <br />
            {/* Displaying the category of the entity */}
            <div style={{ marginLeft: '30px' }}>
                <span>{'ID: ' + id}</span>
                <br />
                <span>{'Category: ' + category}</span>
                <br />
                <span>{'Title: ' + title}</span>
                <br />
                <span>{'Description: ' + description}</span>
                <br />
                <span>{'Price: ' + price}</span>
                <br />
                <span>{'Country: ' + country}</span>
                <br />
                <span>{'Travel Period: ' + travelPeriod}</span>
                <br />
                <span>{'Image URL: ' + imageURL}</span>
            </div>
            <br />
            {/* Button for jumping to entity info page */}
            <Link to={'/' + id}>
                <button onClick={() => dispatch(clearFilter())}>More Info</button>
            </Link>
            {/* Button for Pinning Entity */}
            <button onClick={() => dispatch(togglePinEntity(id))}>{pinButtonText}</button>
            {/* Button for deleting the single entity */}
            <button onClick={() => handleDeleteEntity(id)}>Delete</button>
        </div>
    );
}