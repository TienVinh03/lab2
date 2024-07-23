import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Switch, Image, Alert } from 'react-native';
import Section from './component/Section';
import TextInputDemo from './component/TextInputDemo';

interface Todo {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [incompleteCount, setIncompleteCount] = useState<number>(0);

  useEffect(() => {
    const completed = todos.filter(todo => todo.completed).length;
    const incomplete = todos.length - completed;
    setCompletedCount(completed);
    setIncompleteCount(incomplete);
  }, [todos]);

  const addTodo = () => {
    if (editId !== null) {
      setTodos(todos.map(todo => (todo.id === editId ? { ...todo, title, content } : todo)));
      setEditId(null);
    } else {
      const newTodo: Todo = { id: Date.now(), title, content, completed: false };
      setTodos([...todos, newTodo]);
    }
    setTitle('');
    setContent('');
  };

  const deleteTodo = (id: number) => {

    Alert.alert('Delete', 'Are you sure', [
      {
        text: 'Cancle', style: 'cancel',

      }, {
        text: 'Delete', onPress: () => setTodos(todos.filter(todo => todo.id !== id))

      }
    ])

  };

  const toggleTodoStatus = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const editTodo = (todo: Todo) => {
    setTitle(todo.title);
    setContent(todo.content);
    setEditId(todo.id);
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <Section style={styles.todoItem} title={item.title}>
      <Switch
        value={item.completed}
        onValueChange={() => toggleTodoStatus(item.id)}

      />
      <View style={{ flexDirection: 'row', flex: 1 }} >

        {/* <TouchableOpacity onPress={() => toggleTodoStatus(item.id)}>
          <Text style={item.completed ? styles.completed : styles.incomplete}>{item.title}</Text>
        </TouchableOpacity> */}


      </View>

      <View>
        <Text>Content : {item.content}</Text>
      </View>



      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <View style={{ marginHorizontal: 100 }}>
          <TouchableOpacity onPress={() => editTodo(item)}>
            <Image source={require('../lab2/component/img/edit.png')} style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => deleteTodo(item.id)}>
            <Image source={require('../lab2/component/img/bin.png')} style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* <Button title="Edit" onPress={() => editTodo(item)} /> */}
      {/* <Button title="Delete" onPress={() => deleteTodo(item.id)} /> */}
    </Section>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <Text>Completed: {completedCount} | Incomplete: {incompleteCount}</Text>
      <TextInputDemo
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInputDemo
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={styles.input}
      />
      <Button title={editId !== null ? 'Edit Todo' : 'Add Todo'} onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  todoItem: {
    flexDirection: 'column',

    borderBottomWidth: 1,
    borderBottomColor: 'gray',


  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',

  },
  incomplete: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',

  },
});

export default App;