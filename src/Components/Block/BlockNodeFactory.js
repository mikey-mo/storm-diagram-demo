import { DefaultNodeModel, DefaultNodeWidget, DiagramEngine, AbstractNodeFactory } from "storm-react-diagrams";
import * as React from "react";
/**
 * @author Dylan Vorster
 */
class BlockNodeFactory extends AbstractNodeFactory<DefaultNodeModel> {
	constructor() {
		super("default");
	}

	generateReactWidget(diagramEngine: DiagramEngine, node: DefaultNodeModel): JSX.Element {
		return React.createElement(DefaultNodeWidget, {
			node: node,
			diagramEngine: diagramEngine
		});
	}

	getNewInstance(initialConfig?: any): DefaultNodeModel {
		return new DefaultNodeModel();
	}
}

export default BlockNodeFactory;
