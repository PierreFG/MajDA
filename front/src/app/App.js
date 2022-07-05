import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { Toaster } from 'react-hot-toast';

import DDLQuery from '../features/queries/DDLQuery';
import Comparabilities from '../features/comparabilities/Comparabilities';
import Header from '../features/layout/Header';
import QueryResult from '../features/queryResult/QueryResult';

import { FaSearch }from 'react-icons/fa';

const App = () => {
  return (
    <Container id="app-container">
      <Toaster />
      <Row>
        <Header />
      </Row>
      <Row id="main-interface">
        <Row id='first-row'>
          <Col>
            <h5><FaSearch /> SQL QUERY</h5>
            <Tabs defaultActiveKey="ddl" id="query-tabs" className="mb-3">
              <Tab eventKey="ddl" title="DDL Query" className='query-tab'>
                <DDLQuery />
              </Tab>
              <Tab eventKey="dml" title="DML Query" className='query-tab'>
                <Form.Control as="textarea" id="dml-query-textarea"/>
                <Button variant="primary" type="submit" id="dml-submit-button">
                  Submit
                </Button>
              </Tab>
            </Tabs>
            
          </Col>

          <Col>
            <Comparabilities/>
          </Col>
        </Row>
        <Row>
          <Col>
            <QueryResult />
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default App;
