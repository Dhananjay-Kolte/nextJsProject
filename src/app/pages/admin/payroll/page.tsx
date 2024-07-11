'use client'

import { Button, Card, Divider, Input, Modal, Space, Table, TableColumnsType } from "antd";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const inputStyle: React.CSSProperties = {
  width: '150px',
  height: '35px',
  padding: '2px 8px 2px 8px',
  borderRadius: '4px',
  border: '1px solid #d8d8d8',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans - serif`,
  color: '#000000',
  textAlign: 'left',
}

const headerCellStyle: React.CSSProperties = {
  height: '36px',
  padding: '2px 10px 2px 10px',
  backgroundColor: '#f2f2f2',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#333333',
  textAlign: 'center',
  lineHeight: 'normal',
  fontSize: 'small'
}

const rowStyle: React.CSSProperties = {
  width: '1424px',
  height: '60px',
  padding: '2px 2px 2px 2px',
  border: '1px solid #d7d7d7',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#333333',
  textAlign: 'center',
};

const techRowStyle: React.CSSProperties = {
  width: '700px',
  height: '30px',
  padding: '0px 8px 0px 8px',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#333333',
  textAlign: 'center',
  lineHeight: '18px'
}

interface DataType {
  key: React.Key;
  technicalDetails: string;
  noOfRequests: number;
  totalHours: string;
}

interface viewTColumnsType {
  key: React.Key;
  requestName: string;
  requestId: number;
  customerName: string;
  location: string;
  requestType: string;
  appointmentDate: string;
  clockIn: string;
  clockOut: string;
}

interface techColumnsType {
  key: React.Key;
  technicianName: string;
  numberHoursWorked: string;
  numberofServiceRequests: string;
}

const viewColumns: TableColumnsType<any> = [
  {
    title: 'Request Name',
    dataIndex: 'requestName',
    key: 'requestName',
    onHeaderCell: () => ({
      style: headerCellStyle,
    }),
  },
  {
    title: 'Request ID',
    dataIndex: 'requestId',
    key: 'requestId',
    onHeaderCell: () => ({
      style: headerCellStyle,
    }),
  },
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
    key: 'customerName',
    onHeaderCell: () => ({
      style: headerCellStyle,
    }),
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    onHeaderCell: () => ({
      style: headerCellStyle,
    }),
  },
  {
    title: 'Request Type',
    dataIndex: 'requestType',
    key: 'requestType',
    onHeaderCell: () => ({
      style: headerCellStyle,
    }),
  },
  {
    title: 'Appointment Date',
    dataIndex: 'appointmentDate',
    key: 'appointmentDate',
    onHeaderCell: () => ({
      style: headerCellStyle,
    }),
  },
  {
    title: 'Clock In',
    dataIndex: 'clockIn',
    key: 'clockIn',
    onHeaderCell: () => ({
      style: headerCellStyle,
    }),
  },
  {
    title: 'Clock Out',
    dataIndex: 'clockOut',
    key: 'clockOut',
    onHeaderCell: () => ({
      style: headerCellStyle,
    }),
  }
]

const techColumns: TableColumnsType<any> = [
  {
    title: 'Technician Name',
    dataIndex: 'technicianName',
    key: 'Technician Name',
    onHeaderCell: () => ({
      style: headerCellStyle,
    }),
  },
  {
    title: 'Number Hours Worked',
    dataIndex: 'numberHoursWorked',
    key: 'Number Hours Worked',
    onHeaderCell: () => ({
      style: headerCellStyle,
    }),
  },
  {
    title: 'Number of Service Requests',
    dataIndex: 'numberofServiceRequests',
    key: 'Number of Service Requests',
    onHeaderCell: () => ({
      style: headerCellStyle,
    }),
  }
]

const data = [
  {
    technicalDetails: 'Michael Brown',
    technicalDetailsNo: '397836',
    noOfRequests: '4',
    totalHours: '5:15'
  },
  {
    technicalDetails: 'John Smith',
    technicalDetailsNo: '200711',
    noOfRequests: '4',
    totalHours: '6:11'
  },
  {
    technicalDetails: 'Emily Johnson',
    technicalDetailsNo: '275545',
    noOfRequests: '4',
    totalHours: '2:58'
  },
  {
    technicalDetails: 'Sarah Davis',
    technicalDetailsNo: '344033',
    noOfRequests: '4',
    totalHours: '3:45'
  }
]

const viewData = [
  {
    requestName: 'Electrical Service',
    requestId: '200502',
    customerName: 'Saw Systems',
    location: '837 Haven Lane, Denver, Colorado',
    requestType: 'Inspection',
    appointmentDate: '2024-04-19',
    clockIn: '4:45 PM',
    clockOut: '6:15 PM'
  },
  {
    requestName: 'Electrical Maintenance',
    requestId: '198311',
    customerName: 'Saw Systems',
    location: '837 Haven Lane, Denver, Colorado',
    requestType: 'Inspection',
    appointmentDate: '2024-04-19',
    clockIn: '4:45 PM',
    clockOut: '6:15 PM'
  },
  {
    requestName: 'Electrical Testing',
    requestId: '199997',
    customerName: 'Goldustries',
    location: '3581 Haymond Rocks Road, Denver, Colorado',
    requestType: 'Inspection',
    appointmentDate: '2024-04-03',
    clockIn: '2:00 PM',
    clockOut: '6:15 PM'
  },
  {
    requestName: 'Electrical Troubleshooting',
    requestId: '198515',
    customerName: 'Voyagetronics',
    location: '4375 Pride Avenue, Denver, Colorado',
    requestType: 'Inspection',
    appointmentDate: '2024-04-02',
    clockIn: '9:00 AM',
    clockOut: '10:00 AM'
  },
]

const techdata = [
  {
    technicianName: 'John Smith',
    numberHoursWorked: '6:11',
    numberofServiceRequests: '4'
  },
  {
    technicianName: 'Michael Brown',
    numberHoursWorked: '5:15',
    numberofServiceRequests: '4'
  },
  {
    technicianName: 'Sarah Davis',
    numberHoursWorked: '3:45',
    numberofServiceRequests: '4'
  },
  {
    technicianName: 'Emily Johnson',
    numberHoursWorked: '2:58',
    numberofServiceRequests: '4'
  },
]

const Payroll: React.FC = () => {
  const [view, setView] = useState(false);

  const columns: TableColumnsType<any> = [
    {
      title: 'Technical Details',
      dataIndex: 'technicalDetails',
      key: 'technicalDetails',
      width: '356px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Number of Requests',
      dataIndex: 'noOfRequests',
      key: 'noOfRequests',
      width: '356px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Total Hours Worked',
      dataIndex: 'totalHours',
      key: 'totalHours',
      width: '356px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      key: 'actions',
      width: '356px',
      onHeaderCell: () => ({
        style: headerCellStyle,
      }),
      render: () => (
        <a
          style={{ fontFamily: `"Inter", sans-serif`, color: '#156082' }}
          onClick={() => setView(true)}>
          View
        </a>
      )
    }
  ]

  const chartdata = {
    labels: ['Michael Brown', 'John Smith', 'Emily Johnson', 'Sarah Davis'],
    datasets: [
      {
        label: 'Hours Worked - Number of Service Requests',
        data: ['5', '6', '3', '3.50'],
        backgroundColor: '#3290cb',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    width: '140px',
    scales: {
      y: {
        min: 0,
        max: 9,
        ticks: {
          stepSize: 3,
          callback: function (value: any) {
            return value + ":00";
          }
        }
      },
    },
  };

  return (
    <>
      <Space direction="horizontal">
        <Space direction="vertical">
          <div style={{ fontSize: 'small', margin: '20px' }}>
            <p>From</p>
            <Input style={inputStyle} type="date" />
          </div>
        </Space>
        <Space direction="vertical">
          <div style={{ fontSize: 'small', margin: '20px' }}>
            <p>To</p>
            <Input style={inputStyle} type="date" />
          </div>
        </Space>
        <Space>
          <div>
            <Button
              style={{
                width: '80px',
                height: '35px',
                padding: '2px 8px 2px 8px',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
                fontFamily: `"Arial", sans-serif`,
                color: '#156082',
                textAlign: 'center',
                lineHeight: 'normal',
                marginTop: '25px'
              }}>Apply</Button>
          </div>
        </Space>
        <Space>
          <div>
            <Button
              style={{
                width: '124px',
                height: '35px',
                padding: '2px 8px 2px 8px',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
                fontFamily: `"Arial", sans-serif`,
                color: '#156082',
                textAlign: 'center',
                lineHeight: 'normal',
                marginTop: '25px',
                marginLeft: '830px'
              }}>
              Export
            </Button>
          </div>
        </Space>
      </Space>

      <Space
        style={{
          width: '1421px',
          height: '425px',
          borderRadius: '15px',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
          marginLeft: '20px'
        }}>
        <Table
          columns={columns}
          dataSource={data}
          onRow={(record, rowIndex) => {
            return {
              style: rowStyle,
            };
          }}
          style={{
            width: '1422px',
            // height: '394px',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            boxSizing: 'border-box',
            // marginTop: '20px',
          }} />
      </Space>

      <Space>
        <Space
          direction="vertical"
          style={{
            width: '700px',
            height: '363px',
            borderRadius: '15px',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
            boxShadow: '4px 10px 25px 0px rgba(50, 50, 93, 0.15)',
            margin: '20px'
          }}>
          <p style={{ padding: '16px 0 0 26px' }}><b>Total Technician Hours</b>(hh:mm)</p>
          <div style={{ width: '600px', height: '350px', marginLeft: '20px' }}>
            <Bar data={chartdata} options={options} />
          </div>
        </Space>
        <Space
          direction="vertical"
          style={{
            width: '700px',
            height: '363px',
            borderRadius: '15px',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
            boxShadow: '4px 10px 25px 0px rgba(50, 50, 93, 0.15)'
          }}>
          <p style={{ padding: '16px 0 0 26px' }}><b>Total Technician Hours</b> (hh:mm)</p>
          <Table
            columns={techColumns}
            dataSource={techdata}
            style={{
              marginTop: '22px',
              width: '700px',
              height: '150px',
              padding: '2px 2px 2px 2px',
              backgroundColor: '#ffffff',
              fontFamily: `"Arial", sans-serif`,
              color: '#333333',
            }}
            onRow={() => {
              return {
                style: techRowStyle,
              };
            }}
          />
        </Space>
      </Space>

      <Modal
        title="Technician Hours Summary - Michael Brown"
        centered
        open={view}
        closable={false}
        // onOk={() => setView(false)}
        onCancel={() => setView(false)}
        width={1424}
        footer={[]}
      >
        <Divider />
        <Table
          columns={viewColumns}
          dataSource={viewData}
          style={{
            width: '1424px',
            //height: '191px',
            // padding: '2px 2px 2px 2px',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            boxSizing: 'border-box',
            marginTop: '19px'
          }} />
      </Modal >
    </>
  )
}

export default Payroll;
