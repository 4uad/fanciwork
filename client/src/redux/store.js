import { configureStore } from '@reduxjs/toolkit';
import collapseReducer from './collapseSlice';
import tagReducer from './tagSlice';

export default configureStore({
  reducer: {
    collapse: collapseReducer,
    tag: tagReducer
  },
});
