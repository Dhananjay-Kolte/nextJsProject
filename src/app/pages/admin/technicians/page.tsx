"use client"
import { ExportOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Modal, Select, Space, Table, TableColumnType, TableColumnsType } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

const technicianHeaderStyle: React.CSSProperties = {
  width: '260px',
  height: '36px',
  padding: '2px 10px 2px 10px',
  backgroundColor: '#f2f2f2',
  boxSizing: 'border-box',
  fontFamily: `"Arial Bold", "Arial", sans-serif`,
  fontWeight: '700',
  color: '#333333',
  textAlign: 'left',
  lineHeight: 'normal'
}

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

interface DataType {
  key: React.Key;
  technicianDetails: string;
  technicianDetailsNO: string;
  divison: string;
  role: string;
  activeServiceReq: string;
  status: string;
}

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
      className='text-center text-[14px]'
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

const contentStyle: React.CSSProperties = {
  width: '198px',
  height: '40px',
  // padding: '2px 8px 2px 8px',
  borderRadius: '8px',
  border: '1px solid #d8d8d8',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#000000',
  marginLeft: '20px'
}

const buttonStyle: React.CSSProperties = {
  width: '149px',
  height: '40px',
  // padding: '2px 8px 2px 8px',
  borderRadius: '10px',
  backgroundColor: '#156082',
  boxSizing: 'border-box',
  boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
  fontFamily: `"Arial", sans-serif`,
  color: ' #ffffff',
  textAlign: 'center',
  lineHeight: 'normal',
  marginTop: '45px',
  marginLeft: '20px'
}

const modelStyle: React.CSSProperties = {
  // width: '429px',
  height: '503px',
  //padding: '2px 2px 2px 2px',
  borderRadius: '15px',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)'
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

