import React from 'react';
import EnhancedTable from "./Table";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/partners")
      .then(response => response.json())
      .then(data => this.setState({data: data.rows}))
      .catch(error => console.error(error))
  }

  render() {
    return (
      <EnhancedTable rows={this.state.data}/>
    );
  };
}

export default Header;
