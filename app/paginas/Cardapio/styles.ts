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
        height: 430,
        paddingBottom: 10,
        marginRight:15
    },
    containerItens: {
        width: 600,
        height: 400,
        paddingBottom: 50,
    },
    containerItensComum: {
        width: 400,
        height: 400,
        paddingBottom: 50,
    },
    textCategoria: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        height: 70,
        width:"65%",
        top:10,
        paddingTop:10,
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