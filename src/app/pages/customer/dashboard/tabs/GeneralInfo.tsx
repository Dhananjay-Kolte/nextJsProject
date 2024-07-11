import { Form, Input } from 'antd';
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

interface GeneralInformationProps {
  form: any;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({ form }) => {
  return (
    <Form form={form}>
      <div style={{
        width: '772px',
        height: '599px',
        padding: '2px 2px 2px 2px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxSizing: 'border-box',
        overflow: 'auto',
      }}>

        <div>
          <p style={contentStyle}>Name of Family</p>
          <Form.Item name="NameOfFami">
            <Input style={inputStyle} />
          </Form.Item>
        </div>
        <div>
          <p style={contentStyle}>Street Address <span style={{ color: 'red' }}>*</span></p>
          <Form.Item name="StreetAddr" rules={[{ required: true, message: 'Street Address is required' }]}>
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>City of Inspected Unit <span style={{ color: 'red' }}>*</span></p>
          <Form.Item name="CityOfInsp" rules={[{ required: true, message: 'City is required' }]}>
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>County of Inspected Unit</p>
          <Form.Item name="CountyOfIn">
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>State of Inspected Unit <span style={{ color: 'red' }}>*</span></p>
          <Form.Item name="StateOfIns" rules={[{ required: true, message: 'State is required' }]}>
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Zip Code of Inspected Unit <span style={{ color: 'red' }}>*</span></p>
          <Form.Item name="ZipOfInspe" rules={[{ required: true, message: 'Zip Code is required' }]}>
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Year Constructed <span style={{ color: 'red' }}>*</span></p>
          <Form.Item name="constructedyear" rules={[{ required: true, message: 'Feild is required' }]}>
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Number of Sleeping Rooms</p>
          <Form.Item name="NumberOfSl">
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Unit Size</p>
          <Form.Item name="UnitSizeCo">
            <Input style={inputStyle} />
          </Form.Item>
        </div>

        <div>
          <p style={contentStyle}>Address of Owner or Agent</p>
          <Form.Item name="AddressOfO">
            <Input style={inputStyle} />
          </Form.Item>
        </div>
        <div>
          <p style={contentStyle}>Owner or Agent City</p>
          <Form.Item name="OwnerOrAge">
            <Input style={inputStyle} />
          </Form.Item>
        </div>
        <div>
          <p style={contentStyle}>Owner or Agent County</p>
          <Form.Item name="OwnerOrAge1">
            <Input style={inputStyle} />
          </Form.Item>
        </div>
        <div>
          <p style={contentStyle}>Owner or Agent Zip Code</p>
          <Form.Item name="OwnerOrAge3">
            <Input style={inputStyle} />
          </Form.Item>
        </div>
        <div>
          <p style={contentStyle}>Telephone of Owner or Agent<span style={{ color: 'red' }}>*</span></p>
          <Form.Item name="TelephoneO" rules={[{ required: true, message: 'Telephone of Owner is required' }]}>
            <Input style={inputStyle} />
          </Form.Item>
        </div>
        <div>
          <p style={contentStyle}>Email of Owner or Agent</p>
          <Form.Item name="EmailOfOwn">
            <Input style={inputStyle} />
          </Form.Item>
        </div>
        <div>
          <p style={contentStyle}>Number of Children in Family under 6 <span style={{ color: 'red' }}>*</span></p>
          <Form.Item name="NumberOfCh" rules={[{ required: true, message: 'Feild is required' }]}>
            <Input style={inputStyle} />
          </Form.Item>
        </div>
      </div >
    </Form>
  );
};

export default GeneralInformation;
