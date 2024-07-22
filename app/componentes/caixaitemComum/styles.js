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
    containerModal:{
        width: 400,
        height: 700,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 15,
        bottom:100,
        backgroundColor:theme.colorsPrimary.secondary100
    },
    containerText:{
        height: 60,
        top: 120
    },
    containerTextButton: {
        flexDirection:'row',
    },
    containerButton:{
        width: 300,
        height: 70,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 30,
        backgroundColor:theme.colorsPrimary.thirdary,
        flexDirection:'row'
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
    tituloModal:{
        fontFamily: theme.fonts.subtitle2,
        color: theme.colorsPrimary.heading,
        fontSize: 25,
        marginTop: 20,
        marginLeft: 20,
        textAlign: 'left',
        alignSelf:'flex-start'
    },
    valorModal:{
        fontFamily: theme.fonts.subtitle,
        color: "#c1bec1",
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20,
        textAlign: 'left',
        alignSelf:'flex-start'
    },
    descricaoModal:{
        fontFamily: theme.fonts.text,
        color: "#c1bec1",
        fontSize: 15,
        marginTop: 10,
        marginLeft: 20,
        textAlign: 'left',
        alignSelf:'flex-start'
    },
    buttonModal:{
        fontFamily: theme.fonts.subtitle2,
        color: theme.colorsPrimary.heading,
        fontSize: 25,
        alignSelf:'center'
    },
    descricao:{
        fontFamily: theme.fonts.text,
        color: 'white',
        fontSize: 12,
        marginHorizontal: 5
    }
    
})