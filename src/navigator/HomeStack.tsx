import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import NewClimb from "../screens/climbing/NewClimb";
import NewRoute from "../screens/climbing/NewRoute";
import Session from "../screens/climbing/session";
import Home from "../screens/home";

export type HomeParamList = 
{
    'home/index': undefined,
    'home/new-climb': undefined,
    'home/session': { command: 'start' | 'add-route' },
    'home/new-route': { attemptId?: string } ,
}

const Stack = createNativeStackNavigator<HomeParamList>();

const HomeStack = () => {
    return (
    <>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='home/index' component={Home}/>
            <Stack.Screen name='home/new-climb' component={NewClimb}/>
            <Stack.Screen name='home/session' component={Session}/>
            <Stack.Screen name='home/new-route' component={NewRoute}/>
        </Stack.Navigator>
    </>);
}

export default HomeStack;

export type HomeNavigationProps = NativeStackScreenProps<HomeParamList, keyof HomeParamList>['navigation'];
export type SessionRouteProps = NativeStackScreenProps<HomeParamList, 'home/session'>['route'];
export type NewRouteRouteProps = NativeStackScreenProps<HomeParamList, 'home/new-route'>['route'];