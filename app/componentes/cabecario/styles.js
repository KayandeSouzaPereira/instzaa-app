import { StyleSheet } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: 600,
        backgroundColor: theme.colorsPrimary.highlight,
        flexDirection: 'row',
    },
    text:{
        fontFamily: theme.fonts.title2,
        color: 'white',
        textAlign: 'center'
    }
    
})