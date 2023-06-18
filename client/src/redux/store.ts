'use client'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { UserReduser } from './slices/user';
import { UploadFilesReduser } from './slices/uploadFiles';
import { DownloadFilesReduser } from './slices/downloadFiles';

export const store = configureStore({
	reducer: {
		user: UserReduser,
		uploadfiles: UploadFilesReduser,
		downloadfiles: DownloadFilesReduser
	},
});

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch