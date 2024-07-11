'use client'
import { ExportOutlined, FileExcelOutlined, FileZipOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Layout, Modal, Select, Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

const layoutStyle: React.CSSProperties = {
    minHeight: '100vh'
}
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

const siderStyle: React.CSSProperties = {
    minWidth: '200px',
    // height: '1200px',
    padding: '2px 2px 2px 2px',
    boxSizing: 'border-box',
    border: '1px solid #d8d8d8',
    backgroundColor: '#ffffff'
}
const contentStyle: React.CSSProperties = {
}

const filterStyle: React.CSSProperties = {
    width: '366px',
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
const inspectionHistoryHeaderStyle: React.CSSProperties = {
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

const modelStyle: React.CSSProperties = {
    width: '285px',
    height: '503px',
    //padding: '2px 2px 2px 2px',
    borderRadius: '15px',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)'
}

interface DataType {
    key: React.Key;
    reportName: string;
    generatedDate: string;
    status: string;
}

const renderStatus = (text: any, record: any) => {
    const status = record.status;
    let backgroundColor;
    switch (text || status) {
        case 'Open':
            backgroundColor = '#63a103';
            break;
        case 'Closed':
            backgroundColor = '#7f7f7f';
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


const columns: ColumnsType<any> = [
    {
        title: <Checkbox />,
        dataIndex: 'selectedReport',
        key: 'selectedReport',
        width: '30px',
        render: () => (
            <Checkbox />
        )
    },
    {
        title: 'Request Name',
        dataIndex: 'requestName',
        key: 'requestName',
        width: '200px',
        onHeaderCell: () => ({
            style: inspectionHistoryHeaderStyle,
        }),
    },
    {
        title: 'Request ID',
        dataIndex: 'requestId',
        key: 'requestId',
        width: '125px',
        onHeaderCell: () => ({
            style: inspectionHistoryHeaderStyle,
        }),
    },
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
        key: 'customerName',
        width: '200px',
        onHeaderCell: () => ({
            style: inspectionHistoryHeaderStyle,
        }),
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        width: '275px',
        onHeaderCell: () => ({
            style: inspectionHistoryHeaderStyle,
        }),
    },
    {
        title: 'Request Type',
        dataIndex: 'requestType',
        key: 'requestType',
        width: '200px',
        onHeaderCell: () => ({
            style: inspectionHistoryHeaderStyle,
        }),
    },
    {
        title: 'Appointment Date',
        dataIndex: 'appointmentDate',
        key: 'appointmentDate',
        onHeaderCell: () => ({
            style: inspectionHistoryHeaderStyle,
        }),
    },
    {
        title: 'Inspector Name',
        dataIndex: 'inspectorName',
        key: 'inspectorName',
        width: '200px',
        onHeaderCell: () => ({
            style: inspectionHistoryHeaderStyle,
        }),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '140px',
        onHeaderCell: () => ({
            style: inspectionHistoryHeaderStyle,
        }),
        render: renderStatus
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        width: '140px',
        onHeaderCell: () => ({
            style: inspectionHistoryHeaderStyle,
        }),
        render: () => (
            <ExportOutlined
                style={{
                    fontSize: 'larger',
                }} />
        )
    }
];

const reportsJSON = [
    {
        requestName: 'Single-Family Home Inspection',
        requestId: '200970',
        customerName: 'Greenwood Housing Authority (MS)',
        location: '789 Oak Avenue, Jackson, MS 39201',
        requestType: 'Inspection',
        appointmentDate: '2024-05-18',
        inspectorName: 'Emily Johnson',
        status: 'Open'
    },
    {
        requestName: 'Apartment Building Inspection',
        requestId: '200989',
        customerName: 'Greenwood Housing Authority (MS)',
        location: '234 Pine Avenue, Hattiesburg, MS 39401',
        requestType: 'Inspection',
        appointmentDate: '2024-05-14',
        inspectorName: 'John Smith',
        status: 'Closed'
    },
    {
        requestName: 'Single-Family Home Inspection',
        requestId: '201205',
        customerName: 'Greenwood Housing Authority (MS)',
        location: '789 Oak Street, Biloxi, MS 39530',
        requestType: 'Inspection',
        appointmentDate: '2024-04-28',
        inspectorName: 'Sarah Davis',
        status: 'Closed'
    },
    {
        requestName: 'Apartment Building Inspection',
        requestId: '200219',
        customerName: 'Greenwood Housing Authority (MS)',
        location: '101 Maple Street, Biloxi, MS 39530',
        requestType: 'Inspection',
        appointmentDate: '2024-04-12',
        inspectorName: 'John Smith',
        status: 'Closed'
    },
    {
        requestName: 'Condominium Inspection',
        requestId: '199874',
        customerName: 'Greenwood Housing Authority (MS)',
        location: '456 Elm Lane, Gulfport, MS 39501',
        requestType: 'Inspection',
        appointmentDate: '2024-04-05',
        inspectorName: 'Emily Johnson',
        status: 'Closed'
    },
    {
        requestName: 'Single-Family Home Inspection',
        requestId: '203009',
        customerName: 'Greenwood Housing Authority (MS)',
        location: '567 Cedar Road, Tupelo, MS 38801',
        requestType: 'Inspection',
        appointmentDate: '2024-03-22',
        inspectorName: 'John Smith',
        status: 'Closed'
    },
    {
        requestName: 'Single-Family Home Inspection',
        requestId: '194508',
        customerName: 'Greenwood Housing Authority (MS)',
        location: '234 Cedar Lane, Hattiesburg, MS 39401',
        requestType: 'Inspection',
        appointmentDate: '2024-03-19',
        inspectorName: 'Sarah Davis',
        status: 'Closed'
    },
    {
        requestName: 'Apartment Building Inspection',
        requestId: '202315',
        customerName: 'Greenwood Housing Authority (MS)',
        location: '789 Maple Street, Meridian, MS 39301',
        requestType: 'Inspection',
        appointmentDate: '2024-02-15',
        inspectorName: 'Sarah Davis',
        status: 'Closed'
    },
    {
        requestName: 'Condominium Inspection',
        requestId: '189487',
        customerName: 'Greenwood Housing Authority (MS)',
        location: '567 Maple Road, Tupelo, MS 38801',
        requestType: 'Inspection',
        appointmentDate: '2024-02-10',
        inspectorName: 'John Smith',
        status: 'Closed'
    },
    {
        requestName: 'Single-Family Home Inspection',
        requestId: '204008',
        customerName: 'Greenwood Housing Authority (MS)',
        location: '101 Pine Lane, Gulfport, MS 39501',
        requestType: 'Inspection',
        appointmentDate: '2024-01-28',
        inspectorName: 'Emily Johnson',
        status: 'Closed'
    },
]

const InspectionHistory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Layout style={layoutStyle}>
            <Content style={contentStyle}>
                <Layout>
                    <Space direction="horizontal">
                        <Space direction="horizontal">
                            <div>
                                <p style={{ paddingLeft: '20px' }}>Request Name</p>
                                <Input style={filterStyle} />
                            </div>
                        </Space>
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
                                        backgroundColor: '#156082',
                                        boxSizing: 'border-box',
                                        boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
                                        fontFamily: `"Arial", sans-serif`,
                                        color: '#ffffff',
                                        textAlign: 'center',
                                        lineHeight: 'normal',
                                        marginTop: '25px'
                                    }}>Apply</Button>
                            </div>
                            <div>
                                <Button
                                    style={{
                                        width: '80px    ',
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
                                    }}>
                                    Clear
                                </Button>
                            </div>
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
                                        marginLeft: '340px',
                                    }}
                                    onClick={showModal}
                                >

                                    Export
                                </Button>
                                <Modal
                                    title="Export Package"
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
                                            Export
                                        </Button>
                                    ]}
                                    style={modelStyle}>
                                    <div>
                                        <span style={modelContentStyle}>Report Name</span>
                                        <Input type="text" />
                                    </div>
                                    <div style={{ marginTop: '3px' }}>
                                        <span style={modelContentStyle}>Include</span>
                                        <div style={{ marginTop: '3px' }}>
                                            <div>
                                                <Checkbox> Photo(s)</Checkbox>
                                            </div>
                                            <div>
                                                <Checkbox>submissions(PDF)</Checkbox>
                                            </div>
                                            <div>
                                                <Checkbox>Summary(xlsx)</Checkbox>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </Space>
                    </Space>
                </Layout>
                <Space
                    style={{
                        width: '1421px',
                        height: '575px',
                        padding: '2px 8px 2px 8px',
                        borderRadius: '15px',
                        backgroundColor: '#ffffff',
                        boxSizing: 'border-box',
                        boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
                        margin: '20px 20px',
                        overflowY: 'auto',
                        overflowX: "auto"
                    }}>
                    <Table
                        columns={columns}
                        dataSource={reportsJSON}
                        style={{
                            width: '1422px',
                            height: '508px',
                            padding: '2px 2px 2px 2px',
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            boxSizing: 'border-box'
                        }}
                    />
                </Space>
            </Content>
            {/* <Footer style={footerStyle}>Footer</Footer> */}
        </Layout>
    )
}

export default InspectionHistory;