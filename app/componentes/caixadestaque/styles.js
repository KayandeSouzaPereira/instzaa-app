import { StyleSheet } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({

    container:{
        width: 270,
        height: 170,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 15,
        marginHorizontal: 5,
        backgroundColor:theme.colorsPrimary.secondary100
    },
    containerText:{
        height: 60,
        top: 120
    },
    containerTextIMG:{
        position:'absolute',
        right: 70,
        height: 60,
        top: 120
    },
    titulo:{
        fontFamily: theme.fonts.subtitle,
        color: 'white',
        fontSize: 20
    },
    descricao:{
        fontFamily: theme.fonts.text,
        color: 'white',
        fontSize: 12,
        marginHorizontal: 5
    }
    
})