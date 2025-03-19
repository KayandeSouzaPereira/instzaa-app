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
        width: 570,
        height: 100,
        paddingHorizontal: 50,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: theme.colorsPrimary.primary,
    },
    containerModal:{
        width: 400,
        height: 600,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 15,
        bottom:120,
        backgroundColor:theme.colorsPrimary.secondary100
    },
    containerTextAviso: {
        width: 450,
        height: 250,
        marginVertical: 150,
        marginHorizontal: 50,
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
    },
    textPix: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 15,
        paddingVertical: 15,
        textAlign: 'center',
        color: 'white'
    },
    textPixLink: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 10,
        paddingVertical: 15,
        textAlign: 'center',
        color: 'cyan',
    },
    textPixTitle: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        paddingVertical: 15,
        textAlign: 'center',
        color: 'white'
    },
    textConcluido: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 12,
        paddingVertical: 15,
        textAlign: 'center',
        color: 'white'
    },
    textCreditoTitle: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        marginVertical: 30,
        textAlign: 'center',
        color: 'white'
    },
    
})