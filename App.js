import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './components/HomePage';
import NoteEditor from './components/NoteEditor';

const Stack = createNativeStackNavigator();

function App() {
  useDeviceContext(tw);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen name="HomePage" component={HomePage} options={{
              headerTitle: "Notes",
              headerStyle: tw`bg-black`,
              headerTintColor: "#fff",
              headerShadowVisible: false,
              headerTitleAlign: "center"
            }}/>
          <Stack.Screen name="NoteEditor" component={NoteEditor} options={{
            headerTitle: "Notes",
            headerStyle: tw`bg-black`,
            headerTintColor: "#fff",
            headerShadowVisible: false,
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
export default App;