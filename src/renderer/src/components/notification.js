import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';

export default class Notification extends Component {
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
