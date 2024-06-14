import { createSlice } from '@reduxjs/toolkit';

const initialState = 'ALL';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { reducer } = filterSlice;
export default reducer; // Export the reducer
