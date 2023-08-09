import Svg, { Path } from 'react-native-svg';

type SourceProp =
{
    height: number,
    width: number,
    primary: string,
    rotation?: number
    
}
const ChevronDown = ({height, width, primary, rotation = 0}: SourceProp) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" rotation={rotation}>
        <Path d="M12 15.375L6 9.375L7.075 8.3L12 13.25L16.925 8.325L18 9.4L12 15.375Z" fill={primary}/>
    </Svg>
) 

export default ChevronDown;