import { createSlice } from '@reduxjs/toolkit';
import { countEntitiesWithYesPinned } from './helper.js';

const entitySlice = createSlice({
    name: 'Entity Slice',
    initialState: {
        entityList: [],
        filterCategories: [],
        selectedEntities: [],
        inputCategory: '',
        inputTitle: '',  // Add inputTitle field
        inputDescription: '',  // Add inputDescription field
        inputPrice: '',  // Add inputPrice field
        inputCountry: '',  // Add inputCountry field
        inputTravelPeriod: '',  // Add inputTravelPeriod field
        inputImageURL: '',  // Add inputImageURL field
    },
    reducers: {
        addEntity: function (state, action) {
            // action.payload will be the category
            state.entityList.push({
                id: action.payload.id,
                category: action.payload.category,
                title: action.payload.title,
                description: action.payload.description,
                price: action.payload.price,
                country: action.payload.country,
                travelPeriod: action.payload.travelPeriod,
                imageURL: action.payload.imageURL,
                pinned: 'No',
            });
        },
        inputTitle: function (state, action) {
            state.inputTitle = action.payload;
        },

        inputDescription: function (state, action) {
            state.inputDescription = action.payload;
        },

        inputPrice: function (state, action) {
            state.inputPrice = action.payload;
        },

        inputCountry: function (state, action) {
            state.inputCountry = action.payload;
        },

        inputTravelPeriod: function (state, action) {
            state.inputTravelPeriod = action.payload;
        },

        inputImageURL: function (state, action) {
            state.inputImageURL = action.payload;
        },

        filterEntity: function (state, action) {
            // action.payload will be the category
            let category = action.payload;
            if (state.filterCategories.includes(category)) {
                // Category is already selected, remove it
                state.filterCategories = state.filterCategories.filter(
                    (selectedCategory) => selectedCategory !== category
                );
            } else {
                // Category is not selected, add it
                state.filterCategories = [...state.filterCategories, category];
            }
        },

        clearFilter: function (state) {
            state.filterCategories = [];
        },

        // deleteEntity: function (state, action) {
        //     // action.payload will be the id of the entity to delete
        //     const entityId = action.payload;
        //     // Filter out the entity with the given id
        //     state.entityList = state.entityList.filter(entity => entity.id !== entityId);

        //     // Update filterCategories to remove categories with no entities
        //     const remainingCategories = [...new Set(state.entityList.map(entity => entity.category))];
        //     state.filterCategories = state.filterCategories.filter(category =>
        //         remainingCategories.includes(category)
        //     );
        // },
        deleteEntity: function (state, action) {
            // action.payload will now be an array of the ids of the entities to delete
            const entityIds = action.payload;
            // Filter out the entities with the given ids
            // console.log(action.payload);
            state.entityList = state.entityList.filter(entity => !entityIds.includes(entity.id));
            // console.log(state.entityList);
            // Update filterCategories to remove categories with no entities
            const remainingCategories = [...new Set(state.entityList.map(entity => entity.category))];
            state.filterCategories = state.filterCategories.filter(category =>
                remainingCategories.includes(category)
            );
        },


        selectEntity: function (state, action) {
            let entityId = action.payload;
            if (state.selectedEntities.includes(entityId)) {
                // Entity is already selected, remove it
                state.selectedEntities = state.selectedEntities.filter((id) => id !== entityId);
            } else {
                // Entity is not selected, add it
                state.selectedEntities = [...state.selectedEntities, entityId];
            }
        },

        resetSelectedEntity: function (state) {
            state.selectedEntities = [];
        },

        // Storage for input category in input box
        inputCategory: function (state, action) {
            state.inputCategory = action.payload;
        },

        // Updater for EntityInfo text box input
        updateCategoryText: function (state, action) {
            state.updateCategory = action.payload;
        },

        updateCategory: function (state, action) {
            const indexOfEntity = state.entityList.findIndex((obj) => obj.id === parseInt(action.payload.id));
            state.entityList[indexOfEntity].category = action.payload.category;
            state.entityList[indexOfEntity].description = action.payload.description;
            state.entityList[indexOfEntity].price = action.payload.price;
            state.entityList[indexOfEntity].country = action.payload.country;
            state.entityList[indexOfEntity].travelPeriod = action.payload.travelPeriod;
            state.entityList[indexOfEntity].imageURL = action.payload.imageURL;

        },

        togglePinEntity: function (state, action) {
            const indexOfEntity = state.entityList.findIndex((obj) => obj.id === parseInt(action.payload));
            // If pin action but already >= 5 items in pinned list, deny request
            if (state.entityList[indexOfEntity].pinned === 'No' && countEntitiesWithYesPinned(state.entityList) >= 5) {
                alert('ERROR: MAXIMUM NUMBER OF PINNED ENTITIES');
            } else {
                const indexOfEntity = state.entityList.findIndex((obj) => obj.id === parseInt(action.payload));
                state.entityList[indexOfEntity].pinned =
                    state.entityList[indexOfEntity].pinned === 'Yes' ? 'No' : 'Yes';
            }
        },

        // Reducer to update the entity list
        setEntities: (state, action) => {
            state.entityList = action.payload;
        },
    },
});

// Dispatch these to update the state in your component
export const {
    addEntity,
    inputTitle,
    inputDescription,
    inputPrice,
    inputCountry,
    inputTravelPeriod,
    inputImageURL,
    filterEntity,
    clearFilter,
    deleteEntity,
    selectEntity,
    resetSelectedEntity,
    inputCategory,
    updateCategoryText,
    updateCategory,
    togglePinEntity,
    setEntities
} = entitySlice.actions;

// This part gets registered into the store.
export default entitySlice.reducer;