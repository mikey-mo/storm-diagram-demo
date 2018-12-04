import * as React from "react";
import { DiamondNodeModel } from "./DiamondNodeModel.jsx";
import { PortWidget } from "storm-react-diagrams";

export interface DiamonNodeWidgetProps {
	node: DiamondNodeModel;
	size?: number;
}

export interface DiamonNodeWidgetState {}

export class DiamonNodeWidget extends React.Component<DiamonNodeWidgetProps, DiamonNodeWidgetState> {

	constructor(props: DiamonNodeWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div
				className={"diamond-node"}
				style={{
					position: "relative",
					width: 100,
					height: 100
				}}
			>
			<div style={{ height: '100px', width: '100px', backgroundColor: 'lightblue' }}>
			</div>
				<div
					style={{
						position: "absolute",
						zIndex: 10,
						top: 100 / 2 - 8,
						left: -8
					}}
				>
					<PortWidget name="left" node={this.props.node} />
				</div>
				<div
					style={{
						position: "absolute",
						zIndex: 10,
						left: 100 / 2 - 8,
						top: -8
					}}
				>
					<PortWidget name="top" node={this.props.node} />
				</div>
				<div
					style={{
						position: "absolute",
						zIndex: 10,
						left: 100 - 8,
						top: 100 / 2 - 8
					}}
				>
					<PortWidget name="right" node={this.props.node} />
				</div>
				{/* <div
					style={{
						position: "absolute",
						zIndex: 10,
						left: 100 / 2 - 8,
						top: 100 - 8
					}}
				>
					<PortWidget name="bottom" node={this.props.node} />
				</div> */}
			</div>
		);
	}
}