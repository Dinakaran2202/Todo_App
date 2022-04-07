import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Header from "./Component/Header";
import TodoItem from "./Component/TodoItem";
import AddTodo from "./Component/AddTodo";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "create an app", key: "1" },
    { text: "play cricket", key: "2" },
    { text: "call your friend", key: "3" },
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [{ text, key: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddTodo submitHandler={submitHandler} />
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});
