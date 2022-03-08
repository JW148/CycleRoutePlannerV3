//React imports
import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

//module imports
import MapView, { Marker, UrlTile, Polyline } from "react-native-maps";
import AnimatedPolyline from "react-native-maps-animated-polyline";

//local imports
import LocationInput from "./components/LocationInput";
import RouteInfo from "./components/RouteInfo";
import { set } from "react-native-reanimated";
import Button from "./components/Button";

export default function App() {
  // map variables
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 55.9533456,
    longitude: -3.1883749,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [fromLocation, setFromLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: "Enter start location above",
    set: false,
  });
  const [toLocation, setToLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: "Enter destination above",
    set: false,
  });

  //route vars
  const [routes, setRoutes] = useState(null);
  const [profile, setProfile] = useState(1);

  //var for when the routes are loading
  const [loading, setLoading] = useState(false);

  //colours for the poly line component
  const polylineColours = ["#c6282b", "#00b97b", "#303f9f"];

  //var that stores the current active component to display (locationInput, routeInfo, nav)
  const [locationInputActive, setLocacationInputActive] = useState(true);
  const [routeInfoActive, setRouteInfoActive] = useState(false);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={region}
        style={styles.container}
        onRegionChangeComplete={(region) => setRegion(region)}
        userInterfaceStyle={"dark"}
      >
        <Marker
          coordinate={{
            latitude: fromLocation.latitude,
            longitude: fromLocation.longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: toLocation.latitude,
            longitude: toLocation.longitude,
          }}
        />
        {routes && (
          <AnimatedPolyline
            coordinates={routes[profile].coords}
            strokeColor={polylineColours[profile]}
            strokeWidth={3}
            interval={20}
          />
        )}
      </MapView>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="small" />
        </View>
      )}
      {locationInputActive && (
        <LocationInput
          fromLocation={fromLocation}
          toLocation={toLocation}
          setFromLocation={setFromLocation}
          setToLocation={setToLocation}
          mapRef={mapRef}
          setRoutes={setRoutes}
          profile={profile}
          setProfile={setProfile}
          setLoading={setLoading}
          setLocacationInputActive={setLocacationInputActive}
          setRouteInfoActive={setRouteInfoActive}
        />
      )}
      {routeInfoActive && (
        <RouteInfo
          route={routes[profile]}
          color={polylineColours[profile]}
          setLocacationInputActive={setLocacationInputActive}
          setRouteInfoActive={setRouteInfoActive}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    top: "45%",
    left: "47%",
  },
  locationSearch: {
    flex: 1,
    position: "absolute",
  },
});
