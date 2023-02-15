import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, adaptNavigationTheme, useTheme } from 'react-native-paper';
import { Home, ViewCust, AddEmp, AddTask, Report, Setting, Login, Employee } from './Screens';

import {
  enGB,
  registerTranslation,
} from 'react-native-paper-dates'
import { color } from '@rneui/base';
registerTranslation('en-GB', enGB)

const Stack = createNativeStackNavigator();
const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });

export default function App() {
  const { colors } = useTheme()
  const theme = {
    ...DefaultTheme,
    colors: {
      "primary": "rgb(200, 191, 255)",
      "onPrimary": "rgb(45, 18, 143)",
      "primaryContainer": "rgb(69, 50, 166)",
      "onPrimaryContainer": "rgb(229, 222, 255)",
      "secondary": "rgb(201, 195, 220)",
      "onSecondary": "rgb(49, 46, 65)",
      "secondaryContainer": "rgb(71, 68, 89)",
      "onSecondaryContainer": "rgb(229, 223, 249)",
      "tertiary": "rgb(236, 184, 206)",
      "onTertiary": "rgb(72, 37, 54)",
      "tertiaryContainer": "rgb(97, 59, 77)",
      "onTertiaryContainer": "rgb(255, 216, 231)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "rgb(28, 27, 31)",
      "onBackground": "rgb(229, 225, 230)",
      "surface": "rgb(28, 27, 31)",
      "onSurface": "rgb(229, 225, 230)",
      "surfaceVariant": "rgb(72, 69, 79)",
      "onSurfaceVariant": "rgb(201, 197, 208)",
      "outline": "rgb(146, 143, 153)",
      "outlineVariant": "rgb(72, 69, 79)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(229, 225, 230)",
      "inverseOnSurface": "rgb(49, 48, 51)",
      "inversePrimary": "rgb(93, 76, 191)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(37, 35, 42)",
        "level2": "rgb(42, 40, 49)",
        "level3": "rgb(47, 45, 56)",
        "level4": "rgb(49, 47, 58)",
        "level5": "rgb(52, 50, 62)"
      },
      "surfaceDisabled": "rgba(229, 225, 230, 0.12)",
      "onSurfaceDisabled": "rgba(229, 225, 230, 0.38)",
      "backdrop": "rgba(49, 47, 56, 0.4)"
    },
  };
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={LightTheme} >
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: colors.onSecondaryContainer,
          },
          headerTintColor: '#fff',

        }} >
          <Stack.Screen component={Login} name="Login" options={{ headerShown: false }} />

          <Stack.Screen component={Home} name="Home" options={{ headerBackVisible: false }} />
          <Stack.Screen component={Setting} name="Setting" />
          <Stack.Screen component={ViewCust} name="ViewCust" options={{ title: "Customer" }} />
          <Stack.Screen component={Employee} name="Employee" options={{ title: "Employees" }} />
          <Stack.Screen component={AddEmp} name="AddEmp" options={{ title: "Add Emoplyee" }} />

          <Stack.Screen component={AddTask} name="AddTask" options={{ title: "Add Task " }} />
          <Stack.Screen component={Report} name="Report" />

        </Stack.Navigator>
        <StatusBar barStyle="light-content" />
      </NavigationContainer>
    </PaperProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
