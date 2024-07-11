"use client"
import React, { useState } from 'react';
import { Button, Form, Input, Layout, message } from 'antd';
import goCanvas from '../../../public/normal_u1.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Role } from '@/components/common/sidebarItems';

const token = process.env.NEXT_PUBLIC_BACKEND_TOKEN;

const headerContentWithAuthorization = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
}

const headers = () => {
  let copiedHeaderContentWithAuthorization = {
    ...headerContentWithAuthorization
  }
  copiedHeaderContentWithAuthorization['Authorization'] = `Bearer ${token}`
  return copiedHeaderContentWithAuthorization
}

const App: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    const { email, password } = values;

    try {
      const response = await fetch('/feapi/auth/login', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        window.localStorage.setItem('isAuthenticated', 'true');

        const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${data.user.id}?populate=*`;
        const user = await fetch(URL, {
          method: 'GET',
          headers: headers()
        })
        const result = await user.json();
        window.localStorage.setItem('role', result.role.name)

        // Role-based routing
        if (result.role.name === 'Authenticated') {
          router.push('/pages/admin/dashboard');
        } else if (result.role.name === 'Public') {
          router.push('/pages/customer/dashboard');
        }
        return data;

      } else {
        const errorData = await response.json();
        message.error(errorData.data.error.message || 'Login failed');
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Image
        src={goCanvas}
        alt='_logo'
        style={{
          width: '225px',
          height: '72px',
          boxSizing: 'border-box',
          margin: '87px 0 0 812px',
        }}
      />
      <Form
        name="login"
        onFinish={onFinish}
        style={{
          width: '423px',
          height: '344px',
          margin: '20px 728px',
          padding: 0,
          border: '1px solid #d8d8d8',
          borderRadius: '30px',
          boxShadow: ' 5px 10px 25px 0px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}>
        <p
          style={{
            width: '215px',
            height: '38px',
            margin: '20px 0 0 15px',
            // padding: '20px 8px 2px 8px',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
            fontFamily: `"Arial Bold", "Arial", sans-serif`,
            fontWeight: '700',
            color: '#333333',
            textAlign: 'left',
            // lineHeight: 'normal',
            fontSize: '30px'
          }}>
          Sign In
        </p>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          style={{ margin: '20px 14px 0 15px' }}
        >
          <Input
            placeholder="user@email.com"
            style={{
              width: '394px',
              height: '50px',
              padding: '8px 8px 8px 8px',
              borderRadius: '8px',
              border: '1px solid #d8d8d8',
              backgroundColor: '#ffffff',
              boxSizing: 'border-box',
              fontFamily: '"Arial", sans-serif',
              color: '#999999',
              textAlign: 'left',
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          style={{ margin: '10px 14px 10px 15px' }}
        >
          <Input.Password
            placeholder="password"
            style={{
              width: '394px',
              height: '50px',
              padding: '8px 8px 8px 8px',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              boxSizing: 'border-box',
            }}
          />
        </Form.Item>
        <a
          href=""
          style={{
            width: '121px',
            height: '26px',
            margin: '10px 230px 10px 15px',
            // marginTop: '10px',
            padding: '2px 8px 2px 8px',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            boxSizing: 'border-box',
            fontFamily: '"Arial Bold", "Arial", sans-serif',
            fontWeight: '700',
            color: '#156082',
            textAlign: 'left',
            // lineHeight: 'normal'
          }}>
          Forgot password?
        </a>
        <Form.Item style={{ margin: '10px 14px 10px 15px' }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              width: ' 394px',
              height: '40px',
              padding: '2px 8px 2px 8px',
              borderRadius: '30px',
              backgroundColor: '#156082',
              boxSizing: 'border-box',
              fontFamily: '"Arial", sans-serif',
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 'normal'
            }}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default App;
