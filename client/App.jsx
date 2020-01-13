import React, { Component } from 'react';
import axios from 'axios';

const host = 'http://localhost:3000';

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

  async componentDidMount() {
    const { org } = this.state;
    try {
      const res = await axios({
        method: 'GET',
        url: `${host}/forms`,
        params: {
          orgId: org.orgId,
        },
      });
      // TODO - request available signers through server Users>Contacts DS API
      this.setState({ templates: res.data.envelopeTemplates });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { templates, signers } = this.state;
    // TODO - start with loading spinner until list is loaded
    // TODO - create separate form select component
    return (
      <div>
        {templates.map(({ name, templateId }) => (
          <div key={templateId}>
            {name}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
