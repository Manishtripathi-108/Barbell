import '@/app/globals.css';
import { ThemeScript } from '@/hooks/useTheme';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className="scroll-smooth">
            <head>
                {/* <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" async /> */}
                <meta name="google-site-verification" content="" />
                <meta name="apple-mobile-web-app-title" content="" />
                <ThemeScript />
            </head>
            <body className={`bg-primary scrollbar-thin font-karla transition-colors duration-300`}>{children}</body>
        </html>
    );
};

export default RootLayout;
