import { useState } from 'react';
import {Text, View, TouchableOpacity, Image, Alert} from "react-native";
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

export default function ModalPedido({qrCode, linkPix, credito, callbackPedido}){

    const copyToClipboardPix = async () => {
        await Clipboard.setStringAsync(linkPix);
        Alert.alert("Pix:", "link copiado com sucesso !");
    };

    return (
        <View  style={{backgroundColor:'rgba(52, 52, 52, 0.7)', flex: 1, justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={() => callbackPedido()} style={{flex:1,width:30,height:30}}>
                            <Entypo style={{flex:1, top:30}} name="cross" size={30} color={theme.colorsPrimary.cardColor} />
                </TouchableOpacity>
                <View style={styles.containerModal}>
                {   qrCode != '' ?
                    <View style={{width: 380, height: 500, alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                        <View ><Text style={styles.textPixTitle}>PIX</Text></View>
                        <Image style={{width: 250, height: 250,marginHorizontal: 5,resizeMode: 'cover', marginTop:15, backgroundColor: 'white'}}  source={{uri: qrCode}}/>
                        <View><Text style={styles.textPix}>Pague com QrCode ou Copie o link :{"\n"}{"\n"}<Text style={styles.textPixLink}>{linkPix}</Text></Text></View>
                        <TouchableOpacity onPress={() => copyToClipboardPix()} style={{flex:1,width:30,height:30}}>
                            <MaterialIcons style={{flex:1, top:30}} name="content-copy" size={30} color={theme.colorsPrimary.cardColor} />
                        </TouchableOpacity>
                    </View>
                    :
                    credito ? 
                    <View style={{width: 380, height: 500, alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                        <View ><Text style={styles.textPixTitle}>Pagamento Credito</Text></View>
                        <AntDesign style={{marginTop:20}} name="checkcircleo" size={180} color="green" />
                        <View style={{width: 280,marginTop:50}}><Text style={styles.textPix}>Em breve iniciaremos o preparo do seu pedido !</Text></View>
                    </View>
                    :
                    <View style={{width: 380, height: 500, alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                        <View ><Text style={styles.textPixTitle}>Aguarde o Procesamento</Text></View>
                        <AntDesign style={{marginTop:20}} name="checkcircleo" size={180} color="green" />
                        <View style={{width: 280,marginTop:50}}><Text style={styles.textPix}>Em breve iniciaremos o preparo do seu pedido !</Text></View>
                    </View>
                }
                </View>
        </View>
    )
}