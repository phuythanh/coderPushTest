import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HomePage } from './app/pages/HomePage';
import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <UserManagement />
    //   </header>
    // </div>
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
              {/* <Helmet>
        <title>Home page</title>
      </Helmet> */}
              <Switch>
                <Route>
                  <div className="lg:container mx-auto">
                    <ToastContainer />
                    <div className="flex justify-center">
                      <Switch>
                        <Route exact path="/">
                          <HomePage />
                        </Route>
                        {/* <UserRoute>
                  <Route exact path="/share">
                  <SharePage />
                  </Route>
                </UserRoute> */}
                        {/* <Route component={NotFound} /> */}
                      </Switch>
                    </div>
                  </div>
                </Route>
              </Switch>
            </BrowserRouter>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
