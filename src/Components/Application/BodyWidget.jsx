import * as React from "react";
import * as _ from "lodash";
import TrayWidget from "./../Bucket/BucketWidget";
import { Application } from "./Application.jsx";
import TrayItemWidget from "./../Bucket/BucketItemWidget";
import { DiamondNodeModel } from './../Diamond/DiamondNodeModel.jsx';
import { DefaultNodeModel, DiagramWidget } from "storm-react-diagrams";

export interface BodyWidgetProps {
	app: Application;
}

export interface BodyWidgetState {}

export class BodyWidget extends React.Component<BodyWidgetProps, BodyWidgetState> {
	constructor(props: BodyWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="body">
				<div style={{ display: 'flex', flexDirection: 'row' }} className="content">
					<TrayWidget>
						<TrayItemWidget model={{ type: "in" }} name="In Node" color="rgb(192,255,0)" />
						<TrayItemWidget model={{ type: "out" }} name="Out Node" color="rgb(0,192,255)" />
            <TrayItemWidget model={{ type: "conditions" }} name="Out Node" color="rgb(0,192,255)" />
					</TrayWidget>
					<div
            style={{ backgroundColor: 'grey', width: '100%' }}
						className="diagram-layer"
						onDrop={event => {
							var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
							var nodesCount = _.keys(
								this.props.app
									.getDiagramEngine()
									.getDiagramModel()
									.getNodes()
              ).length;
              
              var points = this.props.app.getDiagramEngine().getRelativeMousePoint(event);

							var node = null;
							if (data.type === "in") {
								node = new DefaultNodeModel("Node " + (nodesCount + 1), "rgb(192,255,0)");
								node.addInPort("In");
							} else if (data.type === 'out') {
								node = new DefaultNodeModel("Node " + (nodesCount + 1), "rgb(0,192,255)");
								node.addOutPort("Out");
							} else if (data.type === 'conditions') {
                node = new DiamondNodeModel();
                node.setPosition(100, 150);
              }
							node.x = points.x;
							node.y = points.y;
							this.props.app
								.getDiagramEngine()
								.getDiagramModel()
								.addNode(node);
							this.forceUpdate();
						}}
						onDragOver={event => {
							event.preventDefault();
						}}
					>
						<DiagramWidget className="srd-demo-canvas" diagramEngine={this.props.app.getDiagramEngine()} />
					</div>
				</div>
			</div>
		);
	}
}