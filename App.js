import { Pressable, SafeAreaView, Text, View } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import { useEffect, useState } from 'react';
import { useAddNoteMutation, useFetchNotesQuery, useDeleteNoteMutation } from './db';
import Note from "./components/Note";
import { TextInput } from 'react-native-web';

const twHeader= "w-screen mt-6 text-center text-xl text-white font-bold";

//todo: move components into different files
const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const { data } = useFetchNotesQuery();
  useEffect(() => { 
    setNotes(data);
    //for debugging:
    console.log("Notes are", notes);
    }, []);

  return(
    <>
      { notes ? 
        notes.map((n, i) => <Note key={i} content={n}/>)
        : <></>
      }
    </>
  )
}

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return(
    <>
    <TextInput 
      style={tw`w-95% h-8 ml-2 mt-2 text-white bg-slate-800 rounded-lg px-2`} 
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
      <SafeAreaView style={tw`bg-black`}>
        <Text style={tw`${twHeader}`}>
          Notes
        </Text>
        <SearchBar/>
        <HomePage />
        <Pressable style={tw` absolute bottom-15 right-10 w-12 h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded-full`}>
          <Text style={tw`m-auto text-white text-xl font-extrabold`}>+</Text>
        </Pressable> 
      </SafeAreaView>
    </Provider>
  )
}

export default App;