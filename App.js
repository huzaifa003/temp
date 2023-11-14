import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, SafeAreaView, TextInput, KeyboardAvoidingView } from 'react-native';
import { db } from './db';
import { getDatabase, ref, set, get } from "firebase/database";

import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';


export default function App() {
  const tempData = [{ "description": "Hello", "img": "https://firebasestorage.googleapis.com/v0/b/bcssp21g3.appspot.com/o/Deal%201.jpeg?alt=media&token=8d457d84-4ff1-4264-927e-1a620223a584", "key": 0, "price": 1400, "title": "Deal 1" }, { "description": "Hello 2", "img": "https://firebasestorage.googleapis.com/v0/b/bcssp21g3.appspot.com/o/Deal%202.jpeg?alt=media&token=75f39345-4eda-4045-97d4-fa5bc7e80cde", "key": 1, "price": 1500, "title": "Deal 2" }, { "description": "Hello 456", "img": "https://firebasestorage.googleapis.com/v0/b/bcssp21g3.appspot.com/o/Deal%203.png?alt=media&token=63187eb1-b1c7-439a-8cdc-a3753ec7cdc4", "key": 2, "price": 1800, "title": "Deal 3" }, { "description": "Hello World", "img": "https://firebasestorage.googleapis.com/v0/b/bcssp21g3.appspot.com/o/Deal%204.jpeg?alt=media&token=feebbc83-8970-467b-8315-055a59179a04", "key": 3, "price": 1200, "title": "Deal 4" }, { "description": "Hello 5", "img": "https://firebasestorage.googleapis.com/v0/b/bcssp21g3.appspot.com/o/Deal%205.jpeg?alt=media&token=bbe572eb-e05e-4c1c-97f7-46e20f63ad2b", "key": 4, "price": 800, "title": "Deal 5" }]
  const database = getDatabase(db, "https://lab-task-a428f-default-rtdb.firebaseio.com/")
  const [data, changeData] = useState()
  const [rerender, setRerender] = useState(false)
  const [value, setValue] = useState('')
  const [greaterThan, setGreaterThan] = useState(true)
  const [newPrice, setNewPrice] = useState('')

  useEffect(() => {
    console.log(db)
    get(ref(database, `bunty/burgers/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        changeData(snapshot.val());
      } else {
        console.log("No data available");
        set(ref(database, "bunty/burgers/"), tempData)
        changeData(tempData);
      }
    }).catch((error) => {
      console.error(error);
    });

  }, [])

  const edit = () => {
    
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      console.log(parseInt(value))
      console.log("hello")
      if (greaterThan ? element.price >  parseInt(value) : element.price < parseInt(value)) {
        data[index].price = parseInt(newPrice);
      }
    }

    set(ref(database, "bunty/burgers/"), data)
    setRerender(!rerender)
  }

  const handleValueChange = (text) => {
    if (text === '') {
      setValue('');
      return;
    }

    if (parseInt(text) > 0) {
      setValue(text)
    }
  }

  const toggleGreaterThan = () => {
    setGreaterThan(!greaterThan)
  }

  return (
    
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      
      <View style={styles.header}>
        <Text style={styles.title}>Burger Deals</Text>
        <Button title={greaterThan ? ">" : "<"} onPress={toggleGreaterThan} />
        <TextInput
          style={styles.input}
          placeholder="Enter a positive number"
          keyboardType="numeric"
          onChangeText={handleValueChange}
          value={value}
        />
        
        <Button title="Edit" onPress={edit} />
      </View>
      <View style={styles.newPriceContainer}>
        <Text style={styles.newPriceLabel}>Enter new price:</Text>
        <TextInput
          style={styles.newPriceInput}
          placeholder="New price"
          keyboardType="numeric"
          onChangeText={setNewPrice}
          value={newPrice}
        />
      </View>
      <FlatList
        data={data}
        extraData={rerender}
        renderItem={({ item }) => (
          <View key={item.key} style={styles.item}>
            <Image source={{ uri: item.img }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.key.toString()}
        keyboardShouldPersistTaps="handled"
      />
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // add paddingTop for Android status bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    width: 100,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  details: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  newPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  newPriceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newPriceInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    width: 100,
  },
});
