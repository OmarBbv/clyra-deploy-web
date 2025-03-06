import Layout from '@/layouts/Layout';
import AuthPages from '@/pages/AuthPage';
import Home from '@/pages/Home';
import LessonPage from '@/pages/LessonPage';
import StoryPage from '@/pages/StoryPage';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'stories',
        element: <StoryPage />,
      },
      {
        path: 'lessons',
        element: <LessonPage />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthPages />,
  },
]);

export default router;
