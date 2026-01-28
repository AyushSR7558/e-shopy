"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

const Provider = ({children}: {children:ReactNode}) => {
    const query = new QueryClient();
  return (
        <QueryClientProvider client={query}>
            {children}
        </QueryClientProvider>
  )
}

export default Provider
