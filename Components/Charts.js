import React, { useState } from "react";
import { View } from "react-native";
import { ButtonGroup } from "react-native-elements";
import ChartCard from "./ChartCard";

const Charts = () => {
	const data = [
		{
			distance: [
				{ x: "1", y: 2 },
				{ x: "2", y: 3 },
				{ x: "3", y: 5 },
			],
			time: [
				{ x: "1", y: 3 },
				{ x: "2", y: 7 },
				{ x: "3", y: 6 },
			],
			speed: [
				{ x: "1", y: 2 },
				{ x: "2", y: 5 },
				{ x: "3", y: 4 },
			],
		},
		{
			distance: [
				{ x: "1", y: 2 },
				{ x: "2", y: 3 },
				{ x: "3", y: 5 },
				{ x: "4", y: 4 },
				{ x: "5", y: 7 },
				{ x: "6", y: 5 },
				{ x: "7", y: 6 },
				{ x: "8", y: 3 },
				{ x: "9", y: 6 },
				{ x: "10", y: 2 },
			],
			time: [
				{ x: "1", y: 3 },
				{ x: "2", y: 7 },
				{ x: "3", y: 6 },
				{ x: "4", y: 7 },
				{ x: "5", y: 4 },
				{ x: "6", y: 6 },
				{ x: "7", y: 8 },
				{ x: "8", y: 5 },
				{ x: "9", y: 3 },
				{ x: "10", y: 4 },
			],
			speed: [
				{ x: "1", y: 2 },
				{ x: "2", y: 5 },
				{ x: "3", y: 4 },
				{ x: "4", y: 4 },
				{ x: "5", y: 5 },
				{ x: "6", y: 2 },
				{ x: "7", y: 5 },
				{ x: "8", y: 7 },
				{ x: "9", y: 6 },
				{ x: "10", y: 3 },
			],
		},
		{
			distance: [
				{ x: "1", y: 2 },
				{ x: "2", y: 3 },
				{ x: "3", y: 5 },
				{ x: "4", y: 4 },
				{ x: "5", y: 7 },
				{ x: "6", y: 5 },
				{ x: "7", y: 6 },
				{ x: "8", y: 3 },
				{ x: "9", y: 6 },
				{ x: "10", y: 2 },
				{ x: "11", y: 10 },
				{ x: "12", y: 7 },
				{ x: "13", y: 8 },
				{ x: "14", y: 6 },
				{ x: "15", y: 7 },
				{ x: "16", y: 8 },
				{ x: "17", y: 6 },
				{ x: "18", y: 8 },
				{ x: "19", y: 6 },
				{ x: "20", y: 4 },
				{ x: "21", y: 3 },
				{ x: "22", y: 2 },
				{ x: "23", y: 4 },
				{ x: "24", y: 6 },
				{ x: "25", y: 7 },
				{ x: "26", y: 5 },
				{ x: "27", y: 4 },
				{ x: "28", y: 7 },
				{ x: "29", y: 9 },
				{ x: "30", y: 5 },
			],
			time: [
				{ x: "1", y: 3 },
				{ x: "2", y: 7 },
				{ x: "3", y: 6 },
				{ x: "4", y: 7 },
				{ x: "5", y: 4 },
				{ x: "6", y: 6 },
				{ x: "7", y: 8 },
				{ x: "8", y: 5 },
				{ x: "9", y: 3 },
				{ x: "10", y: 4 },
				{ x: "11", y: 7 },
				{ x: "12", y: 7 },
				{ x: "13", y: 5 },
				{ x: "14", y: 6 },
				{ x: "15", y: 3 },
				{ x: "16", y: 2 },
				{ x: "17", y: 4 },
				{ x: "18", y: 5 },
				{ x: "19", y: 7 },
				{ x: "20", y: 6 },
				{ x: "21", y: 8 },
				{ x: "22", y: 9 },
				{ x: "23", y: 6 },
				{ x: "24", y: 5 },
				{ x: "25", y: 4 },
				{ x: "26", y: 6 },
				{ x: "27", y: 8 },
				{ x: "28", y: 6 },
				{ x: "29", y: 4 },
				{ x: "30", y: 2 },
			],
			speed: [
				{ x: "1", y: 2 },
				{ x: "2", y: 5 },
				{ x: "3", y: 4 },
				{ x: "4", y: 4 },
				{ x: "5", y: 5 },
				{ x: "6", y: 2 },
				{ x: "7", y: 5 },
				{ x: "8", y: 7 },
				{ x: "9", y: 6 },
				{ x: "10", y: 3 },
				{ x: "11", y: 4 },
				{ x: "12", y: 6 },
				{ x: "13", y: 7 },
				{ x: "14", y: 5 },
				{ x: "15", y: 4 },
				{ x: "16", y: 8 },
				{ x: "17", y: 7 },
				{ x: "18", y: 9 },
				{ x: "19", y: 5 },
				{ x: "20", y: 4 },
				{ x: "21", y: 1 },
				{ x: "22", y: 3 },
				{ x: "23", y: 6 },
				{ x: "24", y: 4 },
				{ x: "25", y: 6 },
				{ x: "26", y: 8 },
				{ x: "27", y: 7 },
				{ x: "28", y: 5 },
				{ x: "29", y: 6 },
				{ x: "30", y: 7 },
			],
		},
	];
	const [runData, setRunData] = useState(data[0]);
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<View
			style={{
				flex: 1,
				flexDirection: "column",
			}}
		>
			<View
				style={{
					flex: 1,
					flexDirection: "column",
					padding: 10,
				}}
			>
				<ChartCard title={"Distance"} runData={runData.distance} />
				<ChartCard title={"Time"} runData={runData.time} />
				<ChartCard title={"Speed"} runData={runData.speed} />
			</View>
			<ButtonGroup
				buttons={["WEEK", "MONTH", "YEAR"]}
				selectedIndex={selectedIndex}
				onPress={(value) => {
					setSelectedIndex(value);
					setRunData(data[value]);
				}}
				containerStyle={{ marginBottom: 20 }}
			></ButtonGroup>
		</View>
	);
};

export default Charts;
