import React, { PureComponent } from 'react';
import B from '../lib/bem';

const b = B.with('thin-sidemenu');

export default class ThinSidemenu extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { destroyTooltip: false };
    this.onAddRequest = this.onAddRequest.bind(this);
    this.onAddColumnClick = this.onAddColumnClick.bind(this);
  }

  onAddRequest() {
    this.props.addAccount();
  }

  onAddColumnClick() {
    if (this.props.isAddColumnMenuOpen) {
      this.props.closeAddColumnMenu();
    } else {
      this.props.openAddColumnMenu();
    }
  }

  renderAddColumnButton() {
    const icon = this.props.isAddColumnMenuOpen ? 'times' : 'plus';
    return (
      <div
        className={b('button', { addcolumn: true })}
        onClick={this.onAddColumnClick}
      >
        <i className={`fa fa-${icon}`} />
      </div>
    );
  }

  renderColumList() {
    return this.props.columns.map(column => (
      <li className={b('list', { columns: true })} key={column.id}>
        <i className={`${b('icon')} ${column.icon}`} />
      </li>
    ));
  }

  render() {
    return (
      <div className={b()}>
        <div className={b('menu-icon-wrapper')}>
          <i className={`${b('menu-icon')} fa fa-bars`} onClick={this.props.onMenuClick} />
        </div>
        <div className={b('column-wrapper')}>
          {this.renderColumList()}
        </div>
        {this.renderAddColumnButton()}
      </div>
    );
  }
}
