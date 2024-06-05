import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const dbApi = createApi({
  reducerPath: 'dbApi',
  tagTypes: ['Notes'],
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    fetchNotes: build.query({
      async queryFn() {
        const serializedNotes = await AsyncStorage.getItem('notes');
        const notes = JSON.parse(serializedNotes);

        return { data: [notes] }
      },
      providesTags: (result) => ['Notes']
    }),
    searchNotes: build.query({
      async queryFn(searchString) {
        const serializedNotes = await AsyncStorage.getItem('notes');

        const notes = JSON.parse(serializedNotes);
        
        if (searchString == "") { 
          //edited as per Allan's suggestion on discord:
          return { data: notes || [] }
        } else {
          const filteredNotes = notes.filter(note => {
            const { title, content } = note;
            const s = searchString.toLowerCase();
            return title.toLowerCase().indexOf(s) !== -1 || content.toLowerCase().indexOf(s) !== -1;
          });

          return { data: filteredNotes || [] }
        }
      }, 
      providesTags: (result) => ['Notes']
    }),
    addNote: build.mutation({
      async queryFn(note) {
        const serializedNotes = await AsyncStorage.getItem('notes');
        const notes = JSON.parse(serializedNotes) || [];
        note.id = uuid.v4();
        notes.unshift(note);
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        return { data: note }
      },
      invalidatesTags: ['Notes'],
    }),
    deleteNote: build.mutation({
      async queryFn(note) {
        const serializedNotes = await AsyncStorage.getItem('notes');
        let notes = JSON.parse(serializedNotes) || [];
        notes = notes.filter(x => x.id !== note.id);
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        return { data: note };
      },
      invalidatesTags: ['Notes'],
    }),
    updateNote: build.mutation({
      async queryFn(note) {
        const serializedNotes = await AsyncStorage.getItem('notes');
        const notes = JSON.parse(serializedNotes) || [];
        const updatedNotes = notes.map((n) => {
          if (n.id === note.id) {
            // add color attribute to DB for extra feature to allow diff text color notes
            return { ...n, title: note.title, content: note.content, color: note.color };
          }
          return n;
        });
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        return { data: note }
      },
      invalidatesTags: ['Notes'],
    }),
  }),
})

export const { useFetchNotesQuery, useSearchNotesQuery, useAddNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = dbApi