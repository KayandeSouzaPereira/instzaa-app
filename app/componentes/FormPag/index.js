

import { useEffect, useState } from 'react';
import {View,TextInput,Text,SafeAreaView, ScrollView} from 'react-native'
import Cartao from '../cartao';
import { RadioButton } from 'react-native-paper';
import { BotaoValidar } from '../botaoValidar';
import WebView from 'react-native-webview';
import {styles} from './styles'


export function FormPag({endereco}){
    const [pix, setPix] = useState(false);
    const [selectedValue, setSelectedValue] = useState('pix');
    const [enderecoCob, setEnderecoCob] = useState(true);
    
    const [nascimento, setNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [tokenCard, setTokenCard] = useState(false);
    const [cartao, setCartao] = useState("");
    const [cvc, setCvc] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [bandeira, setBandeira] = useState("");
    const [cartaoValid, setCartaoValid] = useState(false);

    const [cep, setCEP] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [UF, setUF] = useState("");
    const [cidade, setCidade] = useState("");

    const cartaoData = async (data) => {
        if (data.valid){
            await setCartao(data.values.number.replace(/ /g, ''));
            await setCvc(data.values.cvc);
            await setBandeira(data.values.type);
            await setMes(data.values.expiry.substring(0, 2));
            await setAno(data.values.expiry.substring(3, 5));
        }
    }

    useEffect(() => {
        if(ano != ""){
            if (ano.includes("20")){
                console.log(`https://instzaa-landing.vercel.app/card/${cartao}/${cvc}/${bandeira}/${ano}/${mes}`)
                setCartaoValid(true);
            }else{
                setAno("20" + ano)
            }
        }
    },[ano])

    return(
    <SafeAreaView>
       
            <ScrollView nestedScrollEnabled = {true} style={styles.container}>
                <View style={styles.viewCamp}>
                    <Text style={styles.textCamp}>Methodo de Pagamento</Text>
                </View>
                <View style={styles.viewCampOPT}>
                <RadioButton.Group
                    onValueChange={(value) => setSelectedValue(value)}
                    value={selectedValue}
                    size={24}
                    thickness={2} 
                    style={{flexDirection: 'row'}}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="pix" color="blue" />
                    <Text style={styles.textCamp}>PIX</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="debito" color="blue" />
                    <Text style={styles.textCamp}>Debito</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="credito" color="blue" />
                    <Text style={styles.textCamp}>Credito</Text>
                    </View>
                </RadioButton.Group>
                </View>
                {selectedValue!="pix"?
                    <View style={{marginVertical:10, marginHorizontal: 10}}>
                        
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        
                        <RadioButton.Group
                            onValueChange={(value) => setEnderecoCob(value)}
                            value={enderecoCob}
                            size={24}
                            thickness={2} 
                            style={{flexDirection: 'row'}}
                        >
                            <Text style={styles.textCamp}>O Endereço de Cobrança e o mesmo da entrega ?</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value={true} color="blue" />
                            <Text style={styles.textCamp}>Sim</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value={false} color="blue" />
                            <Text style={styles.textCamp}>Não</Text>
                            </View>
                        </RadioButton.Group>
                        </View>
                        <View style={styles.viewCamp}>
                            <Text style={styles.textCampHigh}>Informações para pagamento com cartão.</Text>
                        </View>
                        <View style={styles.viewCampForm}>
                            <TextInput
                                style={styles.formCamp}
                                value={nascimento}
                                onChangeText={setNascimento}
                                keyboardType='phone-pad'
                                placeholder='A data de nascimento'
                                returnKeyType="next"
                            />
                        </View>
                        <View style={styles.viewCampForm}>
                            <TextInput
                                style={styles.formCamp}
                                value={email}
                                onChangeText={setEmail}
                                placeholder='Email'
                                returnKeyType="next"
                            />
                        </View>
                        <View style={styles.viewCampForm}>
                            <Text style={styles.textCampHigh}>Adicione o cartão para o pagamento.</Text>
                        </View>
                        
                {
                    tokenCard ? 
                    <View style={{width: 380, height: 250}}>
                        <WebView
                             source={{ uri: `https://instzaa-landing.vercel.app/card/${cartao}/${cvc}/${bandeira}/${ano}/${mes}`}}
                             javaScriptEnabled={true}
                             originWhitelist={['*']}
                             allowFileAccess={true}
                             allowFileAccessFromFileURLS={true}
                             allowUniversalAccessFromFileURLs={true}
                             onMessage={(event) => {console.log(event.nativeEvent.data);}}  
                        />
                    </View>
                    : 
                    <View style={{width: 380, height: 500}}>
                        <Cartao callback={cartaoData}/>
                        <BotaoValidar valid={cartaoValid} callback={() => setTokenCard(true)}/>
                    </View>

                }
                    </View>
                        :<></>
                }
                
           </ScrollView>    
        </SafeAreaView>
    )
}