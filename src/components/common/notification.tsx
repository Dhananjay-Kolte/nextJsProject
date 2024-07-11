import Image from 'next/image';
import React from 'react';
import notificationIcon from '../../../public/notificationIcon.svg'
type NotificationProps = {

};

const NotificationStyle: React.CSSProperties = {
    backgroundColor: ' #f2f2f2',
    border: '1px',
    borderColor:'#ffffff',
    borderStyle: 'solid',
    width: "46px",
    height: "46px",
    borderRadius: '50px',
    display: 'flex', // Add flexbox
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
    marginRight:'10px'
}

const Notification: React.FC<NotificationProps> = () => {
    return (
        <div style={NotificationStyle}>
            <Image src={notificationIcon} alt='notification' width={24} height={24} />
        </div>
    );
};

export default Notification;
