import AppRoutes from "./Containers/Routes";
import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';

function App() {
  return (
    <ConfigProvider 
      locale={ptBR}
      theme={{
        token: {
          colorPrimary: '#f28234',
        },
      }}
    >
      
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
