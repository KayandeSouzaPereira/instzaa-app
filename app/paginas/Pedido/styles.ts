import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: theme.colorsPrimary.primary,
        flexDirection: 'column',
    },
    containerBox: {
        width: 600,
        height: 500,
        paddingHorizontal:15,
        backgroundColor: theme.colorsPrimary.primary,
    },
    containerText: {
        width: 600,
        height: 100,
        paddingHorizontal: 30,
        paddingBottom: 10,
        paddingTop: 5,
        backgroundColor: theme.colorsPrimary.primary,
    },
    text: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        paddingVertical: 20,
        right: 80,
        textAlign: 'center',
        color: 'white'
    },
    textTotal: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        paddingVertical: 15,
        paddingHorizontal: 20,
        textAlign: 'left',
        color: 'white'
    },
    textSub: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        paddingVertical: 15,
        textAlign: 'left',
        color: 'white'
    }
    
})