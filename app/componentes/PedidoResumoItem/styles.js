import { StyleSheet } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        width:380,
        height:300,
        backgroundColor: theme.colorsPrimary.overlay,
        color: theme.colorsPrimary.cardColor,
        flexDirection: 'column',
    },
    containerItem:{
        flex: 1,
        width:370,
        height:150,
        marginVertical: 10,
        marginHorizontal: 5,
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
    cont:{
        width: 30,
        backgroundColor: theme.colorsPrimary.cardColor,
        fontSize: 20,
        marginHorizontal: 5,
        bottom: 5
    },
    controleItemPedido:{
        marginTop: 30,
        width: 200,
        flexDirection:'row-reverse'
    }
})