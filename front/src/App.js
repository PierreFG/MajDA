import './App.css';

import majda_logo from "./logo.png";
import Comparabilities from './Components/Comparabilities/Comparabilities'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function App() {
  return (
    <Container id="app-container">
      <Row id='header-row'>
        <div style={{marginLeft: '30px', width: '100px', display : 'inline-block'}}>
          <img src={majda_logo} id="top-logo" alt="majda_logo" style={{height:'80px', position: 'absolute', top: '15px'}}/>
        </div>
        <div style={{textAlign: 'end', display : 'inline-block'}}>
          MajDA connects to your favorite DBMS and helps you define meaningfull comparabilities. 
        </div>
      </Row>
      <Row id="main-interface">
        <Row id='first-row'>
          <Col>
            <h5>SQL QUERY</h5>
            <Form.Control as="textarea" id="query-textarea"/>
            <Button variant="primary" type="submit" id="submit-button">
              Submit
            </Button>
          </Col>

          <Col>
            <Comparabilities/>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>RESULT</h5>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default App;
