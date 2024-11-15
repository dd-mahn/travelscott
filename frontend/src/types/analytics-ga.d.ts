declare module '@analytics/google-analytics' {
    interface AnalyticsPlugin {
      name: string;
      googleAnalyticsId: string;
    }
  
    interface AnalyticsConfig {
      app: string;
      plugins: AnalyticsPlugin[];
    }
  
    interface AnalyticsInstance {
      track: (event: string, payload: any) => void;
      page: () => void;
    }
  
    export default function Analytics(config: AnalyticsConfig): AnalyticsInstance;
  }