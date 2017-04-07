// @flow
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>TSUKIAKARI</div>
            <div className={styles.menu}><Icon name="unordered list" /></div>
          </div>
          <div className={styles.account}>
            <div className={styles.avatar} >
              <img src="../assets/dummy_icon.png" />
            </div>
            <div className={styles.accountName} >
              <div className={styles.name}>bokuweb</div>
              <div className={styles.screenName}>@bokuweb17</div>
            </div>
            <div>
              <div className={styles.chevron}><Icon name="chevron right" /></div>
            </div>
          </div>
        </div>
        <div className={styles.content}>

        </div>
      </div>
    );
  }
}
