// header는 희라님이 하시고 싶대용
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
