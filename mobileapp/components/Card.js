import React from "react";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { nowTheme } from "../constants";

class Card extends React.Component {
  render() {
    const { horizontal, style, titleStyle, item } =
      this.props;

    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={[{ fontFamily: "montserrat-regular", color:nowTheme.COLORS.WHITE }, titleStyles]}
                size={14}
              >
                {item?.Busdata[0].route}
              </Text>

              <Block flex center>
                <Text
                  style={{
                    fontFamily: "montserrat-regular",
                    textAlign: "center",
                    padding: 1,
                    fontWeight:"bold"
                  }}
                  size={15}
                  color={nowTheme.COLORS.YELLOW}
                >
                  BUS NUMBER : {item?.Busdata[0].BusNo}
                </Text>
              </Block>

              <View style={{flexDirection:"row"}}>
                <Block flex left>
                  <Text
                    style={{ fontFamily: "montserrat-regular" }}
                    size={12}
                    color={nowTheme.COLORS.WHITE}
                  >
                    START TIME : {item?.Busdata[0].Arrivaltime}
                  </Text>
                </Block>

                <Block flex right>
                  <Text
                    style={{ fontFamily: "montserrat-regular" }}
                    size={12}
                    color={nowTheme.COLORS.WHITE}
                  >
                    END TIME : {item?.Busdata[0].Destinationtime}
                  </Text>
                </Block>
              </View>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: nowTheme.COLORS.SECONDARY,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  shadow: {
    shadowColor: "#8898AA",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 5,
  },

});

export default withNavigation(Card);
