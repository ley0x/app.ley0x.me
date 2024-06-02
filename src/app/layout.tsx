import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from "./providers";
import './globals.css'
import SidebarWithHeader from '@/components/sidebar/sidebar';
import { LightMode } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ley0x - Music',
  description: 'ley0x - Music, create your top albums list and share it with your friends.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          <LightMode >
            <SidebarWithHeader>
              {children}
            </SidebarWithHeader>
          </LightMode>
        </Providers>
      </body>
    </html>
  )
}
