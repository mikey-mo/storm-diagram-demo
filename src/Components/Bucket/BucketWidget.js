import React from 'react';

export default class BucketWidget extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1> { this.props.children } </h1>
      </div>
    )
  }
};
