import { FilterCategoryTestId } from './testId.js';
import { useDispatch, useSelector } from 'react-redux';
import { filterEntity } from './entityReducer.js';
import { Link } from 'react-router-dom';
import { countEntitiesWithYesPinned } from './helper.js';

export default function FilterEntitiesForm() {
    const dispatch = useDispatch();

    const entityList = useSelector(function (store) {
        return store.entity.entityList;
    });

    const uniqueCategories = [...new Set(entityList.map((entity) => entity.category))];
    return (
        <div>

            {/* Update History Viewing div */}
            <div style={{ marginBottom: '20px' }}>
                {/* Button for jumping to entity info page */}
                <Link to={'/updateHistory'}>
                    <button>View Update History</button>
                </Link>
            </div>


            {/* Pinned entities management div */}
            <div style={{ marginBottom: '20px' }}>
                <b>No. of Pinned Entities:</b> {countEntitiesWithYesPinned(entityList)} <br />
                {/* Button for jumping to entity info page */}
                <Link to={'/pinned'}>
                    <button>View Pinned Entities</button>
                </Link>
            </div>

            {/* Unique category list div */}
            <div>
                {/* Checkbox for each filter category */}
                {uniqueCategories.map((category) => (
                    <label key={category} style={{ display: 'block', marginLeft: '10px' }}>
                        <input
                            type="checkbox"
                            data-testid={FilterCategoryTestId}
                            onChange={() => {
                                dispatch(filterEntity(category));
                            }}
                        />
                        <span style={{ marginLeft: '5px' }}>{category}</span>
                        <br />
                    </label>
                ))}
            </div>
        </div>
    );
}
