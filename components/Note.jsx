import { Text } from 'react-native';
import tw from 'twrnc';

const Note = ({ title, content}) => {
    return (
        <>
        <Text style={tw`text-white-500`}>{title}</Text>
        <Text>{content}</Text>
        </>
    )
}

export default Note; 