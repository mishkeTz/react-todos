import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>1 of 2</Col>
            <Col>2 of 2</Col>
          </Row>
          <Row>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
        </Container>;
      </div>
    );
  }
}

export default App;
