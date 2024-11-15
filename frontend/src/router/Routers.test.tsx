import { describe, it, expect } from 'vitest';
import { router } from 'src/router/Routers';
import React from 'react';
import { RouteObject } from 'react-router-dom';

describe('Router Configuration', () => {
  it('should have the root route configured', () => {
    const rootRoute = router.routes[0];
    expect(rootRoute.path).toBe('/');
  });

  it('should have all expected child routes', () => {
    const childRoutes = router.routes[0].children;
    const expectedPaths = [
      '/',
      '/about',
      '/contact',
      '/discover',
      '/discover/countries/:id',
      '/discover/destinations/:id',
      '/inspiration',
      '/inspiration/:id',
      '/privacy'
    ];

    // Check if all expected paths exist
    expectedPaths.forEach(path => {
      const routeExists = childRoutes?.some(route => route.path === path);
      expect(routeExists).toBe(true);
    });

    // Check if number of routes matches
    expect(childRoutes?.length).toBe(expectedPaths.length);
  });

  it('should have Suspense wrapper for all child routes', () => {
    const childRoutes = (router.routes[0].children as RouteObject[]);
    
    childRoutes?.forEach(route => {
      const element = route.element as React.ReactElement;
      expect(element.type).toBe(React.Suspense);
      expect(element.props.fallback).toBeTruthy();
    });
  });
});
