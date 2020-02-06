import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import FormSelect from './components/FormSelect.jsx';
import FormEdit from './components/FormEdit.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    const { org, host } = props;
    this.state = {
      org,
      host,
      forms: [],
      signers: [],
      isLoading: true,
      formId: '',
      signer: {},
      formFieldsEntries: [],
    };

    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.handleFormSelect = this.handleFormSelect.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async componentDidMount() {
    const { org, host } = this.state;
    const { orgId } = org;
    try {
      // TODO - add client/server auth
      const serverReqs = [
        axios({
          method: 'GET',
          url: `${host}/forms`,
          params: { orgId },
        }),
        axios({
          method: 'GET',
          url: `${host}/signers`,
          params: { orgId },
        }),
      ];

      const [resForms, resSigners] = await Promise.all(serverReqs);
      this.setState({
        forms: resForms.data.envelopeTemplates,
        signers: resSigners.data.contacts,
      }, this.setState({ isLoading: false }));
    } catch (error) {
      console.log(error);
    }
  }

  handleRouteChange(route) {
    const { history } = this.props;
    // TODO - does this cause double render when used in setState cb?
    history.push(route);
  }

  handleFormSelect(formId, signerId) {
    const { signers } = this.state;
    debugger;
    const signer = signers.find(({ contactId }) => contactId === signerId);
    this.setState({
      formId, signer,
    }, () => {
      this.handleRouteChange('/edit');
    });
  }

  handleFormEdit(formFieldsEntries) {
    this.setState({ formFieldsEntries }, () => {
      this.handleRouteChange('/review');
    });
  }

  async handleFormSubmit() {
    const {
      host, formId, signer, formFieldsEntries,
    } = this.state;
    const { name, emails } = signer;
    try {
      // TODO - add client/server auth
      const res = await axios({
        method: 'POST',
        url: `${host}/forms`,
        data: {
          formId,
          signerName: name,
          signerEmail: emails[0],
          formFieldsEntries,
        },
      });
      console.log(res);
      this.handleRouteChange('/finish');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoading, forms, signers } = this.state;
    return (
      <div aria-label="app">
        <h1>Referral Form Flow</h1>
        <Route exact path="/">
          {isLoading
            ? (
              <div className="spinner-border m-3">
                <span className="sr-only">Loading...</span>
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
          <FormEdit
            handleFormEdit={this.handleFormEdit}
          />
        </Route>
        <Route path="/review">
          Review
          <br />
          <button aria-label="reviewSubmit" type="button" onClick={this.handleFormSubmit}>
            Send form
          </button>
        </Route>
        <Route path="/finish">
          Referral form sent for signature!
          <br />
          <button aria-label="startAgainButton" type="button" onClick={() => this.handleRouteChange('/')}>
            Start another form
          </button>
        </Route>
      </div>
    );
  }
}

export default withRouter(App);
