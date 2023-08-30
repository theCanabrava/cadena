import { useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

type KeyboarListenerProps =
{
    onShow?: (e: KeyboardEvent) => void,
    onHide?: () => void
}
const KeyboardListener = ({onShow = () => {}, onHide = () => {}}: KeyboarListenerProps) =>
{
    useEffect(() =>
    {
        const showListener = Keyboard.addListener('keyboardDidShow', onShow);
        const hideListener = Keyboard.addListener('keyboardDidHide', onHide);

        return () =>
        {
            showListener.remove();
            hideListener.remove();
        }
    }, [onShow, onHide]);

    return null;
}

export default KeyboardListener;