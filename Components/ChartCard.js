import React from "react";
import { View } from "react-native";
import {
	VictoryChart,
	VictoryLine,
	VictoryLabel,
	VictoryAxis,
} from "victory-native";

const ChartCard = ({ title, runData }) => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
			}}
		>
			<VictoryChart height={180} width={350}>
				<VictoryLabel text={title} x={160} y={30} textAnchor="middle" />
				<VictoryLine
					style={{
						data: { stroke: "tomato" },
						parent: { border: "1px solid #ccc" },
					}}
					interpolation="basis"
					animate={{
						duration: 2000,
						onLoad: { duration: 1000 },
					}}
					data={runData}
				/>
				<VictoryAxis dependentAxis style={{ tickLabels: { fill: "none" } }} />
				<VictoryAxis style={{ tickLabels: { fill: "none" } }} />
			</VictoryChart>
		</View>
	);
};

export default ChartCard;
