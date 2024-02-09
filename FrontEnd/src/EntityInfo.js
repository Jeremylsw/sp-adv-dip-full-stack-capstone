import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    updateCategory, updateCategoryText,
    inputCategory,
    inputDescription,
    inputPrice,
    inputCountry,
    inputTravelPeriod,
    inputImageURL
} from './entityReducer.js';

export default function EntityInfo() {
    const entityList = useSelector(function (store) {
        return store.entity.entityList;
    });

    const params = useParams(); // Entity ID
    const dispatch = useDispatch();

    const replaceData = {
        category: useSelector((store) => store.entity.inputCategory),
        description: useSelector((store) => store.entity.inputDescription),
        price: useSelector((store) => store.entity.inputPrice),
        country: useSelector((store) => store.entity.inputCountry),
        travelPeriod: useSelector((store) => store.entity.inputTravelPeriod),
        imageURL: useSelector((store) => store.entity.inputImageURL),
    };

    let thisEntity = entityList.find((obj) => obj.id === parseInt(params.id));

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if the category is not empty before submitting
        // Check if any of the required fields are empty before submitting
        for (const field in replaceData) {
            if (replaceData[field].trim() === '') {
                alert(`${field} cannot be empty!`);
                return;
            }
        }

        // Send POST request to the server
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://ec2-52-72-104-196.compute-1.amazonaws.com:8081/admin/updateListing', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: thisEntity.title,
                    description: replaceData.description,
                    price: replaceData.price,
                    country: replaceData.country,
                    category: replaceData.category,
                    travelPeriod: replaceData.travelPeriod,
                    imageURL: replaceData.imageURL,
                }),
            });

            // Handle response as needed
            if (!response.ok) {
                throw new Error('Failed to udpate listing on the server.');
            }

            alert('Listing updated successfully!');
            dispatch(updateCategory({
                id: params.id, category: replaceData.category, description: replaceData.description,
                price: replaceData.price, country: replaceData.country,
                travelPeriod: replaceData.travelPeriod, imageURL: replaceData.imageURL
            }));
        } catch (error) {
            console.error('Error updating listing:', error);
            alert('Failed to update listing. Please try again later.');
        }

        // Optionally, reset the input fields after submission
        dispatch(inputCategory(''));
        dispatch(inputDescription(''));
        dispatch(inputPrice(''));
        dispatch(inputCountry(''));
        dispatch(inputTravelPeriod(''));
        dispatch(inputImageURL(''));

    };

    return (
        <div>
            <div style={{ paddingBottom: '10px' }}>
                <Link to={'/entityManager'}>
                    <button>Return</button>
                </Link>
            </div>
            <div style={{ paddingBottom: '10px' }}>
                <b>Entity ID:</b> {thisEntity.id} <br />
                <b>Category:</b> {thisEntity.category} <br />
                <b>Pinned:</b> {thisEntity.pinned} <br />
                <b>Title:</b> {thisEntity.title} <br />
                <b>Description:</b> {thisEntity.description} <br />
                <b>Price:</b> {thisEntity.price} <br />
                <b>Country:</b> {thisEntity.country} <br />
                <b>Travel Period:</b> {thisEntity.travelPeriod} <br />
                <b>Image URL:</b> {thisEntity.imageURL} <br />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                    <span>Category</span>
                    <input
                        type="text"
                        value={replaceData.category}
                        onChange={(e) => dispatch(inputCategory(e.target.value))}
                        style={{ paddingLeft: '8px' }}
                    />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                    <span >Description</span>
                    <input
                        type="text"
                        value={replaceData.description}
                        onChange={(e) => dispatch(inputDescription(e.target.value))}
                        style={{ paddingLeft: '8px' }}
                    />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                    <span >Price</span>
                    <input
                        type="text"
                        value={replaceData.price}
                        onChange={(e) => dispatch(inputPrice(e.target.value))}
                        style={{ paddingLeft: '8px' }}
                    />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                    <span >Country</span>
                    <input
                        type="text"
                        value={replaceData.country}
                        onChange={(e) => dispatch(inputCountry(e.target.value))}
                        style={{ paddingLeft: '8px' }}
                    />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                    <span >Travel Period</span>
                    <input
                        type="text"
                        value={replaceData.travelPeriod}
                        onChange={(e) => dispatch(inputTravelPeriod(e.target.value))}
                        style={{ paddingLeft: '8px' }}
                    />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column' }}>
                    <span >Image URL</span>
                    <input
                        type="text"
                        value={replaceData.imageURL}
                        onChange={(e) => dispatch(inputImageURL(e.target.value))}
                        style={{ paddingLeft: '8px' }}
                    />
                </label>

                {/* Submit button */}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
