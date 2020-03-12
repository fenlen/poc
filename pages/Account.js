import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from 'react-navigation-hooks';
import {Alert} from 'react-native';
import Style from '../components/Style';
import prompt from 'react-native-prompt-android';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  ListItem,
  Separator,
} from 'native-base';

const Statistics = props => {
  const [state, setState] = useState();
  const user = firebase.auth().currentUser;
  useEffect(() => {
    if (auth().currentUser !== null) {
      setState(true);
    }
  }, []);
  useFocusEffect(
    //executes on component focus
    useCallback(() => {
      let loggedIn;
      if (auth().currentUser !== null) {
        loggedIn = true;
      } else {
        loggedIn = false;
      }
      // console.log(loggedIn, auth().currentUser);
      return () => setState(loggedIn);
    }, []),
  );
  const JoinPrompt = () => {
    prompt(
      'Join a group',
      'Please enter the group identification code (you can get this from any member of the group).',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: password => console.log('Entered ' + password),
        },
      ],
      {
        type: 'numeric',
        cancelable: false,
        defaultValue: null,
        placeholder: 'XXXXXX',
      },
    );
  };

  const CreateAlert = () => {
    Alert.alert(
      'Create a group',
      'Are you sure you want to create a new group? Doing so will automatically remove you from your current group and add you to the newly created one.',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => console.log('Yes Pressed')},
      ],
      {cancelable: false},
    );
  };

  const LeaveAlert = () => {
    Alert.alert(
      'Leave a group',
      'Are you sure you want to leave the group? Once you leave you can rejoin at any time.',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => console.log('Yes Pressed')},
      ],
      {cancelable: false},
    );
  };

  const logOut = async () => {
    await auth().signOut();
    Alert.alert('Logging out', "You've logged out successfuly");
    setState(false);
  };

  return (
    <Container style={Style.container}>
      <Header searchBar>
        <Left style={{flex: 0, width: 50}}>
          <Button transparent onPress={() => props.navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Your account</Title>
        </Body>
      </Header>
      <Content>
        <Separator bordered>
          <Text>Account Details</Text>
        </Separator>
        <ListItem>
          <Left>
            <Text>Email</Text>
          </Left>
          <Body>
            <Text>{user.email}</Text>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Date joined</Text>
          </Left>
          <Body>
            <Text>date goes here</Text>
          </Body>
        </ListItem>
        <Separator bordered>
          <Text>Preferences</Text>
        </Separator>
        <ListItem onPress={() => props.navigation.navigate('AppearanceModal')}>
          <Left>
            <Text>Appearance settings</Text>
          </Left>
        </ListItem>
        <ListItem
          onPress={() => props.navigation.navigate('NotificationsModal')}>
          <Left>
            <Text>Notification settings</Text>
          </Left>
        </ListItem>
        <ListItem onPress={() => props.navigation.navigate('GroupModal')}>
          <Left>
            <Text>Group settings</Text>
          </Left>
        </ListItem>
        {!state && (
          <Button
            primary
            rounded
            style={{margin: 20, justifyContent: 'center'}}
            onPress={() => props.navigation.navigate('RegisterModal')}>
            <Text uppercase={false}>Register</Text>
          </Button>
        )}
        {!state && (
          <Button
            primary
            rounded
            style={{margin: 20, justifyContent: 'center'}}
            onPress={() => props.navigation.navigate('LoginModal')}>
            <Text uppercase={false}>Log in</Text>
          </Button>
        )}
        {state && (
          <Button
            primary
            rounded
            style={{margin: 20, justifyContent: 'center'}}
            onPress={() => logOut()}>
            <Text uppercase={false}>Log out</Text>
          </Button>
        )}
      </Content>
    </Container>
  );
};

export default Statistics;
