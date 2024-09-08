import { StyleSheet } from "react-native";
import { theme } from "../../configs";

export const style = StyleSheet.create({
    containerAvaliacaoGroup:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    containerAvaliacao: {
        width: 400,
        marginVertical: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonAvalicao:{
        width: 280,
        height: 80,
        borderRadius: 10,
        backgroundColor: theme.colorsPrimary.primary80,
        justifyContent: 'center'
    },
    textAvalicao:{
        textAlign: 'center',
        color: theme.colorsPrimary.cardColor,
        fontSize: 16,
        fontFamily: theme.fonts.subtitle
    }

})