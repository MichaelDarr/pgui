import { configureStore } from '@reduxjs/toolkit';

import { connectionSlice } from './connection';

export const store = configureStore({
    reducer: {
        connection: connectionSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
