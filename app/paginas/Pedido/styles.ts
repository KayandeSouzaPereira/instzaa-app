import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: theme.colorsPrimary.primary,
        flexDirection: 'column',
    },
    containerBox: {
        width: 600,
        height: 300,
        paddingHorizontal:20,
        backgroundColor: theme.colorsPrimary.primary,
    },
    containerText: {
        width: 600,
        height: 150,
        paddingHorizontal: 30,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: theme.colorsPrimary.primary,
    },
    text: {
        fontFamily: theme.fonts.subtitle2,
        fontSize: 25,
        paddingVertical: 20,
        right: 80,
        textAlign: 'center',
        color: 'white'
    }
    
})