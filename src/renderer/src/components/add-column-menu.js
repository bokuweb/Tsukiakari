import React, { Component, PropTypes } from 'react';

export default class AddColumnMenu extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: () => false,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const style = this.props.isOpen ? 'add-column-menu add-column-menu--is-open'
                                    : 'add-column-menu';
    return (
      <div className={style}>right menu</div>
    );
  }
}

