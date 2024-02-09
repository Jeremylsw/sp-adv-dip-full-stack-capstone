import Entity from './Entity.js';
import { useSelector, useDispatch } from 'react-redux';
import { setEntities, deleteEntity, resetSelectedEntity } from './entityReducer.js';
import { useEffect } from 'react';

export default function EntitiesList() {
    const entityList = useSelector(store => store.entity.entityList);
    const filterList = useSelector(store => store.entity.filterCategories);
    const selectedList = useSelector(store => store.entity.selectedEntities);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEntities = async () => {
            try {
                const response = await fetch('http://ec2-52-72-104-196.compute-1.amazonaws.com:8081/public/getListings');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
           
                const formattedData = data.map(item => ({
                    id: item.travelID,
                    category: item.category,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    country: item.country,
                    travelPeriod: item.travelPeriod,
                    imageURL: item.ImageURL,
                    pinned: item.pinned || 'No',
                }));
                dispatch(setEntities(formattedData));

            } catch (error) {
                console.error(error);
            }
        };
        fetchEntities();
    }, [dispatch]);

    const handleDeleteSelectedEntities = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch('http://ec2-52-72-104-196.compute-1.amazonaws.com:8081/admin/deleteListings', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ids: selectedList,
                }),
            });
        
            if (!response.ok) {
                throw new Error('Failed to delete selected entities. Status: ' + response.status);
            }
            alert("Deleted selected entities");
            dispatch(deleteEntity(selectedList));
            dispatch(resetSelectedEntity());
        } catch (error) {
            console.error('Error deleting selected entities:', error);
        }
    };

    // Filter entities based on filters
    // If no filter selected, display all
    // Else display only filtered categories
    const filteredEntities =
        filterList.length === 0 ? entityList : entityList.filter((entity) => filterList.includes(entity.category));

    return (
        <div>
            {filteredEntities.length > 0 && (
                <button onClick={handleDeleteSelectedEntities}>
                    Delete selected
                </button>
            )}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {filteredEntities.map((entity) => (
                    <li key={entity.id} style={{ border: '1px solid black', minHeight: '20px', padding: '5px' }}>
                        <Entity entity={entity} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
