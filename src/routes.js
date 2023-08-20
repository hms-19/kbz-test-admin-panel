import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Page404 from './pages/Page404';
import Blogs from './pages/blogs/Blogs';
import BlogManage from './pages/blogs/BlogManage';
import BlogDetails from './pages/blogs/BlogDetails';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/blogs" />, index: true },
        { path: 'blogs', element:  <Blogs /> },
        { path: 'blogs/manage', element:  <BlogManage /> },
        { path: 'blogs/details/:id', element:  <BlogDetails /> },
    
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/blogs" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}