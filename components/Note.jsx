import { Text, View } from 'react-native';
import tw from 'twrnc';
//todo: add onPress to Note that brings up note editor page for that note
const Note = ({ title, content }) => {
    const twTitle = "mt-1 ml-2 text-2xl text-white";
    const twText = "mt-1 ml-2 text-lg text-white";
    return (
        <View style={tw`bg-slate-800 m-1 rounded-md`}>
        <Text style={tw`${twTitle}`}>{title}</Text>
        <Text style={tw`${twText}`}>{content}</Text>
        </View>
    )
}

export default Note; 