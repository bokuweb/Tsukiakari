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
    this.notification.addNotification({
      message: next.notification.message,
      level: next.notification.level,
    });
  }

  assignNotificationRef(ref) {
    this.notification = ref;
  }

  render() {
    return (
      <NotificationSystem ref={this.assignNotificationRef} />
    );
  }
}
