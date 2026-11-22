import { Space_Grotesk } from 'next/font/google';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemeScript } from '@/components/providers/ThemeScript';
import { ToastProvider } from '@/components/providers/ToastProvider';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className="scroll-smooth">
            <head>
                {/* <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" async /> */}
                <meta name="google-site-verification" content="" />
                <meta name="apple-mobile-web-app-title" content="" />
                <ThemeScript />
            </head>
            <body className={`${spaceGrotesk.variable} bg-background font-sans transition-colors duration-300`}>
                <ThemeProvider>
                    {children}
                    <ToastProvider />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
