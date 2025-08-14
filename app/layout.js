import './globals.css';
import AuthProvider from './AuthProvider';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Next.js Task Manager',
  description: 'A full-stack task manager application.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}