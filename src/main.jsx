import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import { Provider } from 'react-redux'; // Import Provider
import { store, persistor } from './redux/store'; // Adjust the path as needed
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap with Provider */}
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}> {/* Wrap with PersistGate */}
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
