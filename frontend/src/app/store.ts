import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

import logger from 'redux-logger';

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger]
});

export default store;
