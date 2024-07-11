'use client'
import { FileExcelOutlined, FileZipOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";

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

const headerStyle: React.CSSProperties = {
    // width: '1715px',
    height: '80px',
    padding: '2px 2px 2px 2px',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    border: '1px solid #d8d8d8'
}

const contentStyle: React.CSSProperties = {}

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
const reportsHeaderStyle: React.CSSProperties = {
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

interface DataType {
    key: React.Key;
    reportName: string;
    generatedDate: string;
    status: string;
}

const renderStatus = () => {
    return (
        <Button
            style={{
                width: '100px',
                height: '23px',
                padding: '2px 8px 2px 8px',
                borderRadius: '5px',
                backgroundColor: '#016fa0',
                boxSizing: 'border-box',
                boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
                fontFamily: `"Arial", sans-serif`,
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 'normal',
            }}>Ready</Button>
    );
};
const renderAction = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '10px' }}><FileZipOutlined style={{ fontSize: '18px', color: '#156082' }} /> Zip</div>
            <div><FileExcelOutlined style={{ fontSize: '18px', color: '#156082' }} /> xlsx</div>
        </div>
    );
};

const columns: ColumnsType<any> = [
    {
        title: 'Report Name',
        dataIndex: 'reportName',
        key: 'reportName',
        width: '872px',
        onHeaderCell: () => ({
            style: reportsHeaderStyle,
        }),
    },
    {
        title: 'Generated Date',
        dataIndex: 'generatedDate',
        key: 'generatedDate',
        width: '241px',
        onHeaderCell: () => ({
            style: reportsHeaderStyle,
        }),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '153px',
        onHeaderCell: () => ({
            style: reportsHeaderStyle,
        }),
        render: renderStatus
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        width: '153px',
        onHeaderCell: () => ({
            style: reportsHeaderStyle,
        }),
        render: renderAction
    }
];

const reportsJSON = [
    {
        reportName: '2024-05-15 Inspection History',
        generatedDate: '2024-04-18, 3:30:21 PM',
    },
    {
        reportName: '2024-04-20 Inspection History',
        generatedDate: '2024-04-17, 2:39:33 PM',
    },
    {
        reportName: '2024-03-25 Inspection History',
        generatedDate: '2024-03-23, 2:27:54 PM',
    },
    {
        reportName: '2024-02-29 Inspection History',
        generatedDate: '2024-03-10, 3:43:46 PM',
    },
    {
        reportName: '2024-01-10 Inspection History',
        generatedDate: '2024-02-15, 2:50:25 PM',
    },
    {
        reportName: '2023-12-15 Inspection History',
        generatedDate: '2024-01-25, 4:21:11 PM',
    },
    {
        reportName: '2023-11-20 Inspection History',
        generatedDate: '2024-01-23, 4:11:05 PM',
    },
    {
        reportName: '2023-10-25 Inspection History',
        generatedDate: '2024-01-21, 5:50:06 PM',
    },
    {
        reportName: '2023-09-29 Inspection History',
        generatedDate: '2024-01-20, 4:38:44 PM',
    },
    {
        reportName: '2023-08-10 Inspection History',
        generatedDate: '2024-01-20, 5:37:09 PM',
    },

]

const Reports = () => {
    return (
        <Layout style={layoutStyle}>
            <Content style={contentStyle}>
                <Layout>
                    <Space direction="horizontal">
                        <Space direction="horizontal">
                            <div>
                                <p style={{ paddingLeft: '20px' }}>Report Name</p>
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
                        </Space>
                    </Space>
                </Layout>
                <Space
                    style={{
                        width: '1500px',
                        height: '600px',
                        padding: '2px 8px 2px 8px',
                        borderRadius: '15px',
                        backgroundColor: '#ffffff',
                        boxSizing: 'border-box',
                        boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
                        margin: '20px 20px',
                        overflowY: 'auto',
                        overflowX: "hidden"
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

export default Reports;
