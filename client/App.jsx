import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    const { org } = props;
    this.state = {
      org,
      templates: [],
      signers: [],
    };
  }

  componentDidMount() {
    const { org } = this.state;
    // retrieve templates and signers from server
    // update state
  }

  render() {
    return (
      <div>
        hi
      </div>
    );
  }
}

export default App;
