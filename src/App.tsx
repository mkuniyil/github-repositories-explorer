import { AppProvider } from "./providers/AppProvider";
import { AppLayout } from "./components/application/AppLayout";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";

export const App = () => {
  return (
    <ReactQueryProvider>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </ReactQueryProvider>
  );
};
