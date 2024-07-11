import customerServices from '@/app/service/customer/dashboard.service';
import { Button, Form, Tabs } from 'antd';
import React, { useState } from 'react';
import InspectionInformation from './InspectionInfo';
import GeneralInformation from './GeneralInfo';
import HousingType from './HousingType';
import axios from 'axios';

const token = process.env.NEXT_PUBLIC_BACKEND_TOKEN;


interface MainFormProps {
  setInspectionModalOpen: (open: boolean) => void;
  onSubmit: (formData: any) => void;
}

const MainForm: React.FC<MainFormProps> = ({ setInspectionModalOpen, onSubmit }) => {
  const [inspectionForm] = Form.useForm();
  const [generalForm] = Form.useForm();
  const [housingForm] = Form.useForm();
  const [activeKey, setActiveKey] = useState('1');

  const handleNext = () => {
    const nextKey = (parseInt(activeKey) + 1).toString();
    setActiveKey(nextKey);
  };

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const handleSubmit = async () => {
    try {
      const inspectionValues = await inspectionForm.validateFields();
      const generalValues = await generalForm.validateFields();
      const housingValues = await housingForm.validateFields();

      const payload = {
        status : 'unassigned',
        ...inspectionValues,
        ...generalValues,
        ...housingValues,
      };

      await customerServices.postInspection(payload);
      // await dispatchSubmission(payload);
      onSubmit(payload);
      setInspectionModalOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={handleTabChange}>
        <Tabs.TabPane tab="Inspection Information" key="1">
          <InspectionInformation form={inspectionForm} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General Information" key="2">
          <GeneralInformation form={generalForm} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Housing Type" key="3">
          <HousingType form={housingForm} />
        </Tabs.TabPane>
      </Tabs>
      {activeKey !== '3' ? (
        <Button
          type="primary"
          onClick={handleNext}
          style={{
            width: '167px',
            height: '35px',
            padding: '2px 8px',
            borderRadius: '10px',
            backgroundColor: '#156082',
            boxSizing: 'border-box',
            boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
            fontFamily: `"Arial", sans-serif`,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 'normal',
            margin: '20px 20px 0 580px',
          }}
        >
          Next
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{
            width: '167px',
            height: '35px',
            padding: '2px 8px',
            borderRadius: '10px',
            backgroundColor: '#156082',
            boxSizing: 'border-box',
            boxShadow: '4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
            fontFamily: `"Arial", sans-serif`,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 'normal',
            margin: '20px 20px 0 580px',
          }}
        >
          Submit Request
        </Button>
      )}
    </div>
  );
};

export default MainForm;
