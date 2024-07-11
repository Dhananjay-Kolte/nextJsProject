"use client"
import customerServices from "@/app/service/customer/dashboard.service";
import { EllipsisOutlined, ExportOutlined } from "@ant-design/icons";
import { Button, Dropdown, Modal, Select, Space, Table, TableColumnType, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import type { MenuProps } from 'antd';
import MainForm from "./actions/main";

const spaceStyle: React.CSSProperties = {
  width: '198px',
  height: '40px',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#000000',
  marginLeft: '20px'
}

const spaceNameStyle: React.CSSProperties = {
  width: '135px',
  height: '25px',
  padding: '2px 8px 2px 8px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#333333',
  textAlign: 'left',
  lineHeight: 'normal',
  marginLeft: '20px',
  fontSize: 'small'
}

const tableStyle: React.CSSProperties = {
  height: '400px',
  padding: '2px 8px 2px 8px',
  borderRadius: '15px',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
  overflow: 'auto'
}

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

const buttonStyle: React.CSSProperties = {
  width: '149px',
  height: '42px',
  padding: '2px 8px 2px 8px',
  borderRadius: '10px',
  border: '1px solid #d8d8d8',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
  fontFamily: `"Arial", sans-serif`,
  color: '#000000',
  textAlign: 'center',
  lineHeight: 'normal',
  marginLeft: '20px'
}

const viewButtonStyle: React.CSSProperties = {
  width: '149px',
  height: '42px',
  padding: '2px 8px 2px 8px',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#156082',
  textAlign: 'left',
  lineHeight: 'normal',
  marginLeft: '20px'
}

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#156082',
  fontWeight: 'bold',
  color: '#ffffff',
};

const activeViewButtonStyle = {
  ...viewButtonStyle,
  fontWeight: 'bold'
}

interface DataType {
  key: React.Key;
  id: string;
  NameOfFami: string,
  TenantIdNu: string,
  customername: string,
  location: string,
  TypeOfInsp: string,
  DateOfRequ: string,
  Inspector: string,
  status: string
}

