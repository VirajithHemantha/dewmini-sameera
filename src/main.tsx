import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import AdminPage from './AdminPage.tsx';

const currentPath = window.location.pathname;

createRoot(document.getElementById('root')!).render(
  currentPath === '/admin' ? <AdminPage /> : <App />
);
