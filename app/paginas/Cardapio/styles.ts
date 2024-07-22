import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../configs';
import { LinearGradient } from 'expo-linear-gradient';

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        flexDirection: 'column',
    },
    containerDestaque: {
        width: 600,
        height: 500,
        paddingBottom: 20,
    },
    containerItens: {
        width: 600,
        height: 400,
        paddingBottom: 50,
    },
    textCategoria: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        height: 60,
        right: 80,
        bottom:80,
        textAlign: 'center',
        color: 'white',
        backgroundColor:theme.colorsPrimary.secondary100
    },
    textCategoriaComun: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        right: 80,
        bottom:30,
        textAlign: 'center',
        color: 'white'
    }
    
})