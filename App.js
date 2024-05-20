import { Pressable, SafeAreaView, Text, View } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import { useEffect, useState } from 'react';
import { useAddNoteMutation, useFetchNotesQuery, useDeleteNoteMutation } from './db';
import Note from "./components/Note";
import { TouchableOpacity } from 'react-native-web';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const { data } = useFetchNotesQuery();
  const [ addNote ] = useAddNoteMutation();
  const [ deleteNote ] = useDeleteNoteMutation();

  useEffect(() => { setNotes(data) }, []);

  return(
    <>
      { notes ? 
        notes.map((n, i) => <Note key={i} content={n}/>)
        : <></>
      }
    </>
  )
}

function App() {
  useDeviceContext(tw);
  const twText = "w-screen mt-16 text-center text-xl text-white font-bold";
 
  return (
    <Provider store={store}>
      <SafeAreaView style={tw`bg-black`}>
        <Text style={tw`${twText}`}>
          Notes
        </Text>
        <Text style={tw`${twText}`}>
          Search bar goes here
        </Text>
         <HomePage />
         <Pressable style={tw` absolute bottom-15 right-10 w-12 h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-full`}onPress={() => {}}>
            <Text style={tw`m-auto text-white text-xl font-extrabold`}>+</Text>
          </Pressable> 
      </SafeAreaView>
    </Provider>
  )
}

export default App;