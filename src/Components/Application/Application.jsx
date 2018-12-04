import * as SRD from "storm-react-diagrams";
import { DiamondPortModel } from "../Diamond/DiamondPortModel.jsx";
import { DiamondNodeFactory } from '../Diamond/DiamondNodeFactory.jsx';
import { SimplePortFactory } from './SimplePortFactory.jsx';

/**
 * @author Dylan Vorster
 */
export class Application {
	constructor() {
		this.diagramEngine = new SRD.DiagramEngine();
    this.diagramEngine.installDefaultFactories();
    this.diagramEngine.registerPortFactory(new SimplePortFactory('diamond', config => new DiamondPortModel()));
    this.diagramEngine.registerNodeFactory(new DiamondNodeFactory());
		this.newModel();
	}

	newModel() {
		this.activeModel = new SRD.DiagramModel();
		this.diagramEngine.setDiagramModel(this.activeModel);

		//3-A) create a default node
		// var node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
		// let port = node1.addOutPort("Out");
		// node1.setPosition(100, 100);

		// //3-B) create another default node
		// var node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)");
		// let port2 = node2.addInPort("In");
		// node2.setPosition(400, 100);

		// // link the ports
		// let link1 = port.link(port2);

		// this.activeModel.addAll(node1, node2, link1);
	}

	getActiveDiagram(): SRD.DiagramModel {
		return this.activeModel;
	}

	getDiagramEngine(): SRD.DiagramEngine {
		return this.diagramEngine;
	}
}