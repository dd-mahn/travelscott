import Analytics from '@analytics/google-analytics';
import { onCLS, onFID, onLCP } from 'web-vitals';

const analytics = Analytics({
  app: 'travelscott',
  plugins: [
    {
      name: 'google-analytics',
      googleAnalyticsId: 'UA-XXXXXXXX-X'
    }
  ]
});

export function initializeAnalytics() {
  // Report Core Web Vitals
  onCLS(metric => analytics.track('CLS', metric));
  onFID(metric => analytics.track('FID', metric));
  onLCP(metric => analytics.track('LCP', metric));

  // Page Views
  analytics.page();

  return analytics;
}
