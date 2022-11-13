import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme, Toast } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

function Register({navigation}) {

  const [isShow, setShow] = useState(false);
  const [fname, setFname] = useState('');
  const [pw, setPw]= useState("");

  const cred = {
    fname: "Sahan",
    pw: "abc123"
  }

  const checkLogin = () => {
    if(fname === cred.fname && pw === cred.pw){
      navigation.navigate("App")
    }else {
      setShow(true)
    }
  }

    return (
      <DismissKeyboard>
        <Block flex middle>
        
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex={1} middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.2} middle>
                    <Block  middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Login
                      </Text>
                    </Block>
                    <Block style={{flex:1}} >
                    <Text color={isShow? "red":"white"} >Invalid login credentials. Enter again.</Text>
                    </Block>
                  </Block>
                  
                  <Block flex={0.5} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="First Name"
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="profile-circle"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            onChangeText={(text)=>setFname(text)}
                            />
                          </Block>
                          
                          <Block width={width * 0.8}>
                            <Input
                              password={true}
                              placeholder="Password"
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="lock-circle-open2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                              onChangeText={(text)=>setPw(text)}
                            />
                          </Block>
                          
                        </Block>
                        <Block center flex={0.2}>
                          <Button color="primary" round style={styles.createButton} onPress={checkLogin}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Login
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.5 : height * 0.4,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  createButton: {
    width: width * 0.5,
    marginBottom: 40
  }
});

export default Register;
