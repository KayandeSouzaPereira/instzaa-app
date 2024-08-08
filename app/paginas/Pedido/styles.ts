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
        marginHorizontal:15,
        backgroundColor: theme.colorsPrimary.primary,
        alignContent: 'center'
    },
    containerText: {
        width: 600,
        height: 100,
        paddingHorizontal: 30,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: theme.colorsPrimary.primary,
    },
    containerTextAviso: {
        width: 600,
        height: 250,
        marginVertical: 150,
        backgroundColor: theme.colorsPrimary.primary,
    },
    text: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        paddingVertical: 5,
        right: 80,
        textAlign: 'center',
        color: 'white'
    },
    textTotal: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        paddingVertical: 10,
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