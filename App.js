import { Pressable, SafeAreaView, Text, View } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import { useEffect, useState } from 'react';
import { useAddNoteMutation, useFetchNotesQuery, useDeleteNoteMutation, useSearchNotesQuery, useUpdateNoteMutation } from './db';
import Note from "./components/Note";
import MasonryList from '@react-native-seoul/masonry-list';
import { TextInput } from 'react-native-web';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

//todo: move components into different files
const HomePage = ( {navigation} ) => {
  const [notes, setNotes] = useState([]);
  //aliasing to prevent name conflict
  const { data: notesData } = useSearchNotesQuery("");
  const [addNote, { data: newNoteData, error: addNoteError}] = useAddNoteMutation();
  
  useEffect(() => {
    if (newNoteData != undefined) {
      navigation.navigate("NoteEditor", {data: newNoteData});
    }
  }, [newNoteData])
  

  return(
    notesData ?
    <SafeAreaView style={tw`bg-black h-full w-full`}>
        <SearchBar/>
        <Notes notes={notesData}/>
        <Pressable style={tw` absolute bottom-15 right-10 w-12 h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700
        rounded-full`}
        onPress={() => addNote({title: "", content: ""})}
        >
          <Text style={tw`m-auto text-white text-xl font-extrabold`}>+</Text>
        </Pressable> 
    </SafeAreaView>
    :
    <></>
  )
}

const Notes = ({ notes }) => {
  console.log("In notes component, notes is:", notes);
  return(
    <>
  <MasonryList 
  style={tw`w-full h-screen`}
  data={notes}
  keyExtractor={(item) => item.id}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  renderItem={({item}) => <Note title={item.title} content={item.content}/>}
  onEndReachedThreshold={0.1}/>
  </>
  )
}

const SearchBar = ({query, setQuery}) => {

  return(
    <>
    <TextInput 
      style={tw`w-98% h-8 mt-2 mb-2 text-white bg-slate-800 rounded-lg px-2`} 
      placeholder="Search"
      value={query}
      onChangeText={(newQuery) => setQuery(newQuery)}
      //todo: display notes filtered by query
    />
    </>
  )
}

const NoteEditor = ({route}) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const { title, content, id } = route.params.data;
  const [deleteNote] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  useEffect(() => {
    updateNote({title: noteTitle, content: noteContent, id});
  }, [noteTitle, noteContent]);
  // const sendUpdate = () => {
  //   updateNote({title: noteTitle, content: noteContent, id});
  // }

  return(
    <SafeAreaView>
      <TextInput placeholder="Title" onChangeText={(newText) => {
        setNoteTitle(newText)
      }}/>
      <TextInput placeholder="New note" onChangeText={(newText) => {
        setNoteContent(newText)
      }}/>
    </SafeAreaView>
  )
}

function App() {
  useDeviceContext(tw);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen name="HomePage" component={HomePage} options={{
              headerTitle: "Notes",
              headerStyle: tw`bg-black`,
              headerTintColor: "#fff",
              headerShadowVisible: false,
              headerTitleAlign: "center"
            }}/>
          <Stack.Screen name="NoteEditor" component={NoteEditor} options={{
            headerTitle: "Notes",
            headerStyle: tw`bg-black`,
            headerTintColor: "#fff",
            headerShadowVisible: false,
            headerRight: () => (<Pressable>todo: make this look like a garbage can and delete note</Pressable>)
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;