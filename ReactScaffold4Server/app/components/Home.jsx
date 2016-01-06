import React from 'react';
import $ from 'jquery';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.displayName = 'Home';
  }

  componentDidMount() {
    $('#app-loader').html('panqdpanqd12');
  }

  render() {
    return (
      <div>
        <h1>Hello World, KingDomPan12345</h1>
      </div>
    );
  }
}

export default Home;