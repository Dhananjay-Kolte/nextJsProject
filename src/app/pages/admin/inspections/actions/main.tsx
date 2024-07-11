import customerServices from '@/app/service/customer/dashboard.service';
import { Button, Divider, Form, Space, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import InspectionInformation from './InspectionInfo';
import GeneralInformation from './GeneralInfo';
import HousingType from './HousingType';
import axios from 'axios';

const token = process.env.NEXT_PUBLIC_BACKEND_TOKEN;

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

interface MainFormProps {
  setModalOpen: (open: boolean) => void;
  id: string | null;
  setReloadInspectionData: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainForm: React.FC<MainFormProps> = ({ setModalOpen, id, setReloadInspectionData }) => {
  const [inspectionForm] = Form.useForm();
  const [generalForm] = Form.useForm();
  const [housingForm] = Form.useForm();
  const [activeKey, setActiveKey] = useState('1');
  const [activeModelButton, setActiveModelButton] = useState('');
  const [inspectionData, setInspectionData] = useState<any[]>([]);
  const [form] = Form.useForm();

  const handleNext = () => {
    const nextKey = (parseInt(activeKey) + 1).toString();
    setActiveKey(nextKey);
  };

  const handleModelButtonClick = async (buttonType: string) => {
    setActiveModelButton(buttonType);
    if (buttonType == 'update') {
      const inspectionValues = await inspectionForm.validateFields();
      const generalValues = await generalForm.validateFields();
      const housingValues = await housingForm.validateFields();

      const payload = {
        status: 'open',
        ...inspectionValues,
        ...generalValues,
        ...housingValues,
      };
      await customerServices.patchInspection(id, payload);
      dispatchSubmission(payload);
      setModalOpen(false);
      setReloadInspectionData((prev)=>!prev)
    }
  }

  const payloadForDispatch = (payload: any) => {
    const sanitized = { ...payload };
    Object.keys(sanitized).forEach(key => {
      if (sanitized[key] == null) {
        sanitized[key] = "";
      }
    });
    return sanitized;
  }

  const dispatchSubmission = (requestPayload: any) => {
    const payload = payloadForDispatch(requestPayload);
    axios.post('http://localhost:1337/api/integration', JSON.stringify({ requestPayload: payload }), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => {
        console.log('Error:', error);
      })
  }

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  useEffect(() => {
    const getInspections = async () => {
      if (id) {
        try {
          const resp = await customerServices.getInspectionById(id);
          const res = await resp.json();

          if (res && res.data) {
            const inspection = res.data;
            setInspectionData(inspection);

            // Set form fields
            form.setFieldsValue({
              TenantIdNu: inspection.attributes?.TenantIdNu,
              customerName: inspection.attributes?.customerName, //?
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
      }
    };

    getInspections();
  }, [id, form]);

  return (
    <div>
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
        }}>Single-Family Home Inspection</p>
        <div style={{ marginLeft: '100px' }}>
          <Button
            style={activeModelButton === 'status' ? activeModelButtonStyle : buttonStyle}
            onClick={() => handleModelButtonClick('status')}>
            Mark as Closed
          </Button>
          {activeKey !== '3' ? (
            <Button
              type="primary"
              onClick={handleNext}
              style={activeModelButtonStyle}
            >
              Next
            </Button>
          ) : (
            <Button
              type="primary"
                onClick={() => handleModelButtonClick('update')}
                style={activeModelButtonStyle}
            >
              Submit Request
            </Button>
          )}
        </div>
      </Space>
      <Divider />
      <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={handleTabChange}>
        <Tabs.TabPane tab="Inspection Information" key="1">
          <InspectionInformation form={inspectionForm} inspectionData={inspectionData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General Information" key="2">
          <GeneralInformation form={generalForm} inspectionData={inspectionData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Housing Type" key="3">
          <HousingType form={housingForm} inspectionData={inspectionData} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MainForm;
