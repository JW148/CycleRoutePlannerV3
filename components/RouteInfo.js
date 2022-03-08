import React, { useEffect, useRef, useMemo } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import { AntDesign } from "@expo/vector-icons";

export default function RouteInfo({
  route,
  color,
  setLocacationInputActive,
  setRouteInfoActive,
}) {
  // bottomShelf variables
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "60%"], []);

  const handlePress = () => {
    setLocacationInputActive(true);
    setRouteInfoActive(false);
  };

  return (
    <>
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        backgroundStyle={styles.backgroundCol}
      >
        <View style={styles.container}>
          <Text style={styles.smallText}>Elevation Graph</Text>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: { stroke: color },
                parent: { border: "1px solid #ccc" },
              }}
              data={route.elevDist}
            />
          </VictoryChart>
          <Text style={styles.smallText}>
            {"Time: " + secondsToHms(route.time)}
          </Text>
          <Text style={styles.smallText}>
            {"Distance: " + Math.round(route.distance / 100) / 10 + " km"}
          </Text>
        </View>
        <View style={styles.backBtnParent}>
          <TouchableOpacity onPress={handlePress}>
            <AntDesign name="leftcircleo" size={28} color="#e1e1e1" />
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
}

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);

  var hDisplay = h > 0 ? h + " hr " : "";
  var mDisplay = m > 0 ? m + " min" : "";
  return hDisplay + mDisplay;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    paddingTop: 0,
  },
  smallText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#b1b1b1",
    marginTop: 5,
  },
  backgroundCol: {
    backgroundColor: "#222222",
    // backgroundColor: "rgba(34, 34, 34, 0.9)",
  },
  backBtnParent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 20,
  },
});
