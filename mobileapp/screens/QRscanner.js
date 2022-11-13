import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { BACKEND_DOMAIN } from "../constants/config";

export default function QRscanner({ navigation }) {
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    axios
      .get(
        `${BACKEND_DOMAIN}:3001/api/getTravellerInfo/${data.split("\n")[0]}`
      )
      .then((res) => {
        if (res.data[0].mobile === data.split("\n")[1]) {
          navigation.navigate("TravelForm", {
            user: res.data[0].user,
            username: res.data[0].username,
            mobile: res.data[0].mobile,
            balance: res.data[0].balance,
          });
        } else {
          alert(`Invalid QR Code. Try again !`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!isFocused) {
    return <View></View>;
  } else {
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
