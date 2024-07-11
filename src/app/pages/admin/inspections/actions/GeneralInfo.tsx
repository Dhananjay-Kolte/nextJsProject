import { Form, Input } from 'antd';
import React, { useEffect } from 'react';

const contentStyle: React.CSSProperties = {
  width: '400px',
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

interface GeneralInformationProps {
  form: any;
  inspectionData: any;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({ form, inspectionData }) => {

  useEffect(() => {
    if (inspectionData) {
      form.setFieldsValue({
        NameOfFami: inspectionData.attributes?.NameOfFami,
        StreetAddr: inspectionData.attributes?.StreetAddr,
        CityOfInsp: inspectionData.attributes?.CityOfInsp,
        CountyOfIn: inspectionData.attributes?.CountyOfIn,
        StateOfIns: inspectionData.attributes?.StateOfIns,
        ZipOfInspe: inspectionData.attributes?.ZipOfInspe,
        constructedyear: inspectionData.attributes?.constructedyear,
        NumberOfSl: inspectionData.attributes?.NumberOfSl,
        UnitSizeCo: inspectionData.attributes?.UnitSizeCo,
        NameOfOwne: inspectionData.attributes?.NameOfOwne,
        AddressOfO: inspectionData.attributes?.AddressOfO,
        OwnerOrAge: inspectionData.attributes?.OwnerOrAge, //Owner city
        OwnerOrAge1: inspectionData.attributes?.OwnerOrAge1, //Owner Country
        OwnerOrAge3: inspectionData.attributes?.OwnerOrAge3, //Owner Zipcode
        TelephoneO: inspectionData.attributes?.TelephoneO, //Owner TelephoneO
        EmailOfOwn: inspectionData.attributes?.EmailOfOwn, //Owner EmailOfOwn
        NumberOfCh: inspectionData.attributes?.NumberOfCh
      });
    }
  }, [inspectionData, form]);

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
          <p style={contentStyle}>Year Constructed</p>
          <Form.Item name="constructedyear">
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
          <p style={contentStyle}>Name of Owner or Authorized to Lease Unit Inspected</p>
          <Form.Item name="AddressOfO">
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
          <p style={contentStyle}>Number of Children in Family under 6</p>
          <Form.Item name="NumberOfCh">
            <Input style={inputStyle} />
          </Form.Item>
        </div>
      </div >
    </Form>
  );
};

export default GeneralInformation;
