import { StyleSheet } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        width:400,
        height:300,
        backgroundColor: theme.colorsPrimary.overlay,
        color: theme.colorsPrimary.cardColor,
        flexDirection: 'column',
    },
    viewEndereco:{
        flexDirection:'row',
        marginHorizontal:42,
        
    },
    viewCamp:{
        width:'100%',marginHorizontal:50, marginVertical:7
    },
    viewCampOPT:{
        width:'100%',marginVertical:5,marginHorizontal:7,flexDirection:'column'
    },
    
    textCamp:{
        color: theme.colorsPrimary.cardColor,
        fontFamily: theme.fonts.subtitle,
        fontSize: 20
    },
    formCamp:{
        width: 300,
        height: 35,
        fontFamily: theme.fonts.text,
        fontSize: 15,
        backgroundColor: theme.colorsPrimary.cardColor,
        color:theme.colorsPrimary.highlight,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    formCampEnd:{
        width: 230,
        height: 35,
        fontFamily: theme.fonts.text,
        fontSize: 15,
        backgroundColor: theme.colorsPrimary.cardColor,
        color:theme.colorsPrimary.highlight,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    formCampEndNum:{
        width: 60,
        height: 35,
        fontFamily: theme.fonts.text,
        fontSize: 15,
        backgroundColor: theme.colorsPrimary.cardColor,
        color:theme.colorsPrimary.highlight,
        paddingHorizontal: 5,
        borderRadius: 5
    }

})