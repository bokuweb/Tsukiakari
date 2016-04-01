import React, { Component, PropTypes } from 'react';

export default class ColumnTitle extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => null,
  }

  constructor(props) {
    super(props);
    this.onChange = ::this.onChange;
  }

  onChange({ target: { value } }) {
    this.props.onChange(value);
  }

  render() {
    return (
      <div className="column-title" >
        <div className="column-title__title-wrapper" >
          <i className="column-title__icon--title fa fa-pencil-square-o" />
          <span className="column-title__title">Column title</span>
        </div>
        <div className="column-title__accounts" >
          <input
            className="column-title__input"
            type="text"
            onChange={this.onChange}
            placeholder="new column title"
          />
        </div>
      </div>
    );
  }
}
