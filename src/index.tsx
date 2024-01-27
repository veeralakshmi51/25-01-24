// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap'
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './slices';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import 'react-tabs/style/react-tabs.css'
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// const store = configureStore({
//   reducer: rootReducer,
//   devTools: true,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: false
//   })
// })
// root.render(
//   <Provider store={store}>
//   <React.Fragment>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.Fragment>
// </Provider>
// );

// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css'
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.Fragment>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </React.Fragment>
  </Provider>
);
reportWebVitals();
