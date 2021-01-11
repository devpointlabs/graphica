import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, } from 'react-router-dom';
import { AuthProvider, } from "./providers/AuthProvider";
import { FeedProvider, } from "./providers/FeedProvider";
import { ImageProvider } from './providers/ImageProvider';
import { AuthFavProvider } from './providers/FavProvider';
import { CollectionsProvider } from './providers/CollectionsProvider';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { initMiddleware } from 'devise-axios';

initMiddleware()

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AuthFavProvider>
        <FeedProvider>
          <CollectionsProvider>
            <ImageProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ImageProvider>
          </CollectionsProvider>
        </FeedProvider>
      </AuthFavProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



