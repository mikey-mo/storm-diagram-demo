import React, {Component} from 'react';
import Lodash from 'lodash';
import {
  DiagramWidget,
  DiagramEngine,
	DefaultNodeFactory,
	DefaultLinkFactory,
	DefaultNodeModel,
	DefaultPortModel,
  DiagramModel
} from 'storm-react-diagrams';

import './App.scss';

import BucketWidget from './Components/Bucket/BucketWidget';
import BucketItemWidget from './Components/Bucket/BucketItemWidget';
import BlockNodeFactory from './Components/Block/BlockNodeFactory';

class App extends Component {
  componentWillMount() {
    this.engine = new DiagramEngine();
    this.engine.registerNodeFactory(new DefaultNodeFactory());
    this.engine.registerLinkFactory(new DefaultLinkFactory());

    const model = new DiagramModel();

    model.setGridSize(20);

    this.engine.setDiagramModel(model);
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ margin: '0 20px', width: '20%', padding: '0 20px', backgroundColor: 'lightblue', borderRadius: '10px' }} className="bucket-content">
          <BucketWidget>
            <BucketItemWidget model={{type: 'Workflow'}} name={'Workflow'} color={'lightcoral'} />
            <BucketItemWidget model={{type: 'Steps'}} name={'Steps'} color={'lightcyan'} />
          </BucketWidget>
        </div>
        <div
          className="diagram-layer"
          style={{ margin: '0 20px', width: '80%', backgroundColor: 'lightpink', borderRadius: '10px' }}
					onDrop={event => {
            console.log(this.engine.getDiagramModel());
						var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
						var nodesCount = Lodash.keys(this.engine.getDiagramModel().getNodes()).length;
            var node = null;
						if (data.type === 'Workflow') {
							node = new DefaultNodeModel(data.type, 'lightcoral');
							node.addPort(new DefaultPortModel(true, 'in-1', 'tim'));
						} else if (data.type === 'Steps') {
							node = new DefaultNodeModel(data.type, 'lightcyan');
              node.addPort(new DefaultPortModel(false, 'out-1', 'name'));
						}
						var points = this.engine.getRelativeMousePoint(event);
						node.x = points.x;
						node.y = points.y;
						this.engine.getDiagramModel().addNode(node);
						this.forceUpdate();
					}}
					onDragOver={event => {
						event.preventDefault();
					}}
				>
				  <DiagramWidget diagramEngine={this.engine} />
        </div>
      </div>
    );
  }
}
export default App;
