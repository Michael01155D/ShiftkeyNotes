import { Text, View } from 'react-native';
import tw from 'twrnc';

const Note = ({ title, content }) => {
    const twTitle = "mt-1 text-center text-2xl text-white font-bold";
    const twText = "mt-1 text-center text-xl text-white font-bold";
    return (
        <View style={tw`bg-slate-800 m-2`}>
        <Text style={tw`${twTitle}`}>{title}</Text>
        <Text style={tw`${twText}`}>{content}</Text>
        </View>
    )
}

export default Note; 