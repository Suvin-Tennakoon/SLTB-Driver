import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Vibration,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Galio components
import { Block, Text, theme, Button } from "galio-framework";

// Now UI themed components
import { nowTheme } from "../constants";
import { Icon, Input, Switch } from "../components";
import axios from "axios";
import * as Location from "expo-location";
import busfairs from "../constants/busfairs";
import Confirm from "./Confirm";
import { BACKEND_DOMAIN } from "../constants/config";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

function TravelForm({ route, navigation }) {
  const [primaryFocus, setPrimaryFocus] = useState(true);

  const { user, username, mobile, balance } = route.params;

  const [startCode, setStartCode] = useState("");
  const [endCode, setEndCode] = useState("");
  const [noTickets, setNoTickets] = useState("1");
  const [charge, setCharge] = useState("");
  const [cursor, setCursor] = useState("startCode");

  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [displaycalc, setDisplaycalc] = useState(false);
  const [modelshow, setModelshow] = useState(false);

  const moveCursor = () => {
    Vibration.vibrate(100);

    switch (cursor) {
      case "startCode":
        setCursor("endCode");
        break;

      case "endCode":
        setCursor("noTickets");
        break;

      case "noTickets":
        setCursor("charge");
        setCharge(calculateFair());
        break;
    }
  };

  const calculateFair = () => {
    let dif = Math.abs(Number.parseInt(startCode) - Number.parseInt(endCode));
    return busfairs[dif] * noTickets;
  };

  const handleNumberBtn = (no) => {
    Vibration.vibrate(70);
    switch (cursor) {
      case "startCode":
        setStartCode(startCode.concat(no));
        break;

      case "endCode":
        setEndCode(endCode.concat(no));
        break;

      case "noTickets":
        setNoTickets(noTickets.toString().concat(no));
        break;

      default:
        break;
    }
  };

  const handleBackBtn = () => {
    Vibration.vibrate(100);

    switch (cursor) {
      case "startCode":
        setStartCode(startCode.slice(0, -1));
        break;

      case "endCode":
        setEndCode(endCode.slice(0, -1));
        break;

      case "noTickets":
        setNoTickets(noTickets.toString().slice(0, -1));
        break;

      default:
        break;
    }
  };

  const chargeFair = () => {

    axios
      .put(
        `${BACKEND_DOMAIN}:3001/api/deductFair/${username}/${balance - charge}`
      )
      .then((res) => {
        const data = {
          start: startLocation,
          end: endLocation,
          fair: charge,
        };
        axios
          .post(`${BACKEND_DOMAIN}:3001/api/addnewtrip/${username}`, data)
          .then((res) => {
            setModelshow(true);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setStartLocation("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      //get start location if available
      const value = await AsyncStorage.getItem(username);
      if (value !== null) setDisplaycalc(true);

      axios
        .get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&apiKey=0257610cafb146949977ad4410807c28`
        )
        .then(async (res) => {
          if (value === null) {
            const passengerData = {
              user,
              username,
              mobile,
              balance,
              startLocation: res.data.features[0].properties.formatted,
            };
            setStartLocation(res.data.features[0].properties.formatted);
            await AsyncStorage.setItem(username, JSON.stringify(passengerData));
          } else {
            setStartLocation(JSON.parse(value).startLocation);
            setEndLocation(res.data.features[0].properties.formatted);
            await AsyncStorage.removeItem(username);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  return (
    <Block flex center>
      <Confirm show={modelshow} navigation={navigation}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, width }}
      >
        <Block flex style={styles.group}>
          <Text size={16} style={styles.title}>
            Traveller Information
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              editable={false}
              value={`Passenger Name : ${JSON.stringify(user)}`}
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
              shadowless
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              value={`Mobile Number : ${JSON.stringify(mobile)}`}
              editable={false}
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
              shadowless
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              editable={false}
              value={`Account Balance : RS:${JSON.stringify(balance)}`}
              shadowless
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              editable={false}
              value={`Journey Started : ${startLocation}`}
              shadowless
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              editable={false}
              value={`Journey Ended : ${endLocation}`}
              shadowless
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
            />
          </Block>

          {displaycalc ? (
            <View>
              <Text size={16} style={[styles.title, { marginTop: 50 }]}>
                Fair Calculation
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  marginLeft: theme.SIZES.BASE,
                  marginRight: theme.SIZES.BASE,
                }}
              >
                <View style={{}}>
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.SECONDARY}
                      onPress={() => handleNumberBtn("1")}
                    >
                      1
                    </Button>
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.SECONDARY}
                      onPress={() => handleNumberBtn("2")}
                    >
                      2
                    </Button>
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.SECONDARY}
                      onPress={() => handleNumberBtn("3")}
                    >
                      3
                    </Button>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.SECONDARY}
                      onPress={() => handleNumberBtn("4")}
                    >
                      4
                    </Button>
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.SECONDARY}
                      onPress={() => handleNumberBtn("5")}
                    >
                      5
                    </Button>
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.SECONDARY}
                      onPress={() => handleNumberBtn("6")}
                    >
                      6
                    </Button>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.SECONDARY}
                      onPress={() => handleNumberBtn("7")}
                    >
                      7
                    </Button>
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.SECONDARY}
                      onPress={() => handleNumberBtn("8")}
                    >
                      8
                    </Button>
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.SECONDARY}
                      onPress={() => handleNumberBtn("9")}
                    >
                      9
                    </Button>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.SECONDARY}
                      onPress={handleBackBtn}
                    >
                      {"<-"}
                    </Button>
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.SECONDARY}
                      onPress={() => handleNumberBtn("0")}
                    >
                      0
                    </Button>
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.SECONDARY}
                      onPress={moveCursor}
                    >
                      Enter
                    </Button>
                  </View>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Button
                      style={{ width: theme.SIZES.BASE * 7 }}
                      color="transparent"
                      onPress={() => {
                        setStartCode("");
                        setEndCode("");
                        setNoTickets(1);
                        setCharge("");
                        setCursor("startCode");
                      }}
                    >
                      <Text color="black" style={{ fontWeight: "bold" }}>
                        Clear
                      </Text>
                    </Button>
                  </View>
                </View>

                <View style={{ borderWidth: 1, marginLeft: 7 }}></View>

                <View style={{ marginLeft: theme.SIZES.BASE }}>
                  <Text
                    size={17}
                    style={styles.textst}
                    color={
                      cursor === "startCode" ? nowTheme.COLORS.SUCCESS : null
                    }
                  >
                    Start Code : {startCode}
                  </Text>
                  <Text
                    size={17}
                    style={styles.textst}
                    color={
                      cursor === "endCode" ? nowTheme.COLORS.SUCCESS : null
                    }
                  >
                    End Code : {endCode}
                  </Text>
                  <Text
                    size={17}
                    style={styles.textst}
                    color={
                      cursor === "noTickets" ? nowTheme.COLORS.SUCCESS : null
                    }
                  >
                    No. of Tickets : {noTickets}
                  </Text>
                  <Text size={17} color="red" style={[styles.textst]}>
                    CHARGE : RS: {charge}.00
                  </Text>
                  <Button color={nowTheme.COLORS.PRIMARY} onPress={chargeFair}>
                    Deduct
                  </Button>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{ alignItems: "center", marginTop: theme.SIZES.BASE * 5 }}
            >
              <Button
                color={nowTheme.COLORS.PRIMARY}
                onPress={() => navigation.navigate("Components")}
              >
                Scan Again
              </Button>
            </View>
          )}
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "montserrat-bold",
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 20,
    color: nowTheme.COLORS.HEADER,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
  },
  button: {
    width: theme.SIZES.BASE * 3,
    margin: 4,
  },
  textst: {
    fontWeight: "bold",
    marginTop: theme.SIZES.BASE * 2,
  },
});

export default TravelForm;
