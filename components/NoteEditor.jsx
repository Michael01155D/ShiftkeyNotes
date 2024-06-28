import { useState, useEffect, useRef } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "../db";
import { SafeAreaView, TextInput, Text } from "react-native";
import tw from 'twrnc';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';

const NoteEditor = ({navigation, route}) => {
    const { title, content, color, id } = route.params.data;
    const [noteTitle, setNoteTitle] = useState(title);
    const [noteContent, setNoteContent] = useState(content);
    const [deleteNote] = useDeleteNoteMutation();
    const [updateNote] = useUpdateNoteMutation();
    const inputRef = useRef(null);
    //**extra feature:** give notes a color attribute that user can change in DropDown component menu
    const [noteColor, setNoteColor] = useState(color ? color : 'text-white');
    const colors = [
      { label: 'White (default)', value: 'text-white' },
      { label: 'Red', value: 'text-red-600' },
      { label: 'Yellow', value: 'text-yellow-500' },
      { label: 'Green', value: 'text-green-600' },
      { label: 'Blue', value: 'text-blue-600' },
      { label: 'Purple', value: 'text-purple-600' },
    ]
       
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
  
 
    //when note is updated, update the note in the db
    useEffect(() => {
      updateNote({title: noteTitle, content: noteContent, id, color: noteColor});
    }, [noteTitle, noteContent, noteColor]);

    return(
      <SafeAreaView style={tw`bg-black h-full w-full`}>
        <TextInput 
          style={tw`mt-1 ml-2 pl-2 mr-2 text-lg ${noteColor} bg-slate-800`} 
          placeholder="Title"
          placeholderTextColor="white" 
          ref={inputRef} 
          value={noteTitle} 
          onChangeText={(newText) => {setNoteTitle(newText)}}
        />
        <TextInput 
          style={tw`mt-2 ml-2 pl-2 mr-2 text-lg ${noteColor} bg-slate-800 rounded-md`} 
          multiline
          textAlignVertical="top"
          placeholderTextColor="white"
          numberOfLines={15} 
          placeholder="New note" 
          value={noteContent} 
          onChangeText={(newText) => {setNoteContent(newText)}}
        />
        <Dropdown 
          data={colors}
          labelField="label"
          valueField="value"
          placeholder={noteColor}
          value={noteColor}
          onChange={(choice)=> {setNoteColor(choice.value)}}
          style={tw` mt-1 w-40% bg-white mx-auto rounded-lg pl-1`}
        />
        <Text style={tw`text-white mx-auto mt-2`}>Select a Font Color for Your Note!</Text>
      </SafeAreaView>
    )
  }

  export default NoteEditor;