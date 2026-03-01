import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Mono, Montserrat, Cairo, Syne, DM_Sans } from 'next/font/google'
import 'flag-icons/css/flag-icons.min.css'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getLocale} from 'next-intl/server';

import './globals.css'
import { SmoothScrollProvider } from '@/providers/smooth-scroll'
import { MotionProvider } from '@/providers/motion-provider'
import { AuthProvider } from '@/context/auth-context'
import { ProfileProvider } from '@/context/profile-context'
import GridBackground from '@/components/GridBackground'
import { RTLProvider } from '@/components/rtl-provider'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '800', '900'], variable: '--font-inter' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '700', '800', '900'], variable: '--font-cairo' })
const syne = Syne({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-syne' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-dm-sans' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://myfoundersclub.com'),
  title: 'MY FOUNDERS CLUB | شبكة المؤسسين والمستثمرين',
  description:
    "Build Locally. Champion Regionally. Scale Globally. The Gulf's ecosystem operating system connecting founders, capital, and opportunity globally. | بناء محلياً. تطور إقليمياً. توسع عالمياً.",
  generator: 'Next.js',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#050505',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
      <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${inter.variable} ${spaceMono.variable} ${montserrat.variable} ${cairo.variable} ${syne.variable} ${dmSans.variable} dark scroll-smooth`}>
        <body className={`antialiased bg-background text-foreground [font-family:var(--font-dm-sans)]`} suppressHydrationWarning>
          <GridBackground />
          <NextIntlClientProvider messages={messages}>
            <RTLProvider />
            <AuthProvider>
              <ProfileProvider>
                <MotionProvider>
                  <SmoothScrollProvider>
                    <div className="bg-page relative min-h-screen">
                      <div className="relative z-10 bg-transparent">{children}</div>
                    </div>
                  </SmoothScrollProvider>
                </MotionProvider>
              </ProfileProvider>
            </AuthProvider>
          </NextIntlClientProvider>
      </body>
    </html>
  )
}
