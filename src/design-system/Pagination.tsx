import { View, StyleSheet } from 'react-native';
import Palette from './Palette';

type PaginationProps = {
    page: number,
    length: number
}
const Pagination = ({page, length}: PaginationProps) => {

    const pages: JSX.Element[] = [];
    if(length > 1) for(let i=0; i<length; i++) pages.push(
        <View
            key={String(i)}
            style={page === i ? styles.selectedPage : styles.unselectedPage}
        />
    )

    return (
        <View style={styles.container}>
            {pages}
        </View>
    )
}

export default Pagination;

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 20,
            gap: 8
        },

        unselectedPage: {
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: Palette.deepPurple.t300
        },

        selectedPage: {
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: Palette.deepPurple.t900
        }
    }
)