import { StyleSheet } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        width:380,
        height:500,
        backgroundColor: theme.colorsPrimary.overlay,
        color: theme.colorsPrimary.cardColor,
        flexDirection: 'column',
    },
    containerPix:{
        flex: 1,
        width:380,
        height:300,
        backgroundColor: theme.colorsPrimary.overlay,
        color: theme.colorsPrimary.cardColor,
        flexDirection: 'column',
    },
    viewEndereco:{
        flexDirection:'row',
        marginHorizontal:22,
    },
    viewCamp:{
        width:'100%',marginHorizontal:20, marginVertical:15
    },
    viewCampEnd:{
        width:'55%',marginVertical:5,marginLeft:0,marginRight:50
    },
    viewCampEndNum:{
        width:'20%',marginVertical:5, marginHorizontal:20,
    },
    viewCampForm:{
        width:'100%',marginHorizontal:30, marginVertical:10
    },
    viewCampFormDate:{
        width:'83%',marginHorizontal:30, marginVertical:10, backgroundColor: theme.colorsPrimary.cardColor
    },
    viewCampOPT:{
        width:'100%',marginVertical:5,marginHorizontal:7,flexDirection:'column'
    },
    viewCampAviso:{
        width:'80%',marginHorizontal:40, marginVertical:40
    },
    
    textCamp:{
        color: theme.colorsPrimary.cardColor,
        fontFamily: theme.fonts.subtitle,
        fontSize: 18
    },
    textCampHigh:{
        color: theme.colorsPrimary.cardColor,
        fontFamily: theme.fonts.text,
        fontSize: 17
    },
    textCampAviso:{
        color: theme.colorsPrimary.cardColor,
        fontFamily: theme.fonts.text,
        fontSize: 15,
        textAlign: 'center'
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
        width: 55,
        height: 35,
        fontFamily: theme.fonts.text,
        fontSize: 15,
        backgroundColor: theme.colorsPrimary.cardColor,
        color:theme.colorsPrimary.highlight,
        paddingHorizontal: 5,
        borderRadius: 5
    }

})