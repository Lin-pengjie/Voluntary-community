import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
)
