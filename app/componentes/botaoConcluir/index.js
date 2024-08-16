import {Text, View, TouchableOpacity, Image, Linking} from 'react-native';
import {styles} from './styles'
import { MaterialIcons } from '@expo/vector-icons';

export function BotaoConcluir({callback, validPay}){

    return(
        <TouchableOpacity onPress={() => {if(validPay){callback()}}} style={validPay? styles.container : styles.containerOff}>
           <View style={styles.containerText}>
           <MaterialIcons style={{top:5}} name="delivery-dining" size={45} color="white" />
           { validPay? <Text style={styles.text}>Pagamento</Text> : <Text style={styles.text}>...</Text>}
            </View> 
        </TouchableOpacity>
    )

}