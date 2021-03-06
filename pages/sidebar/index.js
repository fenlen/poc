import React, {Component} from 'react';
import {Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Body,
} from 'native-base';
import styles from './style';
import Global from '../../state/global.js';

const datasreg = [
  {
    name: 'Personal organizer',
    route: 'Fridge',
    icon: 'person',
    prop: Global.user.fridge,
  },
  {
    name: 'Group organizer',
    route: 'GroupFridge',
    icon: 'people',
    prop: Global.user.groupFridge,
  },
  {
    name: 'Recipes',
    route: 'Recipes',
    icon: 'bookmarks',
    prop: null,
  },
  {
    name: 'Meals',
    route: 'Meals',
    icon: 'list',
    prop: null,
  },
  {
    name: 'Account',
    route: 'Account',
    icon: 'settings',
    prop: null,
  },
];

const datasunreg = [
  {
    name: 'Personal organizer',
    route: 'Fridge',
    icon: 'person',
    prop: Global.user.fridge,
  },
  {
    name: 'Log in/Register',
    route: 'Account',
    icon: 'settings',
    prop: null,
  },
];

var datas = [];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  componentDidMount() {
    datas = [];
    if (auth().currentUser != null) {
      datas = datasreg;
    } else {
      datas = datasunreg;
    }
  }

  redirect(destination, fridge) {
    Global.fridge = fridge;
    this.props.navigation.navigate(destination);
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{flex: 1, backgroundColor: '#fff', top: -1}}>
          <List
            dataArray={datas}
            renderRow={data => (
              <ListItem
                button
                noBorder
                onPress={() => {
                  if (data.prop != null) {
                    this.redirect(data.route, data.prop);
                  } else {
                    this.props.navigation.navigate(data.route);
                  }
                }}>
                <Left>
                  <Icon name={data.icon} />
                  <Text style={styles.text}>{data.name}</Text>
                </Left>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
