import { useState, useEffect, useRef } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "../db";
import { SafeAreaView, TextInput, Pressable, Text } from "react-native";
import tw from 'twrnc';
import AntDesign from '@expo/vector-icons/AntDesign';

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
        <AntDesign name="delete" style={tw`mr-5`}size={24} color="white"  onPress={() => removeNote()}/>
      )
      });

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

  export default NoteEditor;