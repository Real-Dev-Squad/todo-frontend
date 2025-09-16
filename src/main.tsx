import { router } from '@/router'
import { RouterProvider } from '@tanstack/react-router'
import React from 'react'
import { createRoot } from 'react-dom/client'
import Providers from './components/layout/providers'
import './index.css'
import { enableMocking } from './mocks/setup'

function renderApp() {
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </React.StrictMode>,
  )
}

enableMocking()
  .catch((error) => {
    console.error('Mocking failed', error)
  })
  .finally(renderApp)
