import MasonryList from '@react-native-seoul/masonry-list';
import Note from './Note';
import tw from "twrnc";

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

  export default Notes;