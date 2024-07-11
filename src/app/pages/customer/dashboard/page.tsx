'use client'
import { ExportOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Empty, Modal, Space, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import MainForm from "./tabs/main";
import Page from "./actions/page";
import customerServices from "@/app/service/customer/dashboard.service";

interface DataType {
  key: React.Key;
  NameOfFami: string,
  TenantIdNu: string,
  customername: string,
  location: string,
  TypeOfInsp: string,
  DateOfRequ: string,
  Inspector: string,
  status: string,
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

const Dashboard: React.FC = () => {
  const [isModal, setModalOpen] = useState(false);
  const [isInspectionModal, setInspectionModalOpen] = useState(false);
  const [data, setData] = useState<InspectionData[]>([]);

  const getInspections = async () => {
    try {
      const resp = await customerServices.getInspection();
      const res = await resp.json();

      const inspectionArray = res.inspections || res;

      if (Array.isArray(inspectionArray.data)) {
        const mappedData = inspectionArray.data.map((item: any, index: number) => ({
          key: index.toString(),
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

  const showModal = () => {
    setModalOpen(true);
  };

  const showInspectionModel = () => {
    setInspectionModalOpen(true)
  }

  const handleCancel = () => {
    setModalOpen(false);
    setInspectionModalOpen(false);
  };

  const handleFormSubmit = async (formData: any) => {
    await getInspections();
    setInspectionModalOpen(false);
  }

  useEffect(() => {
    getInspections();
  }, []);

  const columns: TableColumnsType<DataType> = [
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
      render: () => (
        <ExportOutlined
          onClick={showModal}
          style={{
            fontSize: 'larger',
          }} />
      )
    },
  ];

  const formatDate = (dateString: any) => {
    const [month, day, year] = dateString.split('-');

    if (!month || !day || !year) {
      return 'Invalid Date';
    }
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date);
  };

  return (
    <>
      <Space style={{ margin: '20px' }}>
        <Button
          style={{
            width: '202px',
            height: '40px',
            padding: '2px 8px 2px 8px',
            borderRadius: '10px',
            backgroundColor: '#156082',
            boxSizing: 'border-box',
            boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
            fontFamily: `"Arial", sans-serif`,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 'normal',
          }}
          onClick={showInspectionModel}>
          Request Inspection
        </Button>
      </Space>

      <Space
        direction="vertical"
        justify-content='space-between'
        style={{
          width: '1605px',
          height: '200px',
          backgroundColor: '#ffffff',
          padding: '2px 8px 2px 8px',
          borderRadius: '30px',
          boxSizing: 'border-box',
          boxShadow: ' 4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
          marginLeft: '20px',
          overflow: 'auto',
          //border: '1px solid black'
        }}>
        <div>
          <p
            style={{
              width: '274px',
              height: '38px',
              padding: '2px 8px 2px 8px',
              backgroundColor: '#ffffff',
              boxSizing: 'border-box',
              fontFamily: '"Arial Bold", "Arial", sans-serif',
              fontWeight: '700',
              color: '#333333',
              textAlign: 'left',
              lineHeight: 'normal',
              margin: '16px 0 0 17px'
            }}>
            Active Inspections
          </p>
        </div>

        {data.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Active Inspections"
          />
        ) : (
          data.map((item, index) => (
            <Space
              key={index}
              direction="horizontal"
              style={{
                width: '1345px',
                height: '83px',
                borderBottom: '1px solid #d8d8d8',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                margin: '0 0 30px 17px',
              }}
            >
              <Card
                style={{
                  width: '50px',
                  height: '50px',
                  padding: '2px 8px 2px 8px',
                  borderRadius: '8px',
                  border: '1px solid #d8d8d8',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                  fontFamily: `"Arial", sans-serif`,
                  color: '#333333',
                  textAlign: 'center',
                  lineHeight: 'normal',
                  margin: '17px 21px 16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p>{formatDate(item.DateOfRequ)}</p>
              </Card>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <p>
                  <b>{item.customername}</b>
                </p>
                <p>{item.location}</p>
              </div>
              <Divider type="vertical" />
            </Space>
          ))
        )}
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        style={{
          // width: '100%',
          height: '388px',
          padding: '2px 8px 2px 8px',
          borderRadius: '15px',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
          margin: '20px',
          marginLeft: '20px',
          overflow: 'auto'
        }} />

      <Modal
        centered
        open={isModal}
        // title="Battery Model XRT-2000 Replacement"
        onCancel={handleCancel}
        closable={false}
        width={831}
        height={576}
        footer={[]}
      >
        <Page />
      </Modal>

      <Modal
        centered
        title='Request Inspection'
        open={isInspectionModal}
        onCancel={handleCancel}
        closable={false}
        width={797}
        height={777}
        footer={[]}>
        <MainForm setInspectionModalOpen={setInspectionModalOpen} onSubmit={handleFormSubmit} />
      </Modal>
    </>
  )
}

export default Dashboard;
