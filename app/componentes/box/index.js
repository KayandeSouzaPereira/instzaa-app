import {Text, View, TouchableOpacity, Image} from 'react-native';
import { BotaoWhats } from '../botaoWhats';
import { BotaoTelefone } from '../botaoTelefone';
import { BotaoEmail } from '../botaoEmail';
import {styles} from './styles'
import { EvilIcons } from '@expo/vector-icons';

export function Box({endereco,numero,email}){
    return(
        <View style={styles.container}>
            <View style={styles.containerText}>
                <View style={styles.containerTextTitleLoc}>
                <EvilIcons style={{top:5, marginRight:15}} name="location" size={40} color="white" />
                <Text style={styles.titulo}>
                    Endereço
                </Text>
                </View>
                <Text style={styles.descricao}>
                   {endereco}
                </Text>
            </View>
            <View style={styles.containerBotao}>
                <BotaoWhats numero={numero} titulo={"WhatsApp"}/>
                <BotaoTelefone numero={numero} titulo={"Telefone"}/>
                <BotaoEmail email={email} titulo={"Email"}/>
           </View>
        </View>
    )

}