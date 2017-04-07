// @flow
import React, { Component } from 'react';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.title}>
            <div>TSUKIAKARI</div>
          </div>
          <div className={styles.account}>a</div>          
        </div>
        <div className={styles.content}>
          a
        </div>
      </div>
    );
  }
}
