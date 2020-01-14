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
      formId: '',
      signerId: '',
      signerName: '',
      signerEmail: '',
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
    const { history } = this.props;
    const { signers } = this.state;

    const signer = signers.find(({ contactId }) => contactId === signerId);
    const { name, emails } = signer;
    this.setState({
      formId, signerId, signerName: name, signerEmail: emails[0],
    }, () => {
      // TODO - does this cause double render?  could next line be moved out of cb?
      history.push('/edit');
      // TODO - remove next line and add edit actual route
      // this.handleFormSubmit();
    });
  }

  async handleFormSubmit() {
    // TODO - submit populated form for signature
    const { history } = this.props;
    const { formId, signerId } = this.state;
    try {
      const res = await axios({
        method: 'POST',
        url: `${host}/forms`,
        data: {
          formId,
          signerId,
        },
      });
      history.push('/finish');
    } catch (error) {
      console.log(error);
    }
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
          Referral form submitted for signature!
        </Route>
      </div>
    );
  }
}

export default withRouter(App);
