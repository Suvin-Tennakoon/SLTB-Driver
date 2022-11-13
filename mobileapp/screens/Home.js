import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, ScrollView, Text } from "react-native";
import { Block, theme } from "galio-framework";
import axios from "axios";
import { Card, Button } from "../components";
import { nowTheme, tabs } from "../constants";
import Tabs from "../components/Tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_DOMAIN } from "../constants/config";

const { width } = Dimensions.get("screen");

function Home() {
  const [timetable, setTimetable] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    axios
      .get(BACKEND_DOMAIN+":3001/api/gettimetable/Sahan")
      .then((res) => {
        setTimetable(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          {timetable?.map((tt, i) => {
            if (tt?.Busdata[0].Date === date) {
              return <Card key={i} item={tt} titleStyle={styles.productTitle} />;
            }
          })}
        </Block>
      </ScrollView>
    );
  };

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();

  return (
    <Block flex center style={styles.home}>
      <Tabs
        data={tabs.days}
        initialIndex={weekday[d.getDay()]}
        onChange={(id) => setDate(id)}
      />
      {renderArticles()}
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: "montserrat-regular",
  },
  productTitle: {
    color: nowTheme.COLORS.WHITE,
    textAlign: "center",
    fontFamily: "montserrat-bold",
    fontSize: 18,
  },
});

export default Home;
