import Svg, { Path } from 'react-native-svg';
import SourceProp from './SourceProp';

const Clock = ({height, width, primary, rotation = 0}: SourceProp) => (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" rotation={rotation}>
        <Path d="M13.675 14.825L14.8 13.7L10.825 9.7V4.675H9.325V10.3L13.675 14.825ZM10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3667 0 10C0 8.63333 0.2625 7.34167 0.7875 6.125C1.3125 4.90833 2.02917 3.84583 2.9375 2.9375C3.84583 2.02917 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.63333 0 10 0C11.3667 0 12.6583 0.2625 13.875 0.7875C15.0917 1.3125 16.1542 2.02917 17.0625 2.9375C17.9708 3.84583 18.6875 4.90833 19.2125 6.125C19.7375 7.34167 20 8.63333 20 10C20 11.3667 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.9708 16.1542 17.0625 17.0625C16.1542 17.9708 15.0917 18.6875 13.875 19.2125C12.6583 19.7375 11.3667 20 10 20ZM10 18.5C12.3333 18.5 14.3333 17.6667 16 16C17.6667 14.3333 18.5 12.3333 18.5 10C18.5 7.66667 17.6667 5.66667 16 4C14.3333 2.33333 12.3333 1.5 10 1.5C7.66667 1.5 5.66667 2.33333 4 4C2.33333 5.66667 1.5 7.66667 1.5 10C1.5 12.3333 2.33333 14.3333 4 16C5.66667 17.6667 7.66667 18.5 10 18.5Z" fill={primary}/>
    </Svg>
) 

export default Clock;