"use client"
import { Card, Divider, Form, Select, Space } from "antd";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const inspectionJson = [
  {
    data: "  May 15",
    header: "Condominium Inspection",
    desc: "Lynchburg Redevelopment and Housing Authority(VA)"
  },
  {
    data: "May 18",
    header: "Single - Family Home Inspection",
    desc: "Greenwood Housing Authority(MS)"
  },
  {
    data: "May 20",
    header: "header>Apartment Inspection",
    desc: "City of Los Angeles Housing Authority(CA)"
  },
  {
    data: "May 21",
    header: "Condominium Inspection",
    desc: "Laurinburg Housing Authority(NC)"
  },

  {
    data: "May 22",
    header: "Duplex Inspection",
    desc: "Jacksonville Housing Authority(FL)"
  },
  {
    data: "May 24",
    header: "Duplex Inspection",
    desc: "Crossville Housing Authority(TN)"
  }
]

const Dashboard: React.FC = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '20px' }}>
        <p style={{
          width: '135px',
          height: '25px',
          padding: '2px 8px 2px 8px',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          boxSizing: 'border-box',
          fontFamily: '"Arial", sans-serif',
          color: '#333333',
        }}>View</p>
        <Select
          defaultValue="This Month"
          className="custom-select"
          style={{
            width: '157px',
            height: '40px',
          }}
          onChange={handleChange}
          options={[
            { value: 'month', label: 'This Month' },
            { value: 'quarter', label: 'This Quarter' },
            { value: 'year', label: 'This Year' }
          ]}
        />
      </div>
      <Form
        style={{
          width: '1422px',
          height: '559px',
          backgroundColor: '#ffffff',
          margin: '20px',
          padding: '2px 8px 2px 8px',
          borderRadius: '30px',
          boxSizing: 'border-box',
          boxShadow: ' 4px 5px 10px 0px rgba(50, 50, 93, 0.1)',
        }}>
        <Space
          direction="horizontal"
          justify-content='space-between'>
          <div>
            <p
              style={{
                width: '274px',
                height: '38px',
                padding: '2px 8px 2px 8px',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                fontFamily: '"Arial Bold", "Arial", sans-serif',
                fontWeight: '700',
                color: '#333333',
                textAlign: 'left',
                lineHeight: 'normal',
                margin: '16px 0 16px 17px'
              }}>
              Upcoming Inspections
            </p>
          </div>
          <div>
            <a
              href=""
              style={{
                width: '106px',
                height: '26px',
                //padding: '2px 8px 2px 8px',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                boxSizing: 'border-box',
                fontFamily: '"Arial Italic", "Arial", sans-serif',
                fontStyle: 'italic',
                color: '#156082',
                textAlign: 'right',
                lineHeight: 'normal',
                fontSize: 'small',
                margin: '22px 0 0 990px'
              }}>
              View Inspections
            </a>
          </div>
        </Space>
        <div style={{ height: '469px', overflowY: 'auto' }}>
          {inspectionJson.map((item, index) => (
            <Space
              key={index}
              direction="horizontal"
              style={{
                width: '1380px',
                height: '83px',
                padding: '2px 8px 2px 8px',
                borderBottom: '1px solid #d8d8d8',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                marginBottom: '10px',
              }}
            >
              <Card
                style={{
                  width: '50px',
                  height: '50px',
                  padding: '2px 8px 2px 8px',
                  borderRadius: '8px',
                  border: '1px solid #d8d8d8',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                  fontFamily: `"Arial", sans-serif`,
                  color: '#333333',
                  textAlign: 'center',
                  lineHeight: 'normal',
                  margin: '17px 21px 16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <p>{item.data}</p>
              </Card>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <p><b>{item.header}</b></p>
                <p>{item.desc}</p>
              </div>
              <Divider type="vertical" />
            </Space>
          ))}
        </div>
      </Form >
    </>
  )
}

export default Dashboard;
