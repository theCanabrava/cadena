import Svg, { Path } from 'react-native-svg';
import SourceProp from './SourceProp';

const Previous = ({height, width, primary, rotation = 0}: SourceProp) => (
    <Svg width={width} height={height} viewBox="0 0 36 36" fill="none" rotation={rotation}>
        <Path d="M9.0375 27.075L0 18.0375L9.0375 9L10.65 10.6125L3.225 18.0375L10.65 25.4625L9.0375 27.075Z" fill={primary}/>
    </Svg>
) 

export default Previous;