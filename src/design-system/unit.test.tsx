import { render, screen, fireEvent } from '@testing-library/react-native';
import TextButton from './TextButton';
import Checkbox from './Checkbox';
import CircleButton from './CircleButton';
import DatePicker from './DatePicker';
import Dropdown from './Dropdown';
import IconButton from './IconButton';
import Input from './Input';
import KeyboardListener from './KeyboardListener';
import Pagination from './Pagination';
import Palette from './Palette';
import Slider from './Slider';
import UnderlineButton from './UnderlineButton';
import wait from './wait';

describe('Checkbox', () => {

    it('toggles from unchecked to checked', () => {
        let checked = false;

        render(<Checkbox label='CHECK' onChecked={(c) => {checked = c}} accessibilityLabel='check'/>)
        fireEvent.press(screen.getByText('CHECK'));

        expect(checked).toBe(true);
    })

    it('is accessible from accessibility label', () => {
        let checked = false;

        render(<Checkbox label='CHECK' onChecked={(c) => {checked = c}} accessibilityLabel='check'/>)
        fireEvent.press(screen.getByLabelText('check'));

        expect(checked).toBe(true);
    })

    it('does not toggle when disabled', () => {
        let checked = false;

        render(<Checkbox label='CHECK' onChecked={(c) => {checked = c}} accessibilityLabel='check' disabled/>)
        fireEvent.press(screen.getByText('CHECK'));

        expect(checked).toBe(false);
    })

    it('overrides the checked state', () => {
        let checked = true;

        render(<Checkbox label='CHECK' onChecked={(c) => {checked = c}} accessibilityLabel='check' isChecked={checked}/>)
        fireEvent.press(screen.getByText('CHECK'));

        expect(checked).toBe(false);
    })
})

describe('CircleButton', () => {
    it('fires an event when pressed', () => {
        let fired = false;

        render(<CircleButton accessibilityLabel='test' onPress={() => { fired = true; }} iconSource='back'/>);
        fireEvent.press(screen.getByLabelText('test'));

        expect(fired).toBe(true);
    })
})

describe('DatePicker', () => {
    it('renders', () => {
        render(
        <>
            <DatePicker  label='DATE' accessibilityLabel='date' onSelected={() => {}} date={undefined} mode='date'/>
            <DatePicker  label='HOUR' accessibilityLabel='hour' onSelected={() => {}} date={undefined} mode='time'/>
        </>);
    })
})

describe('Dropdown', () => {
    it('selects an item from an option list', () => {
        const options = [
            {id: 'option-a', value: 'OPTION A'},
            {id: 'option-b', value: 'OPTION B'},
        ]

        let selected: {id: string, value: string} | undefined = undefined;

        render(
            <Dropdown
                options={options}
                extractOption={(i) => ({...i})}
                selectedOption={o => {selected = o}}
                label='Test'
                placeholder='PLACEHOLDER'
                accessibilityLabel='test'
            />
        )

        fireEvent.press(screen.getByText('PLACEHOLDER'));
        fireEvent.press(screen.getByText('OPTION A'));

        expect(selected!.id).toBe(options[0].id);

    })

    it('renders a custom header', () => {
        const options = [
            {id: 'option-a', value: 'OPTION A'},
            {id: 'option-b', value: 'OPTION B'},
        ]

        let selected: {id: string, value: string} | undefined = undefined;

        render(
            <Dropdown
                options={options}
                extractOption={(i) => ({...i})}
                selectedOption={o => {selected = o}}
                label='Test'
                placeholder='PLACEHOLDER'
                accessibilityLabel='test'
                obrigatory
                Header={
                    <TextButton
                        label='HEADER'
                        onPress={() => {selected = {id: 'header', value: 'header'}}}
                        accessibilityLabel='header'
                    />
                }
            />
        )

        fireEvent.press(screen.getByText('PLACEHOLDER'));
        fireEvent.press(screen.getByText('HEADER'));
        expect(selected!.id).toBe('header');
        
    })

    it('renders a custom cell', () => {
        const options = [
            {id: 'option-a', value: 'OPTION A'},
            {id: 'option-b', value: 'OPTION B'},
        ]

        let selected: {id: string, value: string} | undefined = undefined;

        render(
            <Dropdown
                options={options}
                extractOption={(i) => ({...i})}
                selectedOption={o => {selected = o}}
                label='Test'
                placeholder='PLACEHOLDER'
                accessibilityLabel='test'
                description='Custom description'
                renderCell={(option, onPress) => (
                    <TextButton
                        label={option.id}
                        onPress={onPress}
                        accessibilityLabel={option.value}
                    />
                )}
            />
        )

        fireEvent.press(screen.getByText('PLACEHOLDER'));
        fireEvent.press(screen.getByText('option-a'));

        expect(selected!.id).toBe(options[0].id);
    })

    it('can be opened manually', () => {
        const options = [
            {id: 'option-a', value: 'OPTION A'},
            {id: 'option-b', value: 'OPTION B'},
        ]

        let selected: {id: string, value: string} | undefined = undefined;

        render(
            <Dropdown
                options={options}
                extractOption={(i) => ({...i})}
                selectedOption={o => {selected = o}}
                label='Test'
                placeholder='PLACEHOLDER'
                accessibilityLabel='test'
                openHandlers={[true, () => {}]}
            />
        )

        fireEvent.press(screen.getByText('OPTION A'));

        expect(selected!.id).toBe(options[0].id);
    })

    it('closes when cover is pressed', () => {
        const options = [
            {id: 'option-a', value: 'OPTION A'},
            {id: 'option-b', value: 'OPTION B'},
        ]

        let open = true

        render(
            <Dropdown
                options={options}
                extractOption={(i) => ({...i})}
                selectedOption={o => {}}
                label='Test'
                placeholder='PLACEHOLDER'
                accessibilityLabel='test'
                openHandlers={[open, (o) => { open = o as boolean }]}
            />
        )

        fireEvent.press(screen.getByLabelText('modal-cover'));

        expect(open).toBe(false);
    })
})

