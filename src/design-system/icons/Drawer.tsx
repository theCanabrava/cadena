import Svg, { Path } from 'react-native-svg';
import SourceProp from './SourceProp';

const Drawer = ({height, width, primary, rotation = 0}: SourceProp) => (
    <Svg width={width} height={height} viewBox="0 0 36 36" fill="none" rotation={rotation}>
        <Path d="M4.5 27V24.75H31.5V27H4.5ZM4.5 19.125V16.875H31.5V19.125H4.5ZM4.5 11.25V9H31.5V11.25H4.5Z" fill={primary}/>
    </Svg>
) 

export default Drawer;