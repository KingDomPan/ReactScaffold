"use strict";

var React = require('react');

var App = React.createClass({

  render: function () {
    return (
      <div title='My App'>
        {this.props.children}
      </div>
    );
  }

});

export default App;
