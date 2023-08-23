import Svg, { Path } from 'react-native-svg';
import SourceProp from './SourceProp';

const Back = ({height, width, primary, rotation = 0}: SourceProp) => (
    <Svg width={width} height={height} viewBox="0 0 36 36" fill="none" rotation={rotation}>
        <Path d="M10.275 19.125L19.575 28.425L18 30L6 18L18 6L19.575 7.575L10.275 16.875H30V19.125H10.275Z" fill={primary}/>
    </Svg>
) 

export default Back;