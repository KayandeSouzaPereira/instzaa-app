import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles'
import { MaterialIcons } from '@expo/vector-icons';

export function BotaoConcluir({callback, validPay}){
    return(
        <TouchableOpacity onPress={() => {if(validPay){callback()}else{Alert.alert("Atenção !", "É necessário completar os dados de compra para realizar o pedido.")}}} style={styles.container}>
           <View style={styles.containerText}>
           <MaterialIcons style={{ top:5}} name="delivery-dining" size={45} color="white" />
           <Text style={styles.text}>Pagamento</Text>
            </View> 
        </TouchableOpacity>
    )

}