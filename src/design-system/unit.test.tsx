import { render, screen, fireEvent } from '@testing-library/react-native';
import TextButton from './TextButton';


describe('TextButton', () => {

    it('Fires an event when pressed', () => {
        let fired = false;

        render(<TextButton label='TEST' accessibilityLabel='test' onPress={() => { fired = true; }}/>);
        fireEvent.press(screen.getByText('TEST'));

        expect(fired).toBe(true);

    })

    it('Is acessible by accesibility label', () => {
        let fired = false;

        render(<TextButton label='TEST' accessibilityLabel='test' onPress={() => { fired = true; }}/>);
        fireEvent.press(screen.getByLabelText('test'));

        expect(fired).toBe(true);
    })

    it('Does not fire an event when disabled', () => {
        
        let fired = false;

        render(<TextButton label='TEST' accessibilityLabel='test' onPress={() => { fired = true; }} status='disabled'/>);
        fireEvent.press(screen.getByText('TEST'));

        expect(fired).toBe(false);

    })

    it('Can be rendered on any size', () => {

        let sizes = '';

        render(
            <>
                <TextButton label='SMALL' accessibilityLabel='small' onPress={() => { sizes += '-small'; }} size='small'/>
                <TextButton label='LARGE' accessibilityLabel='large' onPress={() => { sizes += '-large'; }} size='large'/>
            </>
        );

        fireEvent.press(screen.getByText('SMALL'));
        fireEvent.press(screen.getByText('LARGE'));

        expect(sizes).toBe('-small-large');

    })

    it('Can be rendered with any status', () => {

        let sizes = '';

        render(
            <>
                <TextButton label='ACTIVE' accessibilityLabel='active' onPress={() => { sizes += '-a'; }} status='active'/>
                <TextButton label='CAREFULL' accessibilityLabel='carefull' onPress={() => { sizes += '-c'; }} status='carefull'/>
                <TextButton label='DISABLED' accessibilityLabel='disabled' onPress={() => { sizes += '-d'; }} status='disabled'/>
                <TextButton label='OUTLINED' accessibilityLabel='outlined' onPress={() => { sizes += '-o'; }} status='outlined'/>
                <TextButton label='SECONDARY' accessibilityLabel='secondary' onPress={() => { sizes += '-s'; }} status='secondary'/>
            </>
        );

        fireEvent.press(screen.getByText('ACTIVE'));
        fireEvent.press(screen.getByText('CAREFULL'));
        fireEvent.press(screen.getByText('DISABLED'));
        fireEvent.press(screen.getByText('OUTLINED'));
        fireEvent.press(screen.getByText('SECONDARY'));

        expect(sizes).toBe('-a-c-o-s');
    })

})