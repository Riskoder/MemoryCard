import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import RefactoredApp from './RefactoredApp.jsx';

createRoot(document.getElementById('root')).render(
  <>
    {/* <App /> */}
    <RefactoredApp />
  </>
);
