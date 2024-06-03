import {Text, View, TouchableOpacity, Image} from 'react-native';
import { BotaoWhats } from '../botaoWhats';
import { BotaoTelefone } from '../botaoTelefone';
import { BotaoEmail } from '../botaoEmail';
import {styles} from './styles'
import { EvilIcons } from '@expo/vector-icons';

export function Box(){
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
                    R.Padre Natanel, 123, CEP: 387660-123,
                    Jardim Florido.
                </Text>
            </View>
            <View style={styles.containerBotao}>
                <BotaoWhats numero={"11987955628"} titulo={"WhatsApp"}/>
                <BotaoTelefone numero={"11987955628"} titulo={"Telefone"}/>
                <BotaoEmail email={"kayandesouzapereira@hotmail.com"} titulo={"Email"}/>
           </View>
        </View>
    )

}