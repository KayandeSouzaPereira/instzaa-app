import { StyleSheet } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({
    container:{
        width: 250,
        height: 50,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 15,
        marginHorizontal: 60,
        marginVertical: 10,
        backgroundColor:theme.colorsPrimary.thirdary
    },
    containerOff:{
        width: 250,
        height: 50,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 15,
        marginHorizontal: 60,
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
        fontSize: 20,
        left:15,
        bottom:30,
        textAlign: 'center',
        color: 'white'
    }
    
})