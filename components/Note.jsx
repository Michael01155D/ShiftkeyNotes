import { Pressable, Text, View } from 'react-native';
import tw from 'twrnc';
const Note = ({ note, handlePress }) => {
    const twTitle = "mt-1 ml-2 text-2xl text-white";
    const twText = "mt-1 ml-2 text-lg text-white";
    const { title, content } = note;
    return (
        <View style={tw`bg-slate-800 m-1 rounded-md`}>
            <Pressable onPress={() => handlePress(note)}>
                <Text style={tw`${twTitle}`}>{title}</Text>
                <Text style={tw`${twText}`}>{content}</Text>
            </Pressable>
        </View>
    )
}

export default Note; 