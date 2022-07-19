import 'react-native-gesture-handler'
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./src/navigation/RootNavigation";
import StackNav from "./src/navigation/Stack";

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNav/>
    </NavigationContainer>
  );
}
