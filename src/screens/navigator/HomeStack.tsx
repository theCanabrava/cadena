import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import NewClimb from "../climbing/NewClimb";
import Home from "../home";


export type HomeParamList = 
{
    'home/index': undefined,
    'home/new-climb': undefined,
}

const Stack = createNativeStackNavigator<HomeParamList>();

const HomeStack = () => {
    return (
    <>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='home/index' component={Home}/>
            <Stack.Screen name='home/new-climb' component={NewClimb}/>
        </Stack.Navigator>
    </>);
}

export default HomeStack;

export type HomeNavigationProps = NativeStackScreenProps<HomeParamList, 'home/index'>['navigation'];