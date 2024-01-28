import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import AddGym from "../screens/add-gym";
import Welcome from "../screens/Welcome";

export type LoginParamList = 
{
    'login/welcome': undefined,
    'login/add-gym': undefined,
}

const Stack = createNativeStackNavigator<LoginParamList>();

const LoginStack = () => {
    return (
    <>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='login/welcome' component={Welcome}/>
            <Stack.Screen name='login/add-gym' component={AddGym}/>
        </Stack.Navigator>
    </>);
}

export default LoginStack;

export type LoginNavigationProps = NativeStackScreenProps<LoginParamList, keyof LoginParamList>['navigation'];