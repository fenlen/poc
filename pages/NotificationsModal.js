import React, { useState, Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Right,
  Body,
  Left,
  Picker,
  ListItem,
  Separator,
  Switch
} from "native-base";
import Global from "../state/global.js";
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


class NotificationsModal extends Component {

   onValueChange1(value){
      Global.enableNotification1=value;
      firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .update({enableNotification1: value});
      this.forceUpdate();
    }
   onValueChange2(value){
      Global.enableNotification2=value;
      firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .update({enableNotification2: value});
      this.forceUpdate();
    }
   onValueChange3(value){
      Global.enableNotification3=value;
      firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .update({enableNotification3: value});
      this.forceUpdate();
    }
   onValueChange4(value){
      Global.enableNotification4=value;
      firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .update({enableNotification4: value});
      this.forceUpdate();
    }

   render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Notifications</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <ListItem>
              <Body>
                  <Text>Notify items about to expire from my fridge</Text>
              </Body>
              <Right>
                   <Switch value={Global.enableNotification1} trackColor="#50B948" onValueChange={this.onValueChange1.bind(this)}/>
              </Right>
          </ListItem>
          <ListItem>
              <Body>
                  <Text>Notify expired from my fridge</Text>
              </Body>
              <Right>
                   <Switch value={Global.enableNotification2} trackColor="#50B948" onValueChange={this.onValueChange2.bind(this)}/>
              </Right>
          </ListItem>
          <ListItem>
              <Body>
                  <Text>Notify items about to expire from group fridge</Text>
              </Body>
              <Right>
                   <Switch value={Global.enableNotification3} trackColor="#50B948" onValueChange={this.onValueChange3.bind(this)}/>
              </Right>
          </ListItem>
          <ListItem>
              <Body>
                  <Text>Notify expored items from group fridge</Text>
              </Body>
              <Right>
                   <Switch value={Global.enableNotification4} trackColor="#50B948" onValueChange={this.onValueChange4.bind(this)}/>
              </Right>
          </ListItem>
        </Content>
      </Container>
    );}
};

export default NotificationsModal;