const renderStatus = (text: any, record: any) => {

  const status = record.status;
  let backgroundColor;
  switch (text || status) {
    case 'open':
      backgroundColor = '#63a103';
      break;
    case 'closed':
      backgroundColor = '#910012';
      break;
    case 'unassigned':
      backgroundColor = '#a36717';
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

const data: DataType[] = [];

interface InspectionData {
  key: string;
  NameOfFami: string,
  TenantIdNu: string,
  customername: string,
  location: string,
  TypeOfInsp: string,
  DateOfRequ: string,
  Inspector: string,
  status: string,
}

const Inspection: React.FC = () => {
  const [isModal, setModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('unassigned');
  const [data, setData] = useState<InspectionData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reloadInspectionData, setReloadInspectionData] = useState<boolean>(false)

  const showModal = (id: string) => {
    setModalOpen(true);
    setSelectedId(id);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const columns: TableColumnsType<any> = [
    {
      title: 'Request Name',
      dataIndex: 'NameOfFami',
      key: 'NameOfFami',
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
    },
    {
      title: 'Request ID',
      dataIndex: 'TenantIdNu',
      key: 'TenantIdNu',
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
    },
    {
      title: 'Customer Name',
      dataIndex: 'customername',
      key: 'customername',
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
    },
    {
      title: 'Inspection Type',
      dataIndex: 'TypeOfInsp',
      key: 'TypeOfInsp',
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
    },
    {
      title: 'Appointment Date',
      dataIndex: 'DateOfRequ',
      key: 'DateOfRequ',
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
    },
    {
      title: 'Inspector Name',
      dataIndex: 'Inspector',
      key: 'Inspector',
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
      onHeaderCell: () => ({
        style: technicianHeaderStyle,
      }),
      render: (text: any, record: DataType) => (
        <Dropdown menu={{ items: generateMenuItems(record.id) }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <EllipsisOutlined />
            </Space>
          </a>
        </Dropdown>
      )
    },
  ];

  const generateMenuItems = (id: any): MenuProps['items'] => [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          onClick={(e) => {
            e.preventDefault();
            showModal(id);
          }}
        >
          Details
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank">
          Set as a Closed
        </a>
      ),
    },
  ];

  const getInspections = async (status: string) => {
    try {
      const resp = await customerServices.getInspection();
      const res = await resp.json();
      const inspectionArray = res.inspections || res;
      if (Array.isArray(inspectionArray.data)) {
        const filteredData = inspectionArray.data.filter(
          (item: any) => item.attributes.status === status
        );
        const mappedData = filteredData.map((item: any, index: number) => ({
          key: index.toString(),
          id: item.id,
          NameOfFami: item.attributes.NameOfFami,
          TenantIdNu: item.attributes.TenantIdNu,
          customername: item.attributes.owner,
          location: `${item.attributes?.StreetAddr} ${item.attributes?.CityOfInsp}, ${item.attributes?.StateOfIns}, ${item.attributes?.ZipOfInspe}`,
          TypeOfInsp: item.attributes.TypeOfInsp,
          DateOfRequ: item.attributes.DateOfRequ,
          Inspector: item.attributes.Inspector,
          status: item.attributes.status,
        }));

        setData(mappedData);
      } else {
        console.error('Expected an array but got:', inspectionArray);
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  useEffect(() => {
    getInspections('unassigned');
  }, [reloadInspectionData]);

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
    getInspections(buttonType);
  };

  return (
    <>
      <Space direction="vertical">
        <Space
          direction="horizontal"
          style={{
            marginTop: '33px'
          }}>
          <Button
            style={activeButton === 'open' ? activeButtonStyle : buttonStyle}
            onClick={() => handleButtonClick('open')}>
            Open
          </Button>
          <Button
            style={activeButton === 'unassigned' ? activeButtonStyle : buttonStyle}
            onClick={() => handleButtonClick('unassigned')}>
            Unassigned
          </Button>
          <Button style={activeButton === 'closed' ? activeButtonStyle : buttonStyle}
            onClick={() => handleButtonClick('closed')}>
            Closed
          </Button>
          <a
            style={activeButton === 'viewAll' ? activeViewButtonStyle : viewButtonStyle}
            onClick={() => handleButtonClick('viewAll')}>
            View All
          </a>
        </Space>

        <Space
          direction="horizontal"
          style={{
            marginTop: '20px'
          }}>
          <div>
            <p style={spaceNameStyle}>Inspection Type</p>
            <Select
              style={spaceStyle}
              defaultValue={'Initial'}
              options={[
                { value: 'initial', label: 'initial' },
              ]}
            />
          </div>
          <div>
            <p style={spaceNameStyle}>Sort By</p>
            <Select
              style={spaceStyle}
              defaultValue={'Request Name'}
              options={[
                { value: 'Request Name', label: 'Request Name' },
                { value: 'Request ID', label: 'Request ID' },
                { value: 'Customer Name', label: 'Customer Name' },
                { value: 'Location', label: 'Location' },
                { value: 'Inspection Type', label: 'Inspection Type' },
                { value: 'Appointment Date', label: 'Appointment Date' },
                { value: 'Inspector Name', label: 'Inspector Name' },
                { value: 'Status', label: 'Status' },
              ]}
            />
          </div>
        </Space>

        <Space
          style={{
            // width: '1421px',
            height: '525px',
            // padding: '2px 8px 2px 8px',
            borderRadius: '15px',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
            boxShadow: ' 4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
            margin: '20px 20px 0 20px',
            marginLeft: '20px'
          }}>
          <Table
            style={tableStyle}
            columns={columns}
            dataSource={data}
          />
        </Space>
      </Space>
      <Modal
        open={isModal}
        onCancel={handleCancel}
        closable={false}
        width={831}
        height={576}
        footer={[]}
      >
        <MainForm
          id={selectedId}
          setModalOpen={setModalOpen}
          setReloadInspectionData={setReloadInspectionData}
        />
      </Modal>
    </>
  )
}

export default Inspection;
