import { Form, Input, Select } from 'antd';
import React from 'react';

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
  fontSize: 'small'
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
}

const currentDate = new Date().toISOString().split('T')[0];

const InspectionInformation: React.FC<InspectionInformationProps> = ({ form }) => {
  return (
    <Form
      form={form}
      initialValues={{ DateOfRequ: currentDate }}
      style={{
        width: '777px',
        height: '599px',
        padding: '2px 2px 2px 2px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxSizing: 'border-box',
      }}
    >
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
          <Input type="date" style={inputStyle} readOnly />
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
            {/* <Select.Option value="annual">Annual</Select.Option>
            <Select.Option value="complaint">Complaint</Select.Option> */}
          </Select>
        </Form.Item>
      </div>

      <div>
        <p style={contentStyle}>Special instructions/Notes <span style={{ color: 'red' }}>*</span></p>
        <Form.Item name="Neighborho" rules={[{ required: true, message: 'Special instructions/Notes are required' }]}>
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
    </Form>
  );
};

export default InspectionInformation;
