// Sidebar.tsx
import React, { useState } from 'react';
import { sidebarItems, Role } from './sidebarItems';
import Link from 'next/link';
import Image from 'next/image';
import signoutIcon from '../../../public/signoutIcon.png'
import settingsIcon from '../../../public/settingsIcon.svg'
import { Button } from 'antd';
import SignoutModal from './signoutModal';

type SidebarProps = {
  activeRole: Role;
};

const labelStyle: React.CSSProperties = {
  color: '#333333',
  fontFamily: '"Arial", sans-serif',
  padding: '2px 8px 2px 8px',
  borderColor: '#ffffff'
}

const sidebarContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '90vh',
  justifyContent: 'space-between',
};

const Sidebar: React.FC<SidebarProps> = () => {
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const showSignOutModal = () => {
    setIsSignOutModalOpen(true)
  }
  const closeSignOutModal = () => {
    setIsSignOutModalOpen(false);
  }

  const role = window.localStorage.getItem('role') as Role | null;
  const items = role && sidebarItems[role] ? sidebarItems[role] : [];

  return (
    <div style={sidebarContainerStyle}>
      <div>
        {items.map((item: any, index: any) => (
          <div key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px',
              // width: '168px',
              // height: '49px'
            }}>
            <Image src={item.iconSrc} alt={item.label} width={25} height={25} style={{ margin: '20px 20px 0px 20px', boxSizing: "border-box" }} />
            <Link
              href={item.link}
              style={{
                padding: '2px 8px',
                boxSizing: 'border-box',
                fontFamily: 'Arial, sans-serif',
                // fontWeight: 'bold',
                color: '#333333',
                lineHeight: 'normal',
                marginTop: '20px',
              }}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '3px 20px' }}>
          <Image src={settingsIcon} alt='settings' width={15} height={15} style={{ marginRight: '10px' }} />
          <Button style={labelStyle}>Settings</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '3px 20px' }}>
          <Image src={signoutIcon} alt='signout' width={15} height={15} style={{ marginRight: '10px' }} />
          <Button style={labelStyle} onClick={showSignOutModal}>Sign Out</Button>
        </div>
      </div>
      {isSignOutModalOpen && <SignoutModal onClose={closeSignOutModal} />}
    </div>
  );
};

export default Sidebar;
