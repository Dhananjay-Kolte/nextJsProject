'use client'
import { ExportOutlined } from "@ant-design/icons"
import { Button, Input, Modal, Select, Space, Table, TableColumnsType } from "antd"
import { useState } from "react"

const selectionStyle: React.CSSProperties = {
  width: '149px',
  height: '42px',
  padding: '2px 8px 2px 8px',
  borderRadius: '10px',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
  fontFamily: `"Arial", sans-serif`,
  color: '#000000',
  textAlign: 'center',
  lineHeight: 'normal',
  margin: '0 0 0 20px',
  marginTop: '20px'
}

const filterStyle: React.CSSProperties = {
  width: '149px',
  height: '35px',
  padding: '2px 8px 2px 8px',
  borderRadius: '4px',
  border: '1px solid #d8d8d8',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#000000',
  textAlign: 'left',
  marginLeft: '20px'
}

const contentStyle: React.CSSProperties = {
  width: '135px',
  height: '25px',
  padding: '2px 8px 2px 8px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#333333',
  textAlign: 'left',
  lineHeight: 'normal',
  fontSize: 'small',
  margin: '10px 0 0 20px'
}

const layoutStyle: React.CSSProperties = {
  width: '1421px',
  height: '575px',
  // padding: '2px 8px 2px 8px',
  borderRadius: '15px',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
  marginLeft: '20px'
}

const headerCellStyle: React.CSSProperties = {
  // width: '1422px',
  height: '36px',
  padding: '2px 10px 2px 10px',
  // border: '1px solid #797979',
  backgroundColor: '#f2f2f2',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#333333',
  // textAlign: 'center',
  lineHeight: 'normal',
}

const buttonModelStyle: React.CSSProperties = {
  width: '167px',
  height: '35px',
  padding: '2px 8px 2px 8px',
  borderRadius: '10px',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
  fontFamily: `"Arial", sans-serif`,
  border: '1px solid #156082',
  color: '#156082',
  textAlign: 'center',
  lineHeight: 'normal',
}

interface adminColumnsType {
  key: React.Key,
  userID: number,
  employeeName: string,
  email: string,
  phoneNumber: number,
  employeeID: number,
  status: string,
}

interface customerColumnsType {
  key: React.Key,
  customerID: number,
  customerName: string,
  customerLocation: string,
  customerContact: number,
  phoneNumber: number,
  status: string
}

const activeButtonStyle = {
  ...selectionStyle,
  backgroundColor: '#156082',
  fontWeight: 'bold',
  color: '#ffffff',
};

const activeModelButtonStyle = {
  ...buttonModelStyle,
  backgroundColor: '#156082',
  fontWeight: 'bold',
  color: '#ffffff',
};

const renderStatus = (text: any, record: any) => {
  const status = record.status;
  let backgroundColor;
  switch (text || status) {
    case 'Active':
      backgroundColor = '#63a103';
      break;
    case 'Inactive':
      backgroundColor = '#910012';
      break;
  }

  return (
    <div
      style={{
        backgroundColor,
        width: '100px',
        height: '23px',
        padding: '2px 8px 2px 8px',
        borderRadius: '5px',
        boxSizing: 'border-box',
        fontFamily: `"Arial", sans-serif`,
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 'normal'
      }}
    >
      {text || status}
    </div>
  );
};

const adminData = [
  {
    userId: '77068',
    employeeName: 'John Doe',
    email: 'john@company.com',
    phoneNumber: '123-456-7890',
    employeeID: 'E123456',
    status: 'Active'
  },
  {
    userId: '77067',
    employeeName: 'Jane Smith',
    email: 'jane@company.com',
    phoneNumber: '987-654-3210',
    employeeID: 'E123456',
    status: 'Active'
  },
  {
    userId: '77066',
    employeeName: 'David Brown',
    email: 'david@company.com',
    phoneNumber: '789-012-3456',
    employeeID: 'E123456',
    status: 'Active'
  },
  {
    userId: '77065',
    employeeName: 'Stacey Trent',
    email: 'stacey@company.com',
    phoneNumber: '456-789-0123',
    employeeID: 'E123456',
    status: 'Active'
  },
  {
    userId: '77068',
    employeeName: 'John Doe',
    email: 'john@company.com',
    phoneNumber: '789-012-3456',
    employeeID: 'E123456',
    status: 'Active'
  }
]

