import { RouterProvider } from 'react-router';
import { router } from './routes';
import '../styles/production-theme.css';

export default function App() {
  return <RouterProvider router={router} />;
}
