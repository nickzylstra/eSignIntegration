import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import FormSelect from './components/FormSelect.jsx';

const host = 'http://localhost:3000';

class App extends Component {
  constructor(props) {
    super(props);
    const { org } = props;
    this.state = {
      org,
      forms: [],
      signers: [],
      isLoading: true,
    };

    this.handleFormSelect = this.handleFormSelect.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async componentDidMount() {
    const { org } = this.state;
    const { orgId } = org;
    try {
      const serverReqs = [];
      serverReqs.push(axios({
        method: 'GET',
        url: `${host}/forms`,
        params: { orgId },
      }));
      serverReqs.push(axios({
        method: 'GET',
        url: `${host}/signers`,
        params: { orgId },
      }));

      const [resForms, resSigners] = await Promise.all(serverReqs);
      this.setState({
        forms: resForms.data.envelopeTemplates,
        signers: resSigners.data.contacts,
      }, this.setState({ isLoading: false }));
    } catch (error) {
      console.log(error);
    }
  }

  handleFormSelect(formId, signerId) {
    // TODO - switch to view to add form data
    this.props.history.push('/edit');
  }

  handleFormSubmit() {
    // TODO - submit populated form for signature
  }

  render() {
    const { isLoading, forms, signers } = this.state;
    return (
      <div>
        <h1>Referral Form Flow</h1>
        <Route exact path="/">
          {isLoading
            ? (
              <div>
                loading forms and signers...
              </div>
            )
            : (
              <FormSelect
                nextRoute="/edit"
                forms={forms}
                signers={signers}
                handleFormSelect={this.handleFormSelect}
              />
            )}
        </Route>
        <Route path="/edit">
          edit
        </Route>
        <Route path="/review">
          review
        </Route>
        <Route path="/finish">
          Referall form submitted for signature!
        </Route>
      </div>
    );
  }
}

export default withRouter(App);
