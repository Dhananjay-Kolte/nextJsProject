'use client'
import customerServices from "@/app/service/customer/dashboard.service";
import { Button, Form, Input, Radio, Select, Space, Upload } from "antd";
import { useEffect, useState } from "react";

const inputStyle: React.CSSProperties = {
  width: '610px',
  height: '35px',
  padding: '8px 8px 8px 8px',
  borderRadius: '8px',
  border: '1px solid #d8d8d8',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#000000',
  textAlign: 'left'
}

const buttonStyle: React.CSSProperties = {
  width: '167px',
  height: '35px',
  padding: '2px 8px 2px 8px',
  border: '1px solid #156082',
  borderRadius: '10px',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
  fontFamily: `"Arial", sans-serif`,
  color: '#156082',
  textAlign: 'center',
  lineHeight: 'normal',
  marginRight: '20px',
}

const contentStyle: React.CSSProperties = {
  width: '177px',
  // height: '29px',
  padding: '2px 8px 2px 0px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#333333',
  textAlign: 'left',
  lineHeight: 'normal',
  fontSize: 'small'
}

const baseBtnStyle: React.CSSProperties = {
  width: '100px',
  height: '23px',
  padding: '2px 8px',
  borderRadius: '5px',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#ffffff',
  textAlign: 'center',
  lineHeight: 'normal'
};

const openBtnStyle: React.CSSProperties = {
  ...baseBtnStyle,
  backgroundColor: '#63a103'
};

const reminderBtnStyle: React.CSSProperties = {
  ...baseBtnStyle,
  backgroundColor: '#156082'
};

const activeModelButtonStyle: React.CSSProperties = {
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
  lineHeight: 'normal',
  marginRight: '20px'
}

const uploadStyle: React.CSSProperties = {
  width: '145px',
  height: '145px',
  padding: '2px 8px',
  borderRadius: '8px',
  backgroundColor: '#d7d7d7',
  boxSizing: 'border-box'
};

