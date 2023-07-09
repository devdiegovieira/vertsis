import AppRoutes from "./Containers/Routes";
import { ConfigProvider, theme } from 'antd';
import ptBR from 'antd/locale/pt_BR';


function App() {
  return (
    <ConfigProvider 
      locale={ptBR}
      theme={{
        algorithm: localStorage.getItem('theme') == 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
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
