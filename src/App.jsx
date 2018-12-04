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

import { DiamondNodeModel } from "./Components/Diamond/DiamondNodeModel.jsx";
import { DiamondNodeFactory } from "./Components/Diamond/DiamondNodeFactory.jsx";
import { SimplePortFactory } from "./Components/Diamond/SimplePortFactory.jsx";
import { DiamondPortModel } from "./Components/Diamond/DiamondPortModel.jsx";

class App extends Component {
  componentWillMount() {
    this.engine = new DiagramEngine();
    this.engine.registerNodeFactory(new DefaultNodeFactory());
    this.engine.registerLinkFactory(new DefaultLinkFactory());
    this.engine.registerPortFactory(new SimplePortFactory("diamond", config => new DiamondPortModel()));
    this.engine.registerNodeFactory(new DiamondNodeFactory());

    const model = new DiagramModel();

    model.setGridSize(20);

    this.engine.setDiagramModel(model);
  }

  handleOnDrop = (event) => {
    var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
    var node = null;
    if (data.type === 'Workflow') {
      node = new DefaultNodeModel(data.type, 'lightcoral');
      node.addPort(new DefaultPortModel(true, 'in-1', 'workflow'));
    } else if (data.type === 'Steps') {
      node = new DefaultNodeModel(data.type, 'lightcyan');
      node.addPort(new DefaultPortModel(false, 'out-1', 'steps'));
    } else if (data.type === 'Conditionals') {
      node = new DiamondNodeModel();
    }

    var points = this.engine.getRelativeMousePoint(event);
    points.x = Math.round(points.x / 20) * 20;
    points.y = Math.round(points.y / 20) * 20;
    node.setPosition(points.xy, points.y);
    // this.model.addAll(node);
    
    // const nodesCount = Lodash.keys(this.engine.getDiagramModel().getNodes()).length;
    // node.x = points.x;
    // node.y = points.y;
    // this.engine.getDiagramModel().addNode(node);
    this.forceUpdate();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ margin: '0 20px', width: '20%', padding: '0 20px', backgroundColor: 'lightblue', borderRadius: '10px' }} className="bucket-content">
          <BucketWidget>
            <BucketItemWidget model={{type: 'Workflow'}} name={'Workflow'} color={'lightcoral'} />
            <BucketItemWidget model={{type: 'Steps'}} name={'Steps'} color={'lightcyan'} />
            <BucketItemWidget model={{type: 'Conditionals'}} name={'Conditionals'} color={'lightpink'} />
          </BucketWidget>
        </div>
        <div
          className="diagram-layer"
          style={{ margin: '0 20px', width: '80%', backgroundColor: 'lightpink', borderRadius: '10px' }}
					onDrop={ event => this.handleOnDrop(event) }
					onDragOver={ event => {
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
