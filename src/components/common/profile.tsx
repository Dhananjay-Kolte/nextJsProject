import React from 'react';
import profileIcon from '../../../public/profileIcon.png'
import Image from 'next/image';

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
    return (
        <div>
            <Image src={profileIcon} alt='profile' width={46} height={46} style={{ marginRight: '10px' }} />
        </div>
    );
};

export default Profile;
