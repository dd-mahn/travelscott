import React from 'react'
import { render, RenderOptions as RTLRenderOptions } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { RootState } from 'src/store/store'
import { NotificationProvider } from 'src/context/NotificationContext/NotificationContext'
import inspirationReducer from 'src/store/slices/inspirationSlice'
import blogReducer from 'src/store/slices/blogSlice'
import filterReducer from 'src/store/slices/filterSlice'
import countryReducer from 'src/store/slices/countrySlice'
import destinationReducer from 'src/store/slices/destinationSlice'
import continentReducer from 'src/store/slices/continentSlice'
import themeReducer from 'src/store/slices/themeSlice'

interface ExtendedRenderOptions extends Omit<RTLRenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
  route?: string;
  initialEntries?: string[];
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    route = '/',
    initialEntries = ['/'],
    store = configureStore({
      reducer: {
        inspiration: inspirationReducer as any,
        blog: blogReducer as any,
        filter: filterReducer as any,
        country: countryReducer as any,
        destination: destinationReducer as any,
        continent: continentReducer as any,
        theme: themeReducer as any,
      },
      preloadedState
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    const Router = route ? MemoryRouter : BrowserRouter
    return (
      <Provider store={store}>
        <NotificationProvider>
          <Router initialEntries={initialEntries}>
            {route ? (
              <Routes>
                <Route path={route} element={children} />
              </Routes>
            ) : (
              children
            )}
          </Router>
        </NotificationProvider>
      </Provider>
    )
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}
