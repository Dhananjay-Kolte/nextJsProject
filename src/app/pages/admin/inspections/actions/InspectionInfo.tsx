import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

const contentStyle: React.CSSProperties = {
  width: '177px',
  // height: '29px',
  padding: ' 2px 8px 2px 0px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  boxSizing: 'border-box',
  fontFamily: `"Arial", sans-serif`,
  color: '#333333',
  textAlign: 'left',
  lineHeight: 'normal',
  marginTop: '10px',
  fontSize: 'smaller'
}

const inputStyle: React.CSSProperties = {
  width: '749px',
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

interface InspectionInformationProps {
  form: any;
  inspectionData: any;
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
  backgroundColor: '#a36717'
};

const InspectionInformation: React.FC<InspectionInformationProps> = ({ form, inspectionData }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (inspectionData) {
      form.setFieldsValue({
        Pha: inspectionData.attributes?.Pha,
        NameOfFami: inspectionData.attributes?.NameOfFami,
        TenantIdNu: inspectionData.attributes?.TenantIdNu,
        DateOfRequ: inspectionData.attributes?.DateOfRequ,
        DateLastIn: inspectionData.attributes?.DateLastIn,
        TypeOfInsp: inspectionData.attributes?.TypeOfInsp,
        Neighborho: inspectionData.attributes?.Neighborho,
        Inspector: inspectionData.attributes?.Inspector,
      });
    }
  }, [inspectionData, form]);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  );

  return (
    <Form
      form={form}
      style={{
        width: '777px',
        height: '599px',
        padding: '2px 2px 2px 2px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}
    >

      <div>
        <p style={contentStyle}>Status</p>
        <Form.Item>
          <Button style={openBtnStyle}>Unassigned</Button>
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}> Request ID</p>
        <Form.Item name="requestId">
          <Input style={inputStyle} />
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}>
          PHA <span style={{ color: 'red' }}>*</span>
        </p>
        <Form.Item name="Pha" rules={[{ required: true, message: 'PHA is required' }]}>
          <Input style={inputStyle} />
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}>Name of Family</p>
        <Form.Item name="NameOfFami">
          <Input style={inputStyle} />
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}>Tenant ID</p>
        <Form.Item name="TenantIdNu">
          <Input style={inputStyle} />
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}>Date of Request <span style={{ color: 'red' }}>*</span></p>
        <Form.Item name="DateOfRequ" rules={[{ required: true, message: 'Date of Request is required' }]}>
          <Input type="date" style={inputStyle} />
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}>Date of Last Inspection</p>
        <Form.Item name="DateLastIn">
          <Input type="date" style={inputStyle} />
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}>Type of Inspection</p>
        <Form.Item name="TypeOfInsp">
          <Select style={{ width: '749px', height: '35px' }}>
            <Select.Option value="initial">Initial</Select.Option>
            <Select.Option value="annual">Annual</Select.Option>
            <Select.Option value="complaint">Complaint</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}>Special instructions/Notes <span style={{ color: 'red' }}>*</span></p>
        <Form.Item name="Neighborho">
          <Input.TextArea
            style={{
              width: '749px',
              height: '119px',
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

      <Divider />

      <div>
        <p style={contentStyle}>Inspector Name</p>
        <Form.Item name="TypeOfInsp">
          <Select style={{ width: '749px', height: '35px' }}>
            <Select.Option value="-">-</Select.Option>
            <Select.Option value="JohnSmith">John Smith</Select.Option>
            <Select.Option value="MichaelBrown">Michael Brown</Select.Option>
            <Select.Option value="EmilyJohnson">Emily Johnson</Select.Option>
            <Select.Option value="SarahDavis">Sarah Davis</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}>Check In</p>
        <Form.Item name="checkIn">
          <Input type="text" style={inputStyle} />
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}>Check Out</p>
        <Form.Item name="checkOut">
          <Input type="text" style={inputStyle} />
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}>Total Time</p>
        <Form.Item name="totalTime">
          <Input type="text" style={inputStyle} />
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}>Inspector Notes</p>
        <Form.Item name="notes">
          <Input.TextArea
            style={{
              width: '749px',
              height: '119px',
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
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        // beforeUpload={beforeUpload}
        // onChange={handleChange}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </div>

    </Form>
  );
};

export default InspectionInformation;