const modelContentStyle: React.CSSProperties = {
  width: '177px',
  height: '29px',
  padding: '2px 8px 2px 0px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans - serif`,
  color: '#333333',
  textAlign: 'left',
  lineHeight: 'normal',
  marginTop: '11px'

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

const technicianJSON = [
  {
    technicianDetails: 'Michael Brown',
    technicianDetailsNO: '397836',
    divison: 'Electrical Safety',
    role: 'Junior Technician',
    activeServiceReq: '1',
    status: 'Active'
  },
  {
    technicianDetails: 'John Smith',
    technicianDetailsNo: '200711',
    divison: 'HVAC Inspector',
    role: 'Field Service Technician',
    activeServiceReq: '2',
    status: 'Active'
  },
  {
    technicianDetails: 'Battery Compliance',
    technicianDetailsNO: '275545',
    divison: 'Emily Johnson',
    role: 'Maintenance Technician',
    activeServiceReq: '2',
    status: 'Inactive'
  },
  {
    technicianDetails: 'Sarah Davis',
    technicianDetailsNo: '344033',
    divison: 'Fire Prevention and Protection',
    role: 'Junior Technician',
    activeServiceReq: '1',
    status: 'Inactive'
  }
]

const Technicians: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTechnicianProfileModal, setisTechnicianProfileModal] = useState(false);
  const [activeModelButton, setModelActiveButton] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  const showTechnicianProfileModal = () => {
    setisTechnicianProfileModal(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setisTechnicianProfileModal(false);
    setIsModalOpen(false);
  };

  const handleModelButtonClick = (buttonType: string) => {
    setModelActiveButton(buttonType);
    if (buttonType === 'edit') {
      setIsEditable(true);
    }
    if (buttonType === 'update') {
      setIsEditable(false);
      setisTechnicianProfileModal(false);
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

  const columns: ColumnsType<any> = [
    {
      title: 'Technician Details',
      dataIndex: 'technicianDetails',
      key: 'technicianDetails',
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
    },
    {
      title: 'Divison',
      dataIndex: 'divison',
      key: 'divison',
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
    },
    {
      title: 'Active Service Request',
      dataIndex: 'activeServiceReq',
      key: 'activeServiceReq',
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
      render: renderStatus
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
      render: () => (
        <ExportOutlined
          onClick={showTechnicianProfileModal}
          style={{
            fontSize: 'larger',
          }} />
      )
    }
  ];

  return (
    <>
      <Space>
        <div>
          <p
            style={{
              width: '135px',
              height: '25px',
              padding: '2px 8px 2px 8px',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              boxSizing: 'border-box',
              fontFamily: `"Arial", sans-serif`,
              color: '#333333',
              textAlign: 'left',
              lineHeight: 'normal',
              marginTop: '20px',
              marginLeft: '20px'
            }}>Sort By</p>
          <Select
            style={contentStyle}
            defaultValue='Status'
            options={[
              { value: 'Status', label: 'status' },
              { value: 'Technician Name', label: 'technicianName' },
              { value: 'Technician ID', label: 'technicianId' },
              { value: 'Division', label: 'division' },
              { value: 'Role', label: 'role' },
              { value: 'Number Active Request', label: 'numberActiveRequest' },
            ]}
          />
        </div>
        <div>
          <Button
            style={buttonStyle}
            onClick={showModal}>
            Add Technician
          </Button>
          <Modal
            title="Add Technician"
            open={isModalOpen}
            // onOk={handleOk}
            onCancel={handleCancel}
            width={429}
            footer={[
              <Button key="submit"
                style={{
                  width: '167px',
                  height: '35px',
                  padding: '2px 8px 2px 8px',
                  borderRadius: '10px',
                  backgroundColor: '#156082',
                  boxSizing: 'border-box',
                  boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
                  fontFamily: `"Arial", sans-serif`,
                  color: '#ffffff',
                  textAlign: 'center',
                  lineHeight: 'normal'
                }}>
                Add Technician
              </Button>
            ]}
            style={modelStyle}>
            <div>
              <span style={modelContentStyle}>Technican Name</span>
              <Input type="text" />
            </div>
            <div>
              <span style={modelContentStyle}>Technican ID</span>
              <Input />
            </div>
            <div>
              <span style={modelContentStyle}>Division</span>
              <Select
                options={[
                  { value: '-', label: '-' },
                  { value: 'Electrical Safty', label: 'Electrical Safty' },
                  { value: 'HVAC Inspector', label: 'HVAC Inspector' },
                  { value: 'Battery Compliance', label: 'Battery Compliance' },
                  { value: 'Fire Prevention and Protection', label: 'Fire Prevention and Protection' },
                ]} />
            </div>
            <div>
              <span style={modelContentStyle}>Role</span>
              <Input />
            </div>
            <div>
              <span style={modelContentStyle}>Email</span>
              <Input type="email" placeholder="user@company.com" />
            </div>
          </Modal>
        </div>
      </Space>

      <Space
        style={{
          width: '1421px',
          height: '575px',
          // padding: '2px 8px 2px 8px',
          borderRadius: '15px',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
          margin: '20px 20px'
        }}>
        <Table
          columns={columns}
          dataSource={technicianJSON}
          style={{
            width: '1422px',
            height: '508px',
            padding: '2px 2px 2px 2px',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            boxSizing: 'border-box'
          }}
        />

        <Modal
          centered
          open={isTechnicianProfileModal}
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
              }}>Technician Profile</p>
              <Button
                style={activeModelButton === 'edit' ? activeModelButtonStyle : buttonModelStyle}
                onClick={() => handleModelButtonClick('edit')}
              >
                Edit Profile</Button>
              <Button
                style={activeModelButton === 'update' ? activeModelButtonStyle : buttonModelStyle}
                onClick={() => handleModelButtonClick('update')}
              >
                Save Changes</Button>
            </Space>

            <Space direction="vertical" style={{ marginTop: '6px' }}>
              <Space direction="vertical">
                <p style={{ fontSize: 'small' }}>Technician Name
                  <Input style={inputModelStyle} />
                </p>
              </Space>
              <Space direction="vertical">
                <p style={{ fontSize: 'small' }}>Technician ID
                  <Input style={inputModelStyle} />
                </p>
              </Space>
              <Space direction="vertical">
                <p style={{ fontSize: 'small' }}>Contact Number
                  <Input style={inputModelStyle} />
                </p>
              </Space>
              <Space direction="vertical">
                <p style={{ fontSize: 'small' }}>Email
                  <Input style={inputModelStyle} />
                </p>
              </Space>
              <Space direction="vertical">
                <p style={{ fontSize: 'small' }}>Hire Date
                  <DatePicker style={inputModelStyle} />
                </p>
              </Space>
              <Space direction="vertical">
                <p style={{ fontSize: 'small' }}>Termination Date
                  <DatePicker style={inputModelStyle} />
                </p>
              </Space>
              <Space direction="vertical">
                <p style={{ fontSize: 'small' }}>Division
                  <Select
                    placeholder={'Electrical Safety'}
                    options={[
                      { value: 'Electrical Safety', label: 'Electrical Safety' },
                      { value: 'HVAC Inspector', label: 'HVAC Inspector' },
                      { value: 'Battery Compilance', label: 'Battery Compilance' },
                      { value: 'Fire Prevention and Protection', label: 'Fire Prevention and Protection' },
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
              <Space direction="vertical">
                <p style={{ fontSize: 'small' }}>Role
                  <Select
                    placeholder={'Junior Technician'}
                    options={[
                      { value: 'Lead Technician', label: 'Lead Technician' },
                      { value: 'Junior Technician', label: 'Junior Technician' },
                      { value: 'Field Service Technician', label: 'Field Service Technician' },
                      { value: 'Maintenance Technician', label: 'Maintenance Technician' },
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
      </Space>
    </>
  )
}

export default Technicians;
