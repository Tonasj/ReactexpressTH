import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.css"; 
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './App.css';

class App extends Component {
  state = {
      data: null
  };
  
  async componentDidMount() {
    try{
    const responseData = await this.callBackendAPI();
    this.setState({ data: responseData.prices });
    console.log(responseData);
    }catch(err){console.log(err);};
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('http://localhost:4000/express_data');
    if (response.status !== 200) {
      throw Error(response.message) 
    }
    const body = await response.json();
    return body;
  };
  
  formatDates(start,end){
    const startDateTime = new Date(start);
    const endDateTime = new Date(end);
    const startDateStr = `${startDateTime.getDate()}.${startDateTime.getMonth() + 1}.${startDateTime.getFullYear()}`;
    const startTimeStr = `${startDateTime.getHours()}:${startDateTime.getMinutes() < 10 ? '0' : ''}${startDateTime.getMinutes()}`;
    const endTimeStr = `${endDateTime.getHours()}:${endDateTime.getMinutes() < 10 ? '0' : ''}${endDateTime.getMinutes()}`;
    return `${startDateStr} ${startTimeStr}-${endTimeStr}`;
  }
  render() {
    const {data}=this.state;
    return (
      <Container style={{width:'30%'}} data-bs-theme="dark">
      <Row>
      <Col>
      <Table striped bordered >
      <thead >
        <tr>
          <th>Date</th>
          <th>Price</th>
        </tr>
      </thead>
      {data ? (
      <tbody >
        {data.map((item, index) => (
          <tr key={index}>
            <td style={{width:'60%'}}>{this.formatDates(item.startDate,item.endDate)}</td>
            <td style={{width:'40%'}}>{item.price}</td>
          </tr>
        ))}
        </tbody>
        ): <p>Data</p>}
    </Table>
    </Col>
    </Row>
    </Container>
  );
  }
}
  
export default App;
