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
		console.log(this.props);
		return (
			<div
				className={"diamond-node"}
				style={{
					position: "relative",
					width: 100,
					height: 100
				}}
			>
				<svg
					width={100}
					height={100}
					dangerouslySetInnerHTML={{
						__html:
							`
          <g id="Layer_1">
          </g>
          <g id="Layer_2">
            <polygon fill="purple" stroke="#000000" stroke-width="3" stroke-miterlimit="10" points="10,` +
							100 / 2 +
							` ` +
							100 / 2 +
							`,10 ` +
							(100 - 10) +
							`,` +
							100 / 2 +
							` ` +
							100 / 2 +
							`,` +
							(100 - 10) +
							` "/>
          </g>
        `
					}}
				/>
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
				<div
					style={{
						position: "absolute",
						zIndex: 10,
						left: 100 / 2 - 8,
						top: 100 - 8
					}}
				>
					<PortWidget name="bottom" node={this.props.node} />
				</div>
			</div>
		);
	}
}