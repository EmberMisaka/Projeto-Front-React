import { createBrowserRouter, Navigate } from 'react-router';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Provider from './pages/Provider';
import Client from './pages/Client';
import ProviderProfile from './pages/ProviderProfile';
import ChatCheckout from './pages/ChatCheckout';
import Careers from './pages/Careers';
import Admin from './pages/Admin';
import UserProfile from './pages/UserProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/careers',
    Component: Careers,
  },
  {
    path: '/admin',
    Component: Admin,
  },
  {
    path: '/profile/:userId',
    Component: UserProfile,
  },
  {
    path: '/provider',
    Component: Provider,
  },
  {
    path: '/provider/:providerId',
    Component: ProviderProfile,
  },
  {
    path: '/client',
    Component: Client,
  },
  {
    path: '/chat/:conversationId?',
    Component: ChatCheckout,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);