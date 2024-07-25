// global.d.ts
interface Window {
    Telegram: {
      WebApp: {
        initData: {
          user: {
            id: string;
            first_name: string;
            // Add other user properties as needed
          };
        };
      };
    };
  }
  