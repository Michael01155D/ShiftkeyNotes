import { Pressable, SafeAreaView, Text, View } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import { useEffect, useState } from 'react';
import { useAddNoteMutation, useFetchNotesQuery, useDeleteNoteMutation } from './db';
import Note from "./components/Note";
import MasonryList from '@react-native-seoul/masonry-list';
import { TextInput } from 'react-native-web';

//next todo: implement stack.screen

//todo: move components into different files
const HomePage = ( {navigation} ) => {
  const [notes, setNotes] = useState();
  //aliasing to prevent name conflict
  const { data: notesData } = useFetchNotesQuery();
  const [addNote, { data: newNoteData, error: addNoteError}] = useAddNoteMutation();
  
  useEffect(() => {
    if (notesData) { 
      setNotes(notesData);
    } else{   //for debugging
      setNotes([{title: "hello", content: "world"}]);
    } 
    console.log("Notes are", notes);
    }, []);
  
  return(
    notes ?
    <View style={tw`w-full h-screen`}>
      <SearchBar/>
      <Notes notes={notes}/>
      <Pressable style={tw` absolute bottom-15 right-10 w-12 h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700
        rounded-full`}
        onPress={() => addNote({title: "", content: ""})}
        >
          <Text style={tw`m-auto text-white text-xl font-extrabold`}>+</Text>
      </Pressable> 
    </View>
    :
    <></>
  )
}

const Notes = ({ notes }) => {

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
      style={tw`w-99% h-8 ml-1 mt-2 mb-2 text-white bg-slate-800 rounded-lg px-2`} 
      placeholder="Search"
      value={query}
      onChangeText={(newQuery) => setQuery(newQuery)}
      //todo: display notes filtered by query
    />
    </>
  )
}

function App() {
  useDeviceContext(tw);
  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName="HomeScreen">
      <SafeAreaView style={tw`bg-black`}>
        <Text style={tw`w-screen mt-6 text-center text-xl text-white font-bold`}>
          Notes
        </Text>
        <Stack.Screen
        />
      </SafeAreaView>
      </Stack.Navigator>
    </Provider>
  )
}

export default App;