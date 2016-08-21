import React, { PureComponent } from 'react';
import B from '../lib/bem';

const b = B.with('thin-sidemenu');

export default class ThinSidemenu extends PureComponent {
  static defaultProps = {
    onAddRequest: () => null,
  };

  constructor(props) {
    super(props);
    this.state = { destroyTooltip: false };
    this.onAddRequest = this.onAddRequest.bind(this);
  }

  onAddRequest() {
    this.props.addAccount();
  }

  render() {
    return (
      <div className={b()}>
        <i className={`${b('menu-icon')} fa fa-bars`} onClick={this.props.onMenuClick} />
        <div className={b('add')} onClick={this.onAddRequest}>
          <span className={b('icon', { add: true })}>+</span>
        </div>
      </div>
    );
  }
}
