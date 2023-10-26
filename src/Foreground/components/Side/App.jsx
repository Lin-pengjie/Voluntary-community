import { ConfigProvider } from 'antd';


export default function App() {
  return (
    <ConfigProvider
          theme={{
            token: {
              // Seed Token，影响范围大
              colorPrimary: 'linear-gradient(to right, #da1f28, #ffa39e)',
              borderRadius: 2,

              // 派生变量，影响范围小
              colorBgContainer: 'linear-gradient(to right, #da1f28, #ffa39e)',
            },
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ flex: 3, background: "red" }}>Div 1</div>
            <div style={{ flex: 5, background: "blue" }}>
            
            </div>
          </div>
        </ConfigProvider>
  )
}
