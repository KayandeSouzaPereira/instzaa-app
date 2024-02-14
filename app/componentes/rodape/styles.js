import { StyleSheet } from 'react-native';
import { theme } from '../../configs';

export const styles = StyleSheet.create({
    container:{
        width: 600,
        height: 100,
        
        right: 10,
        backgroundColor: theme.colorsPrimary.highlight,
        alignContent: 'flex-start',
    },
    containerIcones:{
        left:35, 
        top: 10, 
        display: 'flex', 
        flexDirection: "row"
    },
    Icones:{
        marginHorizontal: 40
    }
})