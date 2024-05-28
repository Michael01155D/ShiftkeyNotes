import { Pressable, SafeAreaView, Text, View } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import { useEffect, useState, useRef } from 'react';
import { useAddNoteMutation, useFetchNotesQuery, useDeleteNoteMutation, useSearchNotesQuery, useUpdateNoteMutation } from './db';
import Note from "./components/Note";
import MasonryList from '@react-native-seoul/masonry-list';
import { TextInput } from 'react-native-web';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

//todo: move components into different files


const HomePage = ( {navigation} ) => {
  //aliasing to prevent name conflict
  const [query, setQuery] = useState("");
  const { data: notesData } = useSearchNotesQuery(query);
  const [addNote, { data: newNoteData, error: addNoteError}] = useAddNoteMutation();
  useEffect(() => {
    if (newNoteData != undefined) {
      navigation.navigate("NoteEditor", {data: newNoteData});
    }
  }, [newNoteData])
  


  return(
    notesData ?
    <SafeAreaView style={tw`bg-black h-full w-full`}>
        <TextInput 
        style={tw`w-98% h-8 mt-2 mb-2 text-white bg-slate-800 rounded-lg px-2`} 
        placeholder="Search"
        value={query}
        onChangeText={(newQuery) => setQuery(newQuery)}
        //todo: display notes filtered by query
        />
        <Notes notes={notesData} navigation={navigation}/>
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

const Notes = ({ notes, navigation}) => {

  const handlePress = (note) => {
    navigation.navigate("NoteEditor", {data: note})
  }
  console.log("In notes component, notes is:", notes);
  return(
    <>
  <MasonryList 
  style={tw`w-full h-screen`}
  data={notes}
  keyExtractor={(item) => item.id}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  renderItem={({item}) => <Note note={item} handlePress={handlePress}/>}
  onEndReachedThreshold={0.1}/>
  </>
  )
}


const NoteEditor = ({navigation, route}) => {
  const { title, content, id } = route.params.data;
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);
  const [deleteNote] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const inputRef = useRef(null);

  const removeNote = () => {
    deleteNote(route.params.data);
    navigation.navigate("HomePage");
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  //adds delete button to header on component mount
  useEffect(() => {
    navigation.setOptions({headerRight: () => (
      <Pressable style={tw`w-fit bg-slate-800 m-auto rounded-lg px-5 py-2`} onPress={() => removeNote()}>
        <Text style={tw`text-base text-white`}>Delete Note</Text>
      </Pressable>
    )
    })
    //listener to delete note if no title and no content when unmounted
    const removeEmptyNote = navigation.addListener("beforeRemove", (event) => {
       if (!noteTitle && !noteContent) {
          deleteNote(route.params.data);
       }
     });
    return removeEmptyNote;
  }, [navigation, noteContent, noteTitle])

  //when title or content is updated, update the note in the db
  useEffect(() => {
    updateNote({title: noteTitle, content: noteContent, id});
  }, [noteTitle, noteContent]);

  return(
    <SafeAreaView style={tw`bg-black h-full w-full`}>
      <TextInput style={tw`mt-1 ml-2 text-lg text-white`} placeholder="Title" ref={inputRef} value={noteTitle} onChangeText={(newText) => {setNoteTitle(newText)}}/>
      <TextInput style={tw`mt-2 ml-2 text-lg text-white`} placeholder="New note" value={noteContent} onChangeText={(newText) => {setNoteContent(newText)}}/>
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
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;