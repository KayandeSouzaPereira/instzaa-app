import { StyleSheet } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({
    container:{
        width: 300,
        height: 70,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor:theme.colorsPrimary.thirdary
    },
    containerOff:{
        width: 250,
        height: 50,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 15,
        marginHorizontal: 50,
        marginVertical: 10,
        backgroundColor:theme.colorsPrimary.thirdaryOFF
    },
    containerText: {
        width: 300,
        height: 150,
        paddingHorizontal: 30,
        paddingBottom: 5,
        paddingTop: 5,
    },
    text: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        left:20,
        bottom:35,
        textAlign: 'center',
        color: 'white'
    },
    textDisable: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        left:20,
        bottom:45,
        textAlign: 'center',
        color: 'white'
    }
    
})