const Page: React.FC = () => {
  const [activeModelButton, setActiveModelButton] = useState('');
  const [form] = Form.useForm();
  const [inspectionData, setInspectionData] = useState<any[]>([]);

  const handleModelButtonClick = (buttonType: string) => {
    setActiveModelButton(buttonType);
  }

  useEffect(() => {
    const getInspections = async () => {
      try {
        const resp = await customerServices.getInspectionById('8');
        const res = await resp.json();

        if (res && res.data) {
          const inspection = res.data;
          setInspectionData(inspection);

          // Set form fields
          form.setFieldsValue({
            TenantIdNu: inspection.attributes?.TenantIdNu,
            customerName: inspection.attributes?.customerName,
            customerContactName: inspection.attributes?.TelephoneO,
            customerContactNumber: inspection.attributes?.TelephoneO,
            location: `${inspection.attributes?.StreetAddr} ${inspection.attributes?.CityOfInsp}, ${inspection.attributes?.StateOfIns}, ${inspection.attributes?.ZipOfInspe}`,
            siteAddress: inspection.attributes?.StreetAddr,
            photosRequired: inspection.attributes?.photosRequired,
            comments: inspection.attributes?.ProjectNum,
            inspectionType: inspection.attributes?.TypeOfInsp,
            appointmentDate: inspection.attributes?.DateOfRequ,
            reminderDate: inspection.attributes?.DateLastIn,
            reminderPeriod: inspection.attributes?.reminderPeriod,
            technicianName: inspection.attributes?.technicianName,
            technicianNotes: inspection.attributes?.technicianNotes,
            inspectionPhotos: inspection.attributes?.inspectionPhotos
          });
        } else {
          console.error('Unexpected response format:', res);
        }
      } catch (err) {
        console.log('Error:', err);
      }
    };

    getInspections();
  }, [form]);

  return (
    <Form>
      <Space>
        <p style={{
          width: '298px',
          height: '21px',
          padding: '2px 8px 2px 0px',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          boxSizing: 'border-box',
          fontFamily: `"Arial Bold", "Arial", sans-serif`,
          fontWeight: '700',
          color: '#333333',
          textAlign: 'left',
          lineHeight: 'normal',
          fontSize: '16px'
        }}>Battery Model XRT-2000 Replacement</p>
        <div style={{ marginLeft: '100px' }}>
          <Button
            style={activeModelButton === 'status' ? activeModelButtonStyle : buttonStyle}
            onClick={() => handleModelButtonClick('status')}>
            Mark as Closed
          </Button>
          <Button
            style={activeModelButton === 'update' ? activeModelButtonStyle : buttonStyle}
            onClick={() => handleModelButtonClick('update')}>
            Saved Changes
          </Button>
        </div>
      </Space>

      <div style={{
        width: '806px',
        height: '480px',
        padding: '2px 2px 2px 2px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxSizing: 'border-box',
        overflow: 'auto',
        marginTop: '20px'
      }}>

        <div>
          <p style={contentStyle}>Status</p>
          <Form.Item>
            <Button style={openBtnStyle}>open</Button>
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Request ID</p>
          <Form.Item name="TenantIdNu">
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Customer Name</p>
          <Form.Item name="customerName" rules={[{ required: true, message: 'Street Address is required' }]}>
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Customer Contact Name</p>
          <Form.Item name="customerContactName" rules={[{ required: true, message: 'Street Address is required' }]}>
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Customer Contact Number</p>
          <Form.Item name="customerContactNumber" rules={[{ required: true, message: 'Street Address is required' }]}>
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Location</p>
          <Form.Item name="location">
            <Select style={{ width: '610px', height: '35px' }}>
              <Select.Option value="">-</Select.Option>
              <Select.Option value="warehouse">Warehouse</Select.Option>
              <Select.Option value="office">Office</Select.Option>
              <Select.Option value="site2">Site 2</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Site Address</p>
          <Form.Item name="siteAddress" rules={[{ required: true, message: 'Street Address is required' }]}>
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Photos Required</p>
          <Form.Item name="photosRequired" rules={[{ required: true, message: 'Street Address is required' }]}>
            <Radio.Group name="photosRequired" defaultValue={1}>
              <Radio value={1}>Yes</Radio>
              <Radio value={2}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Comments/Description</p>
          <Form.Item name="comments">
            <Input.TextArea
              style={{
                width: '610px',
                height: '71px',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #d8d8d8',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                fontFamily: `"Arial", sans-serif`,
                color: '#000000',
                textAlign: 'left',
              }}
            />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Inspection Type</p>
          <Form.Item name="inspectionType">
            <Select style={{ width: '610px', height: '35px' }}>
              <Select.Option value="">-</Select.Option>
              <Select.Option value="inspection">Inspection</Select.Option>
              <Select.Option value="replacement">Replacement</Select.Option>
              <Select.Option value="maintenance">Maintenance</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Appointment Date</p>
          <Form.Item name="appointmentDate">
            <Input type="date" style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Reminder Date</p>
          <Form.Item name="reminderDate">
            <Input type="date" style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Reminder Period</p>
          <Form.Item name="reminderPeriod">
            <Button style={reminderBtnStyle}>90 Days</Button>
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Technician Name</p>
          <Form.Item name="technicianName">
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Technician Notes</p>
          <Form.Item name="technicianNotes">
            <Input.TextArea
              style={{
                width: '610px',
                height: '71px',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #d8d8d8',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                fontFamily: `"Arial", sans-serif`,
                color: '#000000',
                textAlign: 'left',
              }}
            />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Inspection Photo(s)</p>
          <Form.Item name="inspectionPhotos">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              // fileList={fileList}
              // onPreview={handlePreview}
              // onChange={handleChange}
              style={uploadStyle}
            >
              +
            </Upload>
          </Form.Item>
        </div>

      </div>
    </Form>
  )
}

export default Page;
