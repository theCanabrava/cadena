import Camera from './Camera';
import ChevronDown from './ChevronDown'
import Location from './Location';
import SourceProp from './SourceProp';

const ICON_MAP =
{
    camera: Camera,
    'chevron-down': ChevronDown,
    location: Location
}

export type IconSource = keyof typeof ICON_MAP;
type IconProp = { source: IconSource } & SourceProp;
const Icon = (props: IconProp) =>
{
    const Source = ICON_MAP[props.source];

    return <Source {...props}/>;
}

export default Icon;