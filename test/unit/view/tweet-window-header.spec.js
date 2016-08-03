import React from 'react';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import assert from 'power-assert';
import Header from '../../../src/renderer/src/components/tweet-window-header';

describe ('TweetWindowHeader test', () => {
  it ('should <Header /> rendered expected element', () => {
    const wrapper = shallow(<Header />);
    assert.equal(wrapper.childAt(0).text(), 'New Tweet');
    assert.equal(wrapper.childAt(0).childAt(0).type(), 'i');
    assert.equal(wrapper.childAt(1).type(), 'i');
  });

  it ('should `close` called when close button clicked', () => {
    const close = spy();
    const wrapper = shallow(<Header close={close} />);
    wrapper.childAt(1).simulate('click');
    assert.equal(close.callCount, 1);
  });
});
