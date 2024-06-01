import { useState, useEffect, useLayoutEffect } from "react";
import { useSearchNotesQuery, useAddNoteMutation } from "../db";
import { SafeAreaView, TextInput, Pressable, Text } from "react-native";
import tw from "twrnc";
import Notes from "./Notes"

const HomePage = ( {navigation} ) => {
    //aliasing to prevent name conflict
    const [query, setQuery] = useState("");
    const { data: notesData, error: fetchNotesError } = useSearchNotesQuery(query);
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
          />
          <Notes notes={notesData} navigation={navigation}/>
          <Pressable style={tw` absolute bottom-15 right-10 w-12 h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700
          rounded-full`}
          onPress={() => addNote({title: "", content: "", color: "text-white"})}
          >
            <Text style={tw`m-auto text-white text-xl font-extrabold`}>+</Text>
          </Pressable> 
      </SafeAreaView>
      :
      <SafeAreaView>
        <Text> Didnt fetch note data :( </Text>
      </SafeAreaView>
    )
  }

  export default HomePage;