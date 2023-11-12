import Svg, { Path, G } from 'react-native-svg';
import SourceProp from './SourceProp';

const MountainDetails = ({height, width, primary}: SourceProp) => (
    <Svg width={width} height={height-4} viewBox="0 0 20 20" fill="none">
        <G id="query_stats_FILL0_wght400_GRAD0_opsz48 1">
            <Path id="Vector" d="M1.85415 14.8125L0.833313 14.0625L4.74998 7.81246L7.24104 10.7291L10.5625 5.35413L12.8333 8.72913C12.6111 8.7569 12.3958 8.80204 12.1875 8.86454C11.9791 8.92704 11.7708 8.99996 11.5625 9.08329L10.625 7.64579L7.44671 12.8333L4.91665 9.89579L1.85415 14.8125ZM18.2708 19.1666L15.4791 16.375C15.1875 16.5833 14.8715 16.743 14.5312 16.8541C14.191 16.9652 13.8403 17.0208 13.4791 17.0208C12.4954 17.0208 11.6591 16.6762 10.9705 15.9871C10.2818 15.298 9.93748 14.4612 9.93748 13.4767C9.93748 12.4922 10.282 11.6562 10.9712 10.9687C11.6603 10.2812 12.4971 9.93746 13.4816 9.93746C14.4661 9.93746 15.3021 10.2818 15.9896 10.9704C16.6771 11.6591 17.0208 12.4953 17.0208 13.4791C17.0208 13.8402 16.9618 14.1909 16.8437 14.5312C16.7257 14.8715 16.5694 15.1975 16.375 15.5093L19.1666 18.2708L18.2708 19.1666ZM13.4762 15.7708C14.1171 15.7708 14.6597 15.5496 15.1041 15.1071C15.5486 14.6646 15.7708 14.1229 15.7708 13.4821C15.7708 12.8412 15.5496 12.2986 15.1071 11.8541C14.6646 11.4097 14.1229 11.1875 13.4821 11.1875C12.8412 11.1875 12.2986 11.4087 11.8541 11.8512C11.4097 12.2937 11.1875 12.8353 11.1875 13.4762C11.1875 14.117 11.4087 14.6597 11.8512 15.1041C12.2937 15.5486 12.8354 15.7708 13.4762 15.7708ZM15.0208 8.93746C14.8125 8.85413 14.5972 8.79857 14.375 8.77079C14.1528 8.74302 13.9236 8.71524 13.6875 8.68746L18.1458 1.66663L19.1666 2.41663L15.0208 8.93746Z" fill={primary}/>
        </G>
    </Svg>
) 

export default MountainDetails;