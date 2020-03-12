import AsyncStorage from '@react-native-community/async-storage';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Global from '../state/global';

const fridge = async group => {
  let fridgeRef;
  const userId = firebase.auth().currentUser.uid;

  if (group) {
    const getCode = async () => {
      await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .get()
        .then(snapshot => (fridgeRef = snapshot.get('groupFridge')));
    };
    await getCode();
  } else {
    fridgeRef = userId;
  }
  console.log(fridgeRef, group);

  return fridgeRef;
};
const getAll = async (search = null, group = false) => {
  // let keys = [];
  let keys;
  if (search == '')
    search = null;
  try {
    // keys = await AsyncStorage.getAllKeys();
    keys = await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .collection('itemList')
      .orderBy('name')
      .startAt(search)
      .endAt(search+"\uf8ff")
      .get();
  } catch (e) {
    console.log('error: retrieving all keys failed');
    throw e;
  }
  // console.log(fridge(false));
  // console.log(fridge(false) === 'zyLqoEyoiyVAsptgCQbR2RBhKXf2');
  // const promisedItems = keys.map(async itemId => {
  //   const itemPromise = await get(itemId);
  //   return itemPromise;
  // });
  // const results = await Promise.all(promisedItems);
  // const results = keys.docs();
  const results = keys.docs.map(item => item.data());
  // console.log('HI \n\n\n\n' + results);

  // results = results.map(item => item.data());
  return results.filter(item => item.isShop !== true);
};

const getAllShop = async (search = null, group = false) => {
  let keys;
  if (search == '')
    search = null;
  try {
    // keys = await AsyncStorage.getAllKeys();
    keys = await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .collection('shopList')
      .orderBy('name')
      .startAt(search)
      .endAt(search+"\uf8ff")
      .get();
  } catch (e) {
    console.log('error: retrieving all keys failed');
    throw e;
  }

  // const promisedItems = keys.map(async itemId => {
  //   const itemPromise = await get(itemId);
  //   return itemPromise;
  // });
  // const results = await Promise.all(promisedItems);
  return keys.docs.map(item => item.data());
};

const get = async (key, targetList, group = false) => {
  let item;
  try {
    // item = await AsyncStorage.getItem(key);
    item = await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .collection(targetList)
      .doc(key);
  } catch (e) {
    console.log('error: fetching item failed');
    throw e;
  }
  // console.log(typeof item, ' Hi');
  return JSON.parse(item);
};

const submit = async (
  name,
  category,
  expDate,
  barcode,
  quantity,
  unit,
  isShop = false,
  group = false,
) => {
  const newId = Date.now();
  const newItem = {
    id: newId.toString(),
    name: name,
    category: category,
    expDate: expDate,
    barcode: barcode,
    quantity: quantity,
    unit: unit,
  };
  let targetList;
  if (isShop === true) {
    targetList = 'shopList';
  } else {
    targetList = 'itemList';
  }
  try {
    // await AsyncStorage.setItem(newId.toString(), JSON.stringify(newItem));
    // console.log(Global.user, Global.user.userId, firebase.auth().currentUser.uid);
    await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .collection(targetList)
      .doc(newId.toString())
      .set(newItem);
  } catch (e) {
    console.log('error: submitItem failed');
    throw e;
  }
};


const remove = async (id, targetList, group = false) => {
  try {
    // await AsyncStorage.removeItem(id);
    console.log(Global.fridge, targetList);
    await firestore()
      .collection('fridges')
      .doc(await fridge(group))
      .collection(targetList)
      .doc(id)
      .delete();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

//Recipes

const submitRecipe = async (
  name,
  level,
  duration,
  ingredients,
  method,
) => {
  const newId = Date.now();
  const newItem = {
    id: newId.toString(),
    name: name,
    level: level,
    duration: duration,
    ingredients: [],
    method: method,
  };
  for (const i in ingredients) {
        newItem.ingredients.push(ingredients[i]);
   }

  let targetList = 'recipeList';
  try {
    // await AsyncStorage.setItem(newId.toString(), JSON.stringify(newItem));
    // console.log(Global.user, Global.user.userId, firebase.auth().currentUser.uid);
    await firestore()
      .collection(targetList)
      .doc(newId.toString())
      .set(newItem);
  } catch (e) {
    console.log('error: submitRecipe failed');
    throw e;
  }
};

const removeRecipe = async (id) => {
  try {
    // await AsyncStorage.removeItem(id);
    await firestore()
      .collection('recipeList')
      .doc(id)
      .delete();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getAllRecipe = async (search = null) => {
  // let keys = [];
  let keys;
  if (search == '')
    search = null;
  try {
    // keys = await AsyncStorage.getAllKeys();
    keys = await firestore()
      .collection('recipeList')
      .orderBy('name')
      .startAt(search)
      .endAt(search+"\uf8ff")
      .get();
  } catch (e) {
    console.log('error: retrieving all keys failed'+e);
    throw e;
  }
  const results = keys.docs.map(item => item.data());
  return results;
};

//Meals

const submitMeal = async (
  type,
  date,
  recipe,
) => {
  const newId = Date.now();
  const newItem = {
    id: newId.toString(),
    type: type,
    date: date,
    recipe: recipe,
  };
  let targetList = 'mealList';
  try {
    // await AsyncStorage.setItem(newId.toString(), JSON.stringify(newItem));
    // console.log(Global.user, Global.user.userId, firebase.auth().currentUser.uid);
    await firestore()
      .collection(targetList)
      .doc(newId.toString())
      .set(newItem);
  } catch (e) {
    console.log('error: submitMeal failed');
    throw e;
  }
};

const removeMeal = async (id) => {
  try {
    // await AsyncStorage.removeItem(id);
    await firestore()
      .collection('mealList')
      .doc(id)
      .delete();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getAllMeal = async (search = null) => {
  // let keys = [];
  let keys;
  if (search == '')
    search = null;
  try {
    // keys = await AsyncStorage.getAllKeys();
    keys = await firestore()
      .collection('mealList')
      .orderBy('type')
      .startAt(search)
      .endAt(search+"\uf8ff")
      .get();
  } catch (e) {
    console.log('error: retrieving all keys failed'+e);
    throw e;
  }
  const results = keys.docs.map(item => item.data());
  return results;
};


export default {getAll, getAllShop, get, submit, remove, submitRecipe, removeRecipe, getAllRecipe, submitMeal, removeMeal, getAllMeal};