describe('IconButton', () => {

    it('fires an event when pressed', () => {
        let fired = false;

        render(<IconButton source='calendar' accessibilityLabel='test' onPress={() => { fired = true; }}/>);
        fireEvent.press(screen.getByLabelText('test'));

        expect(fired).toBe(true);

    })

    it('does not fire an event when disabled', () => {
        let fired = false;

        render(<IconButton source='camera' accessibilityLabel='test' onPress={() => { fired = true; }} status='disabled'/>);
        fireEvent.press(screen.getByLabelText('test'));

        expect(fired).toBe(false);
    })
})

describe('Input', () => {

    it('allows the user to input text', () => {
        let text = '';

        render(
            <Input
                label='Input'
                placeholder='Placeholder'
                value={text}
                setValue={t => {text = t}}
                accessibilityLabel='test'
                keyboardType='numeric'
            />
        );

        fireEvent.changeText(screen.getByLabelText('test'), '1234');
        expect(text).toBe('1234');
    })

})

describe('KeyboardListener', () => {
    it('renders', () => {
        render(<KeyboardListener/>);
    })
})

describe('Pagination', () => {
    it('renders', () => {
        render(<Pagination page={0} length={2}/>)
    })
})

describe('Palette', () => {
    it('has color strings', () => {
        for(let palette in Palette) {
            for(let tint in Palette[palette as keyof typeof Palette]) {
                const color = Palette[palette as keyof typeof Palette][tint as keyof typeof Palette.red];
                expect(color.length).toBe(7);
                expect(color[0]).toBe('#');
            }
        }
    })
})

describe('Slide', () => {
    it('renders', () => {
        render(<Slider value={0} setValue={() => {}} label='slider' accessibilityLabel='slider'/>)
    })
})

describe('TextButton', () => {

    it('fires an event when pressed', () => {
        let fired = false;

        render(<TextButton label='TEST' accessibilityLabel='test' onPress={() => { fired = true; }}/>);
        fireEvent.press(screen.getByText('TEST'));

        expect(fired).toBe(true);

    })

    it('is accessible by accesibility label', () => {
        let fired = false;

        render(<TextButton label='TEST' accessibilityLabel='test' onPress={() => { fired = true; }}/>);
        fireEvent.press(screen.getByLabelText('test'));

        expect(fired).toBe(true);
    })

    it('does not fire an event when disabled', () => {
        
        let fired = false;

        render(<TextButton label='TEST' accessibilityLabel='test' onPress={() => { fired = true; }} status='disabled'/>);
        fireEvent.press(screen.getByText('TEST'));

        expect(fired).toBe(false);

    })

    it('does not fire an event when disabled and outlined', () => {
        
        let fired = false;

        render(<TextButton label='TEST' accessibilityLabel='test' onPress={() => { fired = true; }} status='outline-disabled'/>);
        fireEvent.press(screen.getByText('TEST'));

        expect(fired).toBe(false);

    })

    it('can be rendered on any size', () => {

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

    it('can be rendered with any status', () => {

        let sizes = '';

        render(
            <>
                <TextButton label='ACTIVE' accessibilityLabel='active' onPress={() => { sizes += '-a'; }} status='active'/>
                <TextButton label='CAREFULL' accessibilityLabel='carefull' onPress={() => { sizes += '-c'; }} status='carefull'/>
                <TextButton label='DISABLED' accessibilityLabel='disabled' onPress={() => { sizes += '-d'; }} status='disabled'/>
                <TextButton label='OUTLINED' accessibilityLabel='outlined' onPress={() => { sizes += '-o'; }} status='outlined'/>
                <TextButton label='SECONDARY' accessibilityLabel='secondary' onPress={() => { sizes += '-s'; }} status='secondary'/>
                <TextButton label='OUTLINE-DISABLED' accessibilityLabel='outline-disabled' onPress={() => { sizes += '-od'; }} status='outline-disabled'/>
            </>
        );

        fireEvent.press(screen.getByText('ACTIVE'));
        fireEvent.press(screen.getByText('CAREFULL'));
        fireEvent.press(screen.getByText('DISABLED'));
        fireEvent.press(screen.getByText('OUTLINED'));
        fireEvent.press(screen.getByText('SECONDARY'));
        fireEvent.press(screen.getByText('OUTLINE-DISABLED'));

        expect(sizes).toBe('-a-c-o-s');
    })

})

describe('Underline Button', () => {

    it('fires an event when pressed', () => {
        let fired = false;

        render(<UnderlineButton label='TEST' accessibilityLabel='test' onPress={() => { fired = true; }} status='selected'/>)
        fireEvent.press(screen.getByText('TEST'));

        expect(fired).toBe(true);

    })

    it('is accessible by accesibility label', () => {
        let fired = false;

        render(<UnderlineButton label='TEST' accessibilityLabel='test' onPress={() => { fired = true; }} status='selected'/>)
        fireEvent.press(screen.getByLabelText('test'));

        expect(fired).toBe(true);

    })
})

describe('wait', () => {
    it('halts process for some time', async () => {
        let eventFired = false;
        setTimeout(() => eventFired = true, 1)
        await wait(2);
        expect(eventFired).toBe(true);
    })
})