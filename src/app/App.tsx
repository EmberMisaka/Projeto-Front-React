import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { Toaster } from './components/ui/sonner';
import { router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ChatProvider>
    </AuthProvider>
  );
}