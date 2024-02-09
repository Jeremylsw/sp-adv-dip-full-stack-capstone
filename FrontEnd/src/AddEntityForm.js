import {
    addEntity,
    inputCategory,
    inputTitle,
    inputDescription,
    inputPrice,
    inputCountry,
    inputTravelPeriod,
    inputImageURL,
} from './entityReducer.js';
import { useDispatch, useSelector } from 'react-redux';
import { AddEntitySubmitTestId } from './testId.js';
import { generateRandomId } from './helper.js';

export default function AddEntityForm() {
    const formData = {
        id: generateRandomId(),
        category: useSelector((store) => store.entity.inputCategory),
        title: useSelector((store) => store.entity.inputTitle),
        description: useSelector((store) => store.entity.inputDescription),
        price: useSelector((store) => store.entity.inputPrice),
        country: useSelector((store) => store.entity.inputCountry),
        travelPeriod: useSelector((store) => store.entity.inputTravelPeriod),
        imageURL: useSelector((store) => store.entity.inputImageURL),
    };

    const entityList = useSelector(store => store.entity.entityList);
    const dispatch = useDispatch();

    function isTitleExists(titleToCheck) {
        return entityList.some(travel => travel.title === titleToCheck);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any of the required fields are empty before submitting
        for (const field in formData) {
            if (formData[field].trim() === '') {
                alert(`${field} cannot be empty!`);
                return;
            }
        }

        // Check if title already exist in database
        if (isTitleExists(formData.title)) {
            alert('Listing with similar title already in database!');
        } else {
            // Proceed with trying POST request to server
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('http://ec2-52-72-104-196.compute-1.amazonaws.com:8081/admin/addListing', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        category: formData.category,
                        title: formData.title,
                        description: formData.description,
                        price: formData.price,
                        country: formData.country,
                        travelPeriod: formData.travelPeriod,
                        imageURL: formData.imageURL,
                    }),
                });

                // Handle response as needed
                if (!response.ok) {
                    throw new Error('Failed to add listing on the server.');
                }

                const responseData = await response.json();
                formData.id = responseData.travelID; // Assuming the ID is returned in the response

                alert('Listing added successfully!');
                // Dispatch actions to update the state in your Redux store
                dispatch(addEntity(formData));
            } catch (error) {
                console.error('Error adding listing:', error);
                alert('Failed to add listing. Please try again later.');
            }
        }


        // Optionally, reset the input fields after submission
        dispatch(inputCategory(''));
        dispatch(inputTitle(''));
        dispatch(inputDescription(''));
        dispatch(inputPrice(''));
        dispatch(inputCountry(''));
        dispatch(inputTravelPeriod(''));
        dispatch(inputImageURL(''));
    };


    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                <span>Category</span>
                <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => dispatch(inputCategory(e.target.value))}
                    style={{ paddingLeft: '8px' }}
                />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                <span>Title</span>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => dispatch(inputTitle(e.target.value))}
                    style={{ paddingLeft: '8px' }}
                />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                <span >Description</span>
                <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => dispatch(inputDescription(e.target.value))}
                    style={{ paddingLeft: '8px' }}
                />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                <span >Price</span>
                <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => dispatch(inputPrice(e.target.value))}
                    style={{ paddingLeft: '8px' }}
                />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                <span >Country</span>
                <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => dispatch(inputCountry(e.target.value))}
                    style={{ paddingLeft: '8px' }}
                />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                <span >Travel Period</span>
                <input
                    type="text"
                    value={formData.travelPeriod}
                    onChange={(e) => dispatch(inputTravelPeriod(e.target.value))}
                    style={{ paddingLeft: '8px' }}
                />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column' }}>
                <span >Image URL</span>
                <input
                    type="text"
                    value={formData.imageURL}
                    onChange={(e) => dispatch(inputImageURL(e.target.value))}
                    style={{ paddingLeft: '8px' }}
                />
            </label>

            {/* Submit button */}
            <input type="submit" data-testid={AddEntitySubmitTestId} value="Submit" />
        </form>
    );
}