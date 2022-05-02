import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HomePage } from './app/pages/HomePage';
import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';

function App() {
  return (
    <Layout>
      <Content
        style={{
          margin: '30px',
          height: '100vh',
        }}
      >
        <Row justify="center">
          <Col
            xs={{
              span: 24,
            }}
            lg={{
              span: 8,
            }}
          >
            <BrowserRouter>
              <div className="lg:container mx-auto">
                <ToastContainer />
                <div className="flex justify-center">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                  </Routes>
                </div>
              </div>
            </BrowserRouter>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
