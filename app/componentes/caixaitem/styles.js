import { StyleSheet } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({

    container:{
        width: 450,
        height: 200,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 15,
        marginVertical: 20,
        backgroundColor:theme.colorsPrimary.secondary100
    },
    containerText:{
        height: 50,
        top: 50
    },
    titulo:{
        fontFamily: theme.fonts.subtitle,
        color: 'white',
        fontSize: 25
    },
    descricao:{
        fontFamily: theme.fonts.text,
        color: 'white',
        fontSize: 12
    }
    
})