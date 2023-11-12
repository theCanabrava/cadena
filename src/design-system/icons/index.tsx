import Back from './Back';
import Calendar from './Calendar';
import Camera from './Camera';
import CheckEmpty from './CheckEmpty'
import CheckFilled from './CheckFilled'
import ChevronDown from './ChevronDown'
import Clock from './Clock';
import Drawer from './Drawer';
import Edit from './Edit';
import Location from './Location';
import Logo from './Logo';
import MountainDetails from './MountainDetails';
import Previous from './Previous';
import SourceProp from './SourceProp';
import Trash from './Trash';

const ICON_MAP =
{
    back: Back,
    calendar: Calendar,
    camera: Camera,
    'check-empty': CheckEmpty,
    'check-filled': CheckFilled,
    'chevron-down': ChevronDown,
    clock: Clock,
    drawer: Drawer,
    edit: Edit,
    location: Location,
    logo: Logo,
    'mountain-details': MountainDetails,
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