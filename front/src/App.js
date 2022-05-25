import './App.css';

import majda_logo from "./logo.svg";
import Comparabilities from './Comparabilities/Comparabilities'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function App() {
  return (
    <Container id="app-container">
      <Comparabilities/>
      <Row id='header-row'>
          <Col style= {{
                height: "100%",
                textAlign: "center",
          }}>
            <img src={majda_logo} id="top-logo" alt="majda_logo"/>
          </Col>
          <Col xs={8} style= {{
                height: "100%",
                verticalAlign: "middle",
          }}>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor tortor id sodales interdum. Vivamus convallis nibh a dui congue, id eleifend nibh tempus. Suspendisse vulputate sit amet nulla non dignissim. Aenean in porttitor leo. Aenean quis gravida nisi. Suspendisse et augue sed nisl elementum tempus at in urna. Nunc a odio ultrices lectus faucibus pretium ac id libero.
            </p>
          </Col>
      </Row>
      <Row id='first-row'>
        <Col>
          <h5>SQL QUERY</h5>
          <Form.Control as="textarea" id="query-textarea"/>
          <Button variant="primary" type="submit" id="submit-button">
            Submit
          </Button>
        </Col>

        <Col>
          
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>RESULT</h5>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
