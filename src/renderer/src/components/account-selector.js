import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Button } from 'react-bulma';

export default class AccountSelector extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    accounts: PropTypes.array,
  };

  static defaultProps = {
    onSelect: () => null,
    accounts: [],
  }

  constructor(props) {
    super(props);
    // FIXME: use first instead of index 0
    this.state = { selected: props.accounts[0] };
    this.onSelect = ::this.onSelect;
  }

  componentWillReceiveProps(next) {
    if (isEmpty(this.props.accounts) && !isEmpty(next.accounts)) {
      // FIXME: use first instead of index
      this.setState({ selected: next.accounts[0] });
      this.onSelect(next.accounts[0]);
    }
  }

  onSelect(account) {
    this.props.onSelect(account.id);
  }

  renderAccounts() {
    if (isEmpty(this.props.accounts)) return null;
    return this.props.accounts.map(account => {
      const onClick = this.onSelect.bind(this, account);
      return (
        <div key={account.id} onClick={onClick}>
          <img
            src={account.profile_image_url}
            className="account-selector__avatar"
            style={account.id === this.state.selected.id ? {border: 'solid 1px red'} : {}}
          />
          {/* <span className="accounts__name">{account.screen_name}</span> */ }
        </div>
      );
    });
  }

  render() {
    return (
      <div className="account-selector" >
        <div className="account-selector__title-wrapper" >
          <i className="account-selector__icon--users lnr lnr-users" />
          <span className="account-selector__title">Choose account</span>
        </div>
        <div className="account-selector__accounts" >
          {this.renderAccounts()}
        </div>
        <div className="account-selector__buttons">
          <Button
            className="account-selector__button--back"
            onClick={this.props.onBackClick}
          >
            Back
          </Button>
          <Button
            style={{ marginLeft: '6px' }}
            onClick={this.props.onCreateClick.bind(this, this.state.selected.id)}
          >
            Create
          </Button>
        </div>
      </div>
    );
  }
}
