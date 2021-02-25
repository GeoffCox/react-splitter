import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import './stylesheet.css';

const appElement = document.getElementById('app');

// Creates an application
const createApp = (AppComponent: typeof App) => {
  return <AppComponent />;
};

// Initial rendering of the application
ReactDOM.render(createApp(App), appElement);
