import { Text } from 'react-native';
import tw from 'twrnc';

const Note = ({ title, content }) => {
    const twTitle = "w-screen mt-10 text-center text-2xl text-white font-bold";
    const twText = "w-screen mt-4 text-center text-xl text-white font-bold";
    return (
        <>
        <Text style={tw`${twTitle}`}>{title}</Text>
        <Text style={tw`${twText}`}>{content}</Text>
        </>
    )
}

export default Note; 