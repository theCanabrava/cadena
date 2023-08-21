import Camera from './Camera';
import ChevronDown from './ChevronDown'
import Drawer from './Drawer';
import Location from './Location';
import Logo from './Logo';
import Previous from './Previous';
import SourceProp from './SourceProp';
import Trash from './Trash';

const ICON_MAP =
{
    camera: Camera,
    'chevron-down': ChevronDown,
    drawer: Drawer,
    location: Location,
    logo: Logo,
    previous: Previous,
    trash: Trash
}

export type IconSource = keyof typeof ICON_MAP;
type IconProp = { source: IconSource } & SourceProp;
const Icon = (props: IconProp) =>
{
    const Source = ICON_MAP[props.source];

    return <Source {...props}/>;
}

export default Icon;