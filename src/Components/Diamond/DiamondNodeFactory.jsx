import { AbstractNodeFactory, DiagramEngine, NodeModel} from "storm-react-diagrams";
import { DiamonNodeWidget } from "./DiamondNodeWidget.jsx";
import { DiamondNodeModel } from "./DiamondNodeModel.jsx";
import * as React from "react";

export class DiamondNodeFactory extends AbstractNodeFactory {
	constructor() {
		super("diamond");
	}

	generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
		return <DiamonNodeWidget node={node} />;
	}

	getNewInstance() {
		return new DiamondNodeModel();
	}
}