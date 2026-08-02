import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Tabs from './components/tabs';
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Lovely front end for Euroclient',
    description: 'Consumes the Euroclient API and displays the data in a user friendly way. Links package via pnpm link',
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html
            lang='en'
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            {...mantineHtmlProps}
        >
            <head>
                <ColorSchemeScript />
            </head>
            <body className='h-full flex flex-col'>
                <MantineProvider>
                    <Tabs/>
                    <div className='flex-1 min-h-0 overflow-hidden'>
                        {children}
                    </div>
                </MantineProvider>
            </body>
        </html>
    );
};

export default RootLayout;
