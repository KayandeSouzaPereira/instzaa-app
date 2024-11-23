import { StyleSheet } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        width:380,
        height:500,
        backgroundColor: theme.colorsPrimary.formBackGround,
        color: theme.colorsPrimary.formText,
        flexDirection: 'column',
        borderRadius: 20
    },
    viewEndereco:{
        flexDirection:'row',
        marginHorizontal:42,
        
    },
    viewCamp:{
        width:'100%',marginHorizontal:50, marginVertical:7
    },
    viewCampEnd:{
        width:'55%',marginVertical:5,marginLeft:7,marginRight:50
    },
    viewCampEndNum:{
        width:'20%',marginVertical:5, marginHorizontal:20,
    },
    
    textCamp:{
        color: theme.colorsPrimary.formText,
        fontFamily: theme.fonts.subtitle,
        fontSize: 20
    },
    textCampHighlight:{
        color: theme.colorsPrimary.formText,
        fontFamily: theme.fonts.subtitle,
        fontSize: 14,
        marginVertical: 5
    },
    textCampHighlightE:{
        color: theme.colorsPrimary.formText,
        fontFamily: theme.fonts.subtitle,
        fontSize: 14,
        marginVertical: 5,
        marginHorizontal: 45
    },

    formCamp:{
        width: 280,
        height: 35,
        fontFamily: theme.fonts.text,
        fontSize: 15,
        backgroundColor: theme.colorsPrimary.formTextInput,
        color:theme.colorsPrimary.formText,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    formCampEnd:{
        width: 220,
        height: 35,
        fontFamily: theme.fonts.text,
        fontSize: 15,
        backgroundColor: theme.colorsPrimary.formTextInput,
        color:theme.colorsPrimary.formText,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    formCampEndNum:{
        width: 50,
        height: 35,
        fontFamily: theme.fonts.text,
        fontSize: 15,
        backgroundColor: theme.colorsPrimary.formTextInput,
        color:theme.colorsPrimary.formText,
        paddingHorizontal: 5,
        borderRadius: 5
    }

})