import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: theme.colorsPrimary.primary,
        flexDirection: 'column',
    },
    containerDestaque: {
        width: 600,
        height: 300,
        paddingBottom: 50,
        backgroundColor: theme.colorsPrimary.primary,
    },
    textCategoria: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        paddingVertical: 20,
        right: 80,
        textAlign: 'center',
        color: 'white'
    }
    
})