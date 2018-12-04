import React from 'react';

export default class BucketItemWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div style={{ background: this.props.color, cursor: 'pointer', margin: '5px', paddingLeft: '15px', borderRadius: '10px', fontSize: '25px' }}
        onDragStart={event => {
          event.dataTransfer.setData('storm-diagram-node', JSON.stringify(this.props.model));
        }}
        draggable={true}
      >
        { this.props.name }
      </div>
    )
  }
};
