import { TanStackDevtools } from '@tanstack/react-devtools';
import {
  HeadContent,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import { Footer } from '../globals/components/Footer';
import { Header } from '../globals/components/Header';

import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'hook-wrapper' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=4' },
    ],
  }),

  shellComponent: ({ children }) => {
    return (
      <html
        lang='en'
        suppressHydrationWarning
      >
        <head>
          <HeadContent />
        </head>
        <body className='bg-zinc-100 font-sans wrap-anywhere text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-100'>
          <div className='flex min-h-screen flex-col justify-between'>
            <Header />
            <div className='mt-16'>{children}</div>
            <Footer />
          </div>
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
          <Scripts />
        </body>
      </html>
    );
  },

  notFoundComponent: () => <div>404 - Page Not Found</div>, // Add this
});
