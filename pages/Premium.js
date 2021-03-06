/** Allows the user to change their payment details */
import React from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {CreditCardInput} from 'react-native-credit-card-input';

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
} from 'native-base';
const Premium = props => {
  const creditCardHandler = () => {}; //handler for when the form with the credit card details changes
  const updateCard = () => {
    props.navigation.goBack();
  };
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Premium</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{paddingTop: 20}}>
        <CreditCardInput
          requiresName={true}
          onChange={() => creditCardHandler()}
        />
        <Button
          rounded
          style={{margin: 15, marginTop: 50, justifyContent: 'center'}}
          onPress={() => updateCard()}>
          <Text uppercase={false}>Update</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Premium;
