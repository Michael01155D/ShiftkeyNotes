import { SafeAreaView, Text, View } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import Note from './components/Note';
import { useEffect, useState } from 'react';
import { dbApi } from './db';

function App() {
  useDeviceContext(tw);
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    const notesReady = await dbApi.useFetchNotesQuery();
    return notesReady;
  }
  const twText = `text-white text-center mt-5`;
  useEffect(() => {
    setNotes(getNotes);
  }, [])
  console.log("notes is:" , notes)
  return (
    <Provider store={store}>
      <SafeAreaView style={tw`bg-black`}>
        <Text style={tw`w-screen mt-16 text-center text-xl text-white font-bold`}>
          Notes
        </Text>
        <View>
          <Text style={tw`${twText}`}>Search bar goes here</Text>
        </View>
        <View>
          <Text style={tw`${twText}`}>Notes go here</Text>
        </View>
      </SafeAreaView>
    </Provider>
  )
}

export default App;
