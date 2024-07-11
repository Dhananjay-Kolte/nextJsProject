import React from 'react';
import { Modal, Button } from 'antd';
import useAuth from '@/app/_auth/useAuth';
import { useRouter } from 'next/navigation';

type SignoutModalProps = {
    onClose: () => void;
};

const SignoutModal: React.FC<SignoutModalProps> = ({ onClose }) => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const router = useRouter();
    const logoutUser = () => {
        window.localStorage.removeItem('isAuthenticated');
        window.localStorage.removeItem('role');
        setIsAuthenticated(false);
        router.push("/login");
    }
    return (
        <Modal open={true} onCancel={onClose} footer={null} centered >
            <div>
                <div style={{ textAlign: 'center', fontFamily: '"Arial", sans-serif', fontSize: 'large', fontWeight: 'bold', paddingTop: '20px' }}>Are you sure you want to sign out?</div>
                <div style={{ textAlign: 'center', paddingTop: '15px' }}>
                    <Button onClick={onClose}>
                        No
                    </Button>
                    <Button onClick={logoutUser} style={{ marginLeft: '10px' }}>
                        Yes
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default SignoutModal;
