import Svg, { Path } from 'react-native-svg';
import SourceProp from './SourceProp';

const Logo = ({height, width, primary, rotation = 0}: SourceProp) => (
    <Svg width={width} height={height} viewBox="0 0 36 36" fill="none" rotation={rotation}>
        <Path d="M1.5 27L10.5 15L17.8125 24.75H30L21 12.7875L16.3125 19.0125L14.8875 17.1375L21 9L34.5 27H1.5ZM6 24.75H15L10.5 18.75L6 24.75Z" fill={primary}/>
    </Svg>
) 

export default Logo;