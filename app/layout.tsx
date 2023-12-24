import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@radix-ui/themes/styles.css';
import './globals.css'
import { Theme } from '@radix-ui/themes';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import AuthProvider from './providers/auth-provider'
import 'react-loading-skeleton/dist/skeleton.css'
import QueryClientProvider from './providers/query-client-provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fosi - Ask your question here',
  description: 'You can ask your question here',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
        <body className={inter.className}>
          <QueryClientProvider>
            <AuthProvider>
              <Theme>
                <ToastContainer
                    position="top-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                  {children}
              </Theme>
            </AuthProvider>
          </QueryClientProvider>
        </body>
    </html>
  )
}
