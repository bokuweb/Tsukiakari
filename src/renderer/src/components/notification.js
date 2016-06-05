import React, { Component, PropTypes } from 'react';
import NotificationSystem from 'react-notification-system';

export default class Notification extends Component {
  static propTypes = {
    notification: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.assignNotificationRef = ::this.assignNotificationRef;
  }

  componentWillReceiveProps(next) {
    console.dir(next)
    this._notification.addNotification({
      message: next.notification.type,
      level: 'success',
    });
  }

  assignNotificationRef(ref) {
    this._notification = ref;
  }

  render() {
    return (
      <NotificationSystem ref={this.assignNotificationRef} />
    );
  }
}
