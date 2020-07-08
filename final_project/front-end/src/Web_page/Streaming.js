import React from 'react';
import Header from '../public_comp/Header'

const sections = [
  { title: 'Streaming', url: '/Streaming' },
  { title: 'Board', url: '/NoticeBoard' },
  { title: 'My Page', url: '/myPage' }
];

class Streaming extends React.Component {
  render() {
    return (
      <div> 
        <Header title = "SoonDoll" sections = {sections} />
        Streaming
      </div>
    );
  }``
}

export default Streaming;