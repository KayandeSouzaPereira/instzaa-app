import { StyleSheet } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        width:380,
        height:300,
        backgroundColor: theme.colorsPrimary.secondary120,
        color: theme.colorsPrimary.cardColor,
        flexDirection: 'column',
        borderRadius: 20
    },
    containerItem:{
        flex: 1,
        width:350,
        height:150,
        marginVertical: 10,
        marginHorizontal: 25,
        backgroundColor: theme.colorsPrimary.secondary100,
        borderRadius: 15,
        flexDirection: 'row',
    },
    text:{
        color: theme.colorsPrimary.cardColor,
        fontSize: 15,
        marginHorizontal: 20
    },
    trash:{
        color: theme.colorsPrimary.cardColor,
        fontSize: 20,
    },
    controleItemPedido:{
        marginTop: 30,
        width: 230,
        flexDirection:'row-reverse'
    }
    
})