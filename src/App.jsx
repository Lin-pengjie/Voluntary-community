import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import router from '@/router/RouteConfig';
import { Space, Spin } from 'antd';

function App() {
  // 由于路由组件是懒加载的，渲染页面可能会有延迟，使用Suspense 可优化交互
  const RouteEleMent = (route) => {
    if (!route.element) {
      return null;
    }
    return (
      <Suspense fallback={
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Spin tip="Loading" size="large">
            <div style={{padding:"50px", background:'rgba(0, 0, 0, 0.05)', borderRadius:"4px"}} />
          </Spin>
        </Space>
      }>
        {route.element}
      </Suspense>
    );
  };
  // 通过每个路由对象渲染Route
  const RouteItem = (route) => {
    return (
      <Route key={route.key} element={RouteEleMent(route)} path={route.path}>
        {RouteList(route.children ?? [])}
      </Route>
    );
  };
  // 根据配置的routeconfig 生成Route
  const RouteList = (list) => {
    return list.map((item) => RouteItem(item));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {RouteList(router)}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;