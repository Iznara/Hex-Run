import React from "react";
import { Text, View } from "react-native";
import * as Progress from "react-native-progress";

const ProgressCard = ({ cardTask, text }) => {
	const fullText = text[0] + String(cardTask.goal) + text[1];
	return (
		<View style={{ padding: 15 }}>
			<Text>{`Level ${cardTask.level}  -  ${fullText}`}</Text>
			<View
				style={{
					padding: 10,
					alignItems: "center",
				}}
			>
				<Progress.Bar
					progress={cardTask.progress / cardTask.goal}
					width={300} color="tomato"
				/>
			</View>
		</View>
	);
};

export default ProgressCard;
