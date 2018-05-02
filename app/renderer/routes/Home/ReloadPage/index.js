import React, { Component } from 'react';
import qs from 'qs';

export default class ReloadPage extends Component {

  componentDidMount() {
    const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    setTimeout(() => {
      this.props.history.push(query.redirect + '?reload=1')
    }, 1000)
  }

  render() {
    return (
      <div style={{textAlign: 'center', padding: '20px'}}>
        <h4>Reloading...</h4>
      </div>
    );
  }
}