const customerData = [
  {
    customerID: 'C-98151',
    customerName: 'Lynchburg Redevelopment and Housing Authority (VA)',
    customerLocation: '123 Main Street, Richmond, VA 23220',
    customerContact: 'ethan@lynchburgrha.com',
    phoneNumber: '601-555-5678',
    status: 'Active'
  },
  {
    customerID: 'C-96984',
    customerName: 'Greenwood Housing Authority (MS)',
    customerLocation: '456 Elm Street, Jackson, MS 39201',
    customerContact: 'reggie@greenwoodha.com',
    phoneNumber: '213-555-9012',
    status: 'Active'
  },
  {
    customerID: 'C-96864',
    customerName: 'City of Los Angeles Housing Authority (CA)',
    customerLocation: '789 Oak Avenue, Los Angeles, CA 90001',
    customerContact: 'mason@losangelesha.com',
    phoneNumber: '919-555-3456',
    status: 'Active'
  },
  {
    customerID: 'C-94436',
    customerName: 'Laurinburg Housing Authority (NC)',
    customerLocation: '101 Pine Lane, Raleigh, NC 27601',
    customerContact: 'sophia@laurinburgha.com',
    phoneNumber: '305-555-6789',
    status: 'Active'
  },
]

const Usermanagement: React.FC = () => {
  const [activeButton, setActiveButton] = useState('admin');
  const [activeModelButton, setModelActiveButton] = useState('');
  const [isAdminModal, setAdminModalOpen] = useState(false);
  const [isCustomerModal, setCustomerModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleCancel = () => {
    setAdminModalOpen(false);
    setCustomerModalOpen(false);
  };

  const showAdminModal = () => {
    setAdminModalOpen(true);
  };

  const showCustomerModal = () => {
    setCustomerModalOpen(true);
  };

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
  };

  const handleModelButtonClick = (buttonType: string) => {
    setModelActiveButton(buttonType);
    if (buttonType === 'edit') {
      setIsEditable(true);
    }
    if (buttonType === 'update') {
      setIsEditable(false);
      setAdminModalOpen(false);
      setCustomerModalOpen(false);
    }
  }

  const inputModelStyle: React.CSSProperties = {
    width: '621px',
    height: '35px',
    padding: '8px 8px 8px 8px',
    borderRadius: '8px',
    border: '1px solid #d8d8d8',
    backgroundColor: '#f0f0f0',
    boxSizing: 'border-box',
    fontFamily: `"Arial", sans-serif`,
    color: ' #000000',
    textAlign: 'left',
    pointerEvents: isEditable ? 'auto' : 'none',
  }

  const adminColumns: TableColumnsType<any> = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userID',
      width: '177px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Employee Name',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: '266px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '266px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '177px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Employee ID',
      dataIndex: 'employeeID',
      key: 'employeeID',
      width: '177px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '177px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
      render: renderStatus
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
      key: 'actions',
      width: '182px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
      render: () => (
        <ExportOutlined
          onClick={showAdminModal}
          style={{
            fontSize: 'larger',
          }} />
      )
    }
  ]

  const customerColumns: TableColumnsType<any> = [
    {
      title: 'Customer ID',
      dataIndex: 'customerID',
      key: 'customerID',
      width: '125px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      width: '200px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Customer Location',
      dataIndex: 'customerLocation',
      key: 'customerLocation',
      width: '314px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Customer Contact',
      dataIndex: 'customerContact',
      key: 'customerContact',
      width: '274px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '150px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '177px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
      render: renderStatus
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: '182px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
      render: () => (
        <ExportOutlined
          onClick={showCustomerModal}
          style={{
            fontSize: 'larger',
          }} />
      )
    },
  ]

  return (
    <>
      <Space direction="vertical">
        <Space direction="horizontal">
          <Button
            style={activeButton === 'admin' ? activeButtonStyle : selectionStyle}
            onClick={() => handleButtonClick('admin')}>
            Admin
          </Button>
          <Button
            style={activeButton === 'customer' ? activeButtonStyle : selectionStyle}
            onClick={() => handleButtonClick('customer')}>
            Customer
          </Button>
          <Button
            style={{
              width: '149px',
              height: '42px',
              padding: '2px 8px 2px 8px',
              borderRadius: '10px',
              backgroundColor: '#156082',
              boxSizing: 'border-box',
              boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
              fontFamily: `"Arial", sans-serif`,
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 'normal',
              margin: '20px 0 0 940px',
            }}>
            Add User
          </Button>
        </Space>

        <Space direction="horizontal">
          <div>
            <p style={contentStyle}>ID</p>
            <Input style={filterStyle} />
          </div>
          <div>
            <p style={contentStyle}>Name</p>
            <Input style={filterStyle} />
          </div>
        </Space>

        <Space style={layoutStyle}>
          {activeButton === 'admin' && (
            <Table
              columns={adminColumns}
              dataSource={adminData}
              style={{
                marginTop: '21px',
                width: '1422px',
                height: '544px',
                padding: '2px 2px 2px 2px',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                boxSizing: 'border-box'
              }}
            />
          )}
          {activeButton === 'customer' && (
            <Table
              columns={customerColumns}
              dataSource={customerData}
              style={{
                marginTop: '21px',
                width: '1422px',
                height: '544px',
                padding: '2px 2px 2px 2px',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                boxSizing: 'border-box'
              }}
            />
          )}
        </Space>
      </Space >

      <Modal
        centered
        open={isAdminModal}
        onCancel={handleCancel}
        closable={false}
        width={'661px'}
        footer={[]}
      >
        <Space direction="vertical">
          <Space direction="horizontal">
            <p style={{
              width: '250px',
              height: '21px',
              padding: '2px 8px 2px 0px',
              fontWeight: '700',
              fontSize: 'large'
            }}>Admin Profile</p>
            <Button
              style={activeModelButton === 'edit' ? activeModelButtonStyle : buttonModelStyle}
              onClick={() => handleModelButtonClick('edit')}
            >
              Edit Button</Button>
            <Button
              style={activeModelButton === 'update' ? activeModelButtonStyle : buttonModelStyle}
              onClick={() => handleModelButtonClick('update')}
            >
              Save Changes</Button>
          </Space>

          <Space direction="vertical" style={{ marginTop: '6px' }}>
            <Space direction="vertical">
              <p style={{ fontSize: 'small' }}>User ID
                <Input style={inputModelStyle} />
              </p>
            </Space>
            <Space direction="vertical">
              <p style={{ fontSize: 'small' }}>Employee Name
                <Input style={inputModelStyle} />
              </p>
            </Space>
            <Space direction="vertical">
              <p style={{ fontSize: 'small' }}>Email
                <Input style={inputModelStyle} />
              </p>
            </Space>
            <Space direction="vertical">
              <p style={{ fontSize: 'small' }}>Phone Number
                <Input style={inputModelStyle} />
              </p>
            </Space>
            <Space direction="vertical">
              <p style={{ fontSize: 'small' }}>Employee ID
                <Input style={inputModelStyle} />
              </p>
            </Space>
            <Space direction="vertical">
              <p style={{ fontSize: 'small' }}>Status
                <Select
                  placeholder={'Active'}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                  style={{
                    width: '621px',
                    height: '35px',
                    borderRadius: '8px',
                    border: '1px solid #d8d8d8',
                    backgroundColor: '#f0f0f0',
                    color: ' #000000',
                    pointerEvents: isEditable ? 'auto' : 'none',
                  }}
                />
              </p>
            </Space>
          </Space>

        </Space>
      </Modal>

      <Modal
        centered
        open={isCustomerModal}
        onCancel={handleCancel}
        closable={false}
        width={'661px'}
        footer={[]}
      >
        <Space direction="vertical">
          <Space direction="horizontal">
            <p style={{
              width: '250px',
              height: '21px',
              padding: '2px 8px 2px 0px',
              fontWeight: '700',
              fontSize: 'large'
            }}>Customer Profile</p>
            <Button
              style={activeModelButton === 'edit' ? activeModelButtonStyle : buttonModelStyle}
              onClick={() => handleModelButtonClick('edit')}
            >
              Edit Button</Button>
            <Button
              style={activeModelButton === 'update' ? activeModelButtonStyle : buttonModelStyle}
              onClick={() => handleModelButtonClick('update')}
            >
              Save Changes</Button>
          </Space>
          <Space direction="vertical" style={{ marginTop: '6px' }}>
            <Space direction="vertical">
              <p style={{ fontSize: 'small' }}>Customer ID
                <Input style={inputModelStyle} />
              </p>
            </Space>
            <Space direction="vertical">
              <p style={{ fontSize: 'small' }}>Customer Name
                <Input style={inputModelStyle} />
              </p>
            </Space>
            <Space direction="vertical">
              <p style={{ fontSize: 'small' }}>Customer Location
                <Input style={inputModelStyle} />
              </p>
            </Space>
            <Space direction="vertical">
              <p style={{ fontSize: 'small' }}>Customer Contact
                <Input style={inputModelStyle} />
              </p>
            </Space>
            <Space direction="vertical">
              <p style={{ fontSize: 'small' }}>Phone Number
                <Input style={inputModelStyle} />
              </p>
            </Space>
            <Space direction="vertical">
              <p style={{ fontSize: 'small' }}>Status
                <Select
                  placeholder={'Active'}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                  style={{
                    width: '621px',
                    height: '35px',
                    borderRadius: '8px',
                    border: '1px solid #d8d8d8',
                    backgroundColor: '#f0f0f0',
                    color: ' #000000',
                    pointerEvents: isEditable ? 'auto' : 'none',
                  }}
                />
              </p>
            </Space>
          </Space>
        </Space>
      </Modal>
    </>
  )
}

export default Usermanagement;
