'use client'

import { GetProp, Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import goCanvas from '../../../public/normal_u1.png';
import sidebarDashboard from '../../../public/sidebarDashboardIcon.png'
import inspection from '../../../public/normal_u17.png';
import userManagementIcon from '../../../public/userManagementIcon.png';
import Image from "next/image";
import { Role } from './sidebarItems';
import Sidebar from "./sidebar";
import { usePathname } from "next/navigation";
import Notification from "./notification";
import Profile from "./profile";

const layoutStyle: React.CSSProperties = {
  minHeight: '100vh'
}

const siderStyle: React.CSSProperties = {
  minWidth: '200px',
  // height: '1200px',
  padding: '2px 2px 2px 2px',
  boxSizing: 'border-box',
  border: '1px solid #d8d8d8',
  backgroundColor: '#ffffff'
}

const headerStyle: React.CSSProperties = {
  // width: '1715px',
  height: '80px',
  padding: '2px 2px 2px 2px',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  border: '1px solid #d8d8d8'
}

const contentStyle: React.CSSProperties = {}
const footerStyle: React.CSSProperties = {}

type MenuItem = GetProp<MenuProps, 'items'>[number];
const items: MenuItem[] = [
  {
    key: '1',
    icon: <Image
      src={sidebarDashboard}
      alt='_logo'
      style={{
        width: '25px',
        height: '25px',
        boxSizing: 'border-box',
        marginTop: '13px'
      }} />,
    label: (
      <span style={{
        padding: '2px 8px 2px 8px',
        boxSizing: 'border-box',
        fontFamily: '"Arial", sans - serif',
        fontWeight: 'bold',
        color: '#156082',
        //textAlign: 'left',
        lineHeight: 'normal',
      }}>Dashboard</span>
    ),
  },
  {
    key: '1',
    icon: <Image
      src={inspection}
      alt='_logo'
      style={{
        width: '25px',
        height: '25px',
        boxSizing: 'border-box',
        marginTop: '13px'
      }} />,
    label: (
      <span style={{
        padding: '2px 8px 2px 8px',
        boxSizing: 'border-box',
        fontFamily: '"Arial", sans - serif',
        fontWeight: 'bold',
        color: '#156082',
        //textAlign: 'left',
        lineHeight: 'normal',
      }}>Inspections</span>
    ),
  },
  {
    key: '1',
    icon: <Image
      src={userManagementIcon}
      alt='_logo'
      style={{
        width: '25px',
        height: '25px',
        boxSizing: 'border-box',
        marginTop: '13px'
      }} />,
    label: (
      <span style={{
        width: '143px',
        height: '49px',
        padding: '2px 8px 2px 8px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxSizing: 'border-box',
        fontFamily: ' "Arial", sans - serif',
        fontWeight: 'bold',
        color: '#156082',
        textAlign: 'left',
        lineHeight: 'normal'
      }}>User Management</span>
    ),
  },
];

const HeaderContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const DashboardLayout = ({ children, activeRole }: { children: React.ReactNode, activeRole: Role }) => {
  const pathname = usePathname();

  let headerContent;
  switch (pathname) {
    case '/pages/admin/dashboard':
      headerContent = <>Welcome back, Admin</>;
      break;
    case '/pages/admin/technicians':
      headerContent = <>Technicians</>;
      break;
    case '/pages/admin/inspections':
      headerContent = <>Inspections</>;
      break;
    case '/pages/admin/usermanagement':
      headerContent = <>User Management</>;
      break;
    case '/pages/admin/payroll':
      headerContent = <>Payroll</>;
      break;
    case '/pages/customer/dashboard':
      headerContent = <>Welcome back, Greenwood Housing Authority (MS)</>;
      break;
    case '/pages/customer/reports':
      headerContent = <>Reports</>;
      break;
    case '/pages/customer/inspectionhistory':
      headerContent = <>Inspection History</>;
      break;
  }

  return (
    <Layout style={layoutStyle}>
      <Sider style={siderStyle}>
        <Image
          src={goCanvas}
          alt='_logo'
          style={{
            width: '157px',
            height: '50px',
            boxSizing: 'border-box',
            margin: '20px 10px 0 22px',
          }}
        />
        <Sidebar activeRole={activeRole} />
      </Sider>
      <Layout> <Header style={headerStyle}>
        <div style={HeaderContainerStyle}>
          <div
            style={{
              width: '1031px',
              height: '65px',
              padding: '2px 8px 2px 8px',
              // backgroundColor: 'rgba(255, 255, 255, 0)',
              boxSizing: 'border-box',
              fontFamily: '"Arial Bold", "Arial", sans-serif',
              fontWeight: '700',
              color: '#000000',
              textAlign: 'left',
              lineHeight: 'normal',
              fontSize: '40px',
              margin: '8px 0 7px 20px'
            }}>
            {headerContent}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{  }}>
              <Notification />
            </div>
            <div>
              <Profile />
            </div>
          </div>
        </div>
      </Header>
        <Content style={contentStyle}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout;
