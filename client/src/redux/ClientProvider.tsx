'use client';

import { store } from './store';
import { Provider } from 'react-redux';

function ClientProvider({children}: any) {
    return <Provider store={store}>{children}</Provider>;
}

export { ClientProvider };