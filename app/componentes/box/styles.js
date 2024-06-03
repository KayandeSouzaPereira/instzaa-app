import { StyleSheet } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({

    container:{
        width: 380,
        height: 500,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 15,
        marginHorizontal: 5,
        backgroundColor:theme.colorsPrimary.secondary100
    },
    containerBotao:{
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 5,
        paddingTop:80
    },
    containerText:{
        height: 120,
        top: 30,
        width: 250,
        alignContent: 'flex-start'
    },
    containerTextTitleLoc:{
        height: 50,
        width: 250,
        flex: 1,
        flexDirection:"row"
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
        fontSize: 30
    },
    descricao:{
        fontFamily: theme.fonts.text,
        color: 'white',
        fontSize: 15,
        marginHorizontal: 5
    }
    
})