

import { useEffect, useState } from 'react';
import {View,TextInput,Text,SafeAreaView, ScrollView} from 'react-native'
import Cartao from '../cartao';
import { RadioButton } from 'react-native-paper';
import { BotaoValidar } from '../botaoValidar';
import WebView from 'react-native-webview';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {styles} from './styles'
import { getEndereco } from '../../servicos/service';

import 'dayjs/locale/pt-br';



export function FormPag({endereco, cliente, valor, callback}){
    const [pagamento, setPagamento] = useState({});

    const [ativo, setAtivo] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [enderecoCob, setEnderecoCob] = useState(true);
    
    const [nascimento, setNascimento] = useState(dayjs());
    const [email, setEmail] = useState('');
    const [tokenCard, setTokenCard] = useState(false);
    const [cartao, setCartao] = useState("");
    const [cvc, setCvc] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [bandeira, setBandeira] = useState("");
    const [cartaoValid, setCartaoValid] = useState(false);
    const [paymentToken, setPaymentToken] = useState(""); 

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
    async function getEnderecodata() {
        const reqCEP = await getEndereco(cep);
        const endereco = reqCEP.data;
        setBairro(endereco.bairro)
        setRua(endereco.logradouro)
        setUF(endereco.uf)
        setCidade(endereco.localidade)
    }

    useEffect(() => {
        if(pagamento.Cpf != undefined && valor > 0){
            callback(pagamento, selectedValue)
        }
    },[pagamento, valor])

    useEffect(()=>{
        if (selectedValue.includes('pix')){
            _pagamento = {}
            _pagamento.Nome = cliente.nome;
            _pagamento.Cpf = cliente.cpf;
            _pagamento.Valor = valor;
            setPagamento(_pagamento);
        }
    },[selectedValue])

    useEffect(() => {
        if(ano != ""){
            if (ano.includes("20")){
                setCartaoValid(true);
            }else{
                setAno("20" + ano)
            }
        }
    },[ano])

    useEffect(() => {
        if (cliente.cpf != undefined && endereco.cep != undefined && ativo == false){
            setAtivo(true);
        }
    },[cliente, endereco])

    useEffect(() => {
        if (paymentToken != ""){
            _pagamento = {}
            _pagamento.Nome = cliente.nome;
            _pagamento.Telefone = cliente.numeroContato;
            _pagamento.Cpf = cliente.cpf;
            _pagamento.Valor = valor;
            _pagamento.PaymentToken = paymentToken;
            _pagamento.Email = email;
            _pagamento.DataDeNascimento = nascimento;

            if (enderecoCob == false){
                _pagamento.Rua = rua
                _pagamento.NumeroEndereco = numero
                _pagamento.Bairro = bairro
                _pagamento.Cep = cep;
                _pagamento.Cidade = cidade;
                _pagamento.Estado = UF;
            }else if (enderecoCob == true){
                _pagamento.Rua = endereco.rua
                _pagamento.NumeroEndereco = endereco.numero
                _pagamento.Bairro = endereco.bairro
                _pagamento.Cep = endereco.cep;
                _pagamento.Cidade = endereco.cidade;
                _pagamento.Estado = endereco.uf;
            }
            setPagamento(_pagamento);
        }
    },[paymentToken])

    return(
    <SafeAreaView>
            { ativo == true ?
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
                    <RadioButton value="credito" color="blue" />
                    <Text style={styles.textCamp}>Credito</Text>
                    </View>
                </RadioButton.Group>
                </View>
                {selectedValue!="pix" && selectedValue!="" ?
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
                        { enderecoCob? <></>:
                        <View style={{marginLeft:10}}>
                            <View style={styles.viewCamp}>
                                <Text style={styles.textCamp}>Endereço cadastrado do cartão</Text>
                            </View>
                            <View style={styles.viewCamp}>
                                <TextInput
                                    style={styles.formCamp}
                                    value={cep}
                                    onChangeText={setCEP}
                                    onBlur={() => getEnderecodata()}
                                    keyboardType='phone-pad'
                                    placeholder='Seu CEP sem Traço'
                                    returnKeyType="next"
                                />
                            </View>
                            <View style={styles.viewEndereco}>
                                <View style={styles.viewCampEnd}>
                                    <TextInput
                                        style={styles.formCampEnd}
                                        value={rua}
                                        onChangeText={setRua}
                                        placeholder='Endereço'
                                        returnKeyType="next"
                                    />
                                </View>
                                <View style={styles.viewCampEndNum}>
                                    <TextInput
                                        style={styles.formCampEndNum}
                                        value={numero}
                                        onChangeText={setNumero}
                                        placeholder='Nº'
                                        returnKeyType="next"
                                    />
                                </View>
                            </View>
                            <View style={styles.viewCamp}>
                                <TextInput
                                    style={styles.formCamp}
                                    value={complemento}
                                    onChangeText={setComplemento}
                                    placeholder='Complemento'
                                    returnKeyType="next"
                                />
                            </View>
                            <View style={styles.viewCamp}>
                                <TextInput
                                    style={styles.formCamp}
                                    value={bairro}
                                    onChangeText={setBairro}
                                    placeholder='Bairro'
                                    returnKeyType="next"
                                />
                            </View>
                            <View style={styles.viewCamp}>
                                <TextInput
                                    style={styles.formCamp}
                                    value={UF}
                                    onChangeText={setUF}
                                    placeholder='Estado'
                                    returnKeyType="next"
                                />
                            </View>
                            <View style={styles.viewCamp}>
                                <TextInput
                                    style={styles.formCamp}
                                    value={cidade}
                                    onChangeText={setCidade}
                                    placeholder='Cidade'
                                />
                            </View>
                        </View>
                        }
                            <View style={styles.viewCamp}>
                                <Text style={styles.textCampHigh}>Informações para pagamento com cartão.</Text>
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
                            <View style={styles.viewCampFormDate}>
                               {/*  <TextInput
                                    style={styles.formCamp}
                                    value={nascimento}
                                    onChangeText={setNascimento}
                                    maxLength={8}
                                    keyboardType='phone-pad'
                                    placeholder='A data de nascimento so em numeros'
                                    returnKeyType="next"
                                /> */}
                                <Text style={{marginHorizontal: 30}}>Selecione a data do seu nascimento.</Text>
                                <DateTimePicker
                                        mode="single"
                                        locale={'pt-br'}
                                        initialView={'year'}
                                        date={nascimento}
                                        onChange={(params) => {setNascimento(params.date.format('YYYY-MM-DD'))}}
                                        minDate={dayjs('1950-01-01')}
                                        maxDate={dayjs('2008-01-01')}
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
                             onMessage={(event) => {setPaymentToken(event.nativeEvent.data);}}  
                             style={{width: 350, height: 230, marginHorizontal: 5}}
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
           :
           <ScrollView nestedScrollEnabled = {true} style={styles.containerPix}>
           <View style={styles.viewCampAviso}>
                   <Text style={styles.textCampAviso}>E necessário preencher os campos da entrega para seguir com essa etapa.</Text>
               </View>
       </ScrollView>
        }  
        </SafeAreaView>
    )
}