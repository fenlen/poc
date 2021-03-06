/**Account page. Contains some info about the user's account and links to the various Settings pages and also the Login/logout/register pages. */
import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from 'react-navigation-hooks';
import {Alert} from 'react-native';
import Style from '../components/Style';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Global from '../state/global';
import NotifService from '../services/NotifService';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  ListItem,
  Separator,
} from 'native-base';
import storage from '../services/storage';

const Account = props => {
  const [state, setState] = useState(); //Tracks if user is logged in with an account
  const [userData, setUserData] = useState({accountType: 'basic'});
  const user = firebase.auth().currentUser;
  const notif = new NotifService();

  const wrapper = () => {
    // wrapper needed to ensure retrieval from the database has been resolved before moving on
    storage.getUserData().then(result => {
      setUserData(result.data());
    });
  };
  useEffect(() => {
    if (auth().currentUser !== null) {
      setState(true);
      wrapper();
    }
  }, []);
  useFocusEffect(
    //executes on component focus
    useCallback(() => {
      wrapper();
      let loggedIn;
      if (auth().currentUser !== null) {
        loggedIn = true;
      } else {
        loggedIn = false;
      }
      return () => setState(loggedIn);
    }, []),
  );

  const DeleteAlert = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? All your items and recipes will be lost.',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => props.navigation.navigate('DeleteModal')},
      ],
      {cancelable: false},
    );
  };

  const logOut = async () => {
    setState(false);
    //Log out the user and reset all appearance preferences
    Global.colour = 'Blue';
    Global.font = 'Roboto';
    Global.size = 'Medium';
    props.navigation.navigate('App');
    await auth().signOut();
    Alert.alert('Logging out', "You've logged out successfuly");
    notif.cancelAll();
  };

  const formattedDate = dateString => {
    //Helper to format the date
    let date = new Date(parseInt(dateString));
    return (
      ('0' + date.getDate()).slice(-2) +
      '/' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      (date.getFullYear() - 2000)
    );
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
        {!state && ( //if not authenticated
          <>
            <Text style={{ padding: 10 }}>
              In order to gain access to the full features of the app, please
              log in or register for a subscription.
            </Text>
            <Button
              primary
              rounded
              style={{ margin: 20, justifyContent: 'center' }}
              onPress={() => props.navigation.navigate('RegisterModal')}>
              <Text uppercase={false}>Register</Text>
            </Button>
            <Button
              primary
              rounded
              style={{ margin: 20, marginTop: 0, justifyContent: 'center' }}
              onPress={() => props.navigation.navigate('LoginModal')}>
              <Text uppercase={false}>Log in</Text>
            </Button>
          </>
        )}
        {state && ( //if authenticated
          <>
            <Separator bordered>
              <Text>Account Details</Text>
            </Separator>
            <ListItem>
              <Left>
                <Text>Name</Text>
              </Left>
              <Body>
                <Text>{userData.name}</Text>
              </Body>
            </ListItem>
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
                <Text>{formattedDate(user.metadata.creationTime)}</Text>
              </Body>
            </ListItem>
            <Separator bordered>
              <Text>Preferences</Text>
            </Separator>
            <ListItem
              onPress={() => props.navigation.navigate('AppearanceModal')}>
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
            <Button
              primary
              rounded
              style={{margin: 20, justifyContent: 'center'}}
              onPress={() => props.navigation.navigate('Premium')}>
              <Text uppercase={false}>Update Payment Details</Text>
            </Button>
            <Button
              primary
              rounded
              style={{margin: 20, marginTop: 0, justifyContent: 'center'}}
              onPress={() =>
                props.navigation.navigate('UpdateDetailsModal', {
                  name: userData.name,
                  email: user.email,
                })
              }>
              <Text uppercase={false}>Update Personal Details</Text>
            </Button>
            <Button
              primary
              rounded
              style={{margin: 20, marginTop: 0, justifyContent: 'center'}}
              onPress={() => props.navigation.navigate('UpdatePasswordModal')}>
              <Text uppercase={false}>Update Password</Text>
            </Button>
            <Button
              primary
              rounded
              style={{margin: 20, marginTop: 0, justifyContent: 'center'}}
              onPress={() => logOut()}>
              <Text uppercase={false}>Log out</Text>
            </Button>
            <Button
              primary
              rounded
              style={{margin: 20, marginTop: 0, justifyContent: 'center'}}
              onPress={() => DeleteAlert()}>
              <Text uppercase={false}>Delete Account</Text>
            </Button>
          </>
        )}
        
      </Content>
    </Container>
  );
};

export default Account;
