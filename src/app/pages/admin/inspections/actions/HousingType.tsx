import { Form, Select } from 'antd';
import React, { useEffect } from 'react';

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

interface HousingTypeProps {
  form: any;
  inspectionData: any;
}

const HousingType: React.FC<HousingTypeProps> = ({ form, inspectionData }) => {

  useEffect(() => {
    if (inspectionData) {
      form.setFieldsValue({
        HousingTyp: inspectionData.attributes?.HousingTyp,
      });
    }
  }, [inspectionData, form]);

  return (
    <Form form={form}>
      <div style={{
        width: '777px',
        height: '599px',
        padding: '2px 2px 2px 2px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxSizing: 'border-box'
      }}>
        <p style={contentStyle}>Housing Type <span style={{ color: 'red' }}>*</span></p>
        <Form.Item name="HousingTyp" rules={[{ required: true, message: 'Housing Type is required' }]}>
          <Select style={{ width: '749px', height: '35px' }}>
            <Select.Option value="Simple-Family Home">Simple-Family Home</Select.Option>
            <Select.Option value="Apartment Building">Apartment Building</Select.Option>
            <Select.Option value="Townhouse">Townhouse</Select.Option>
            <Select.Option value="Condominium">Condominium</Select.Option>
            <Select.Option value="Duplex">Duplex</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </Form>
  );
};

export default HousingType;
