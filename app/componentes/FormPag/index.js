

import { useEffect, useState, useRef  } from 'react';
import {View,TextInput,Text,SafeAreaView, ScrollView} from 'react-native'
import Cartao from '../cartao';
import { RadioButton } from 'react-native-paper';
import { BotaoValidar } from '../botaoValidar';
import WebView from 'react-native-webview';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useForm, Controller } from "react-hook-form"
import {styles} from './styles'
import { getEndereco, getEmpresa } from '../../servicos/service';

import 'dayjs/locale/pt-br';



export function FormPag({endereco, cliente, valor, callback}){
    const scrollRef = useRef();

    const [pagamento, setPagamento] = useState({});

    const [ativo, setAtivo] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [enderecoCob, setEnderecoCob] = useState(true);
    
    const [nascimento, setNascimento] = useState(dayjs());
    const [email, setEmail] = useState('');
    const [tokenCard, setTokenCard] = useState(false);
    const [tokenConta, setTokenConta] = useState("");
    const [cartaoValid, setCartaoValid] = useState(false);
    const [paymentToken, setPaymentToken] = useState(""); 

    const getDadosEmpresa = async () => {
        let ret = await getEmpresa();
        setTokenConta(ret.data.idCont);
    }

    getDadosEmpresa();

    const {control, handleSubmit, setValue, getValues, formState: {errors},
    } = useForm({
        defaultValues: {
            nascimento: dayjs(),
            email: "",
            tokenConta: "",
            cartao: "",
            cvc: "",
            mes: "",
            ano: "",
            bandeira: "",
            paymentToken: "",
            cep: "",
            rua: "",
            numero: "",
            complemento: "",
            bairro: "",
            uf: "",
            cidade: ""
        },
    })

    

    const cartaoData = async (data) => {
        if (data.valid){
            setValue("cartao", data.values.number.replace(/ /g, ''));
            setValue("cvc",data.values.cvc);           
            setValue("bandeira",data.values.type)
            setValue("mes",data.values.expiry.substring(0, 2))
            setValue("ano",data.values.expiry.substring(3, 5))
            setCartaoValid(true)
        }
    }
    async function getEnderecodata() {
        const reqCEP = await getEndereco(cep);
        const endereco = reqCEP.data;
        setValue("rua", endereco.logradouro)
        setValue("bairro", endereco.bairro)
        setValue("uf", endereco.uf)
        setValue("cidade", endereco.localidade)
        return endereco;
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
        }else if(selectedValue.includes("credito")) {
            onPressTouch()
        }
    },[selectedValue])

    useEffect(() => {
        if(getValues("ano") != ""){
            if (getValues("ano").includes("20")){
                setCartaoValid(true);
            }else{
                setValue("ano", "20" + getValues("ano"))
            }
        }
    },[getValues("ano")])

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
            _pagamento.Email = getValues("email");
            _pagamento.DataDeNascimento = getValues("nascimento");

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

            console.log(_pagamento)
            setPagamento(_pagamento);
        }
    },[paymentToken])

    const onPressTouch = () => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      }

    return(
    <SafeAreaView>
            <ScrollView nestedScrollEnabled = {true} style={styles.container} ref={scrollRef}>
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
                            <Controller
                                control={control}
                                rules={{
                                required: enderecoCob,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.formCamp}
                                        onBlur={() => {onBlur; let end = getEnderecodata(value);}}
                                        onChangeText={onChange}
                                        value={value}
                                        keyboardType='phone-pad'
                                        placeholder='Seu CEP sem Traço'
                                        returnKeyType="next"
                                        placeholderTextColor='#ffffff'
                                        color = '#ffffff'
                                    />
                                )}
                                name="cep"
                            />
                            {errors.cep &&<Text style={styles.textCampHighlight}>Este campo e necessário para identificação.</Text>}
                            </View>
                            <View style={styles.viewEndereco}>
                                <View style={styles.viewCampEnd}>
                                <Controller
                                    control={control}
                                    rules={{
                                    required: enderecoCob,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.formCampEnd}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder='Endereço'
                                            returnKeyType="next"
                                            placeholderTextColor='#ffffff'
                                            color = '#ffffff'
                                        />
                                    )}
                                    name="rua"
                                />
                                {errors.rua &&<Text style={styles.textCampHighlight}>Este campo e necessário para identificação.</Text>}
                                </View>
                                <View style={styles.viewCampEndNum}>
                                <Controller
                                    control={control}
                                    rules={{
                                    required: enderecoCob,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.formCampEndNum}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='Nº'
                                        returnKeyType="next"
                                        placeholderTextColor='#ffffff'
                                        color = '#ffffff'
                                    />
                                    )}
                                    name="numero"
                                />
                                {errors.numero &&<Text style={styles.textCampHighlight}>Este campo e necessário para identificação.</Text>}
                                </View>
                            </View>
                            <View style={styles.viewCamp}>
                            <Controller
                                    control={control}
                                    rules={{
                                    required: false,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.formCamp}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='Complemento'
                                        returnKeyType="next"
                                        placeholderTextColor='#ffffff'
                                        color = '#ffffff'
                                    />
                                )}
                                name="complemento"
                            />
                            </View>
                            <View style={styles.viewCamp}>
                            <Controller
                                control={control}
                                rules={{
                                required: enderecoCob,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.formCamp}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='Bairro'
                                    returnKeyType="next"
                                    placeholderTextColor='#ffffff'
                                    color = '#ffffff'
                                />
                            )}
                            name="bairro"
                        />
                        {errors.bairro &&<Text style={styles.textCampHighlight}>Este campo e necessário para identificação.</Text>}
                        </View>
                        <View style={styles.viewCamp}>
                            <Controller
                                control={control}
                                rules={{
                                required: enderecoCob,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.formCamp}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='Estado'
                                    returnKeyType="next"
                                    placeholderTextColor='#ffffff'
                                    color = '#ffffff'
                                />
                            )}
                            name="uf"
                            />
                            {errors.uf &&<Text style={styles.textCampHighlight}>Este campo e necessário para identificação.</Text>}
                        </View>
                        <View style={styles.viewCamp}>
                            <Controller
                                control={control}
                                rules={{
                                required: enderecoCob,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.formCamp}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='Cidade'
                                    placeholderTextColor='#ffffff'
                                    color = '#ffffff'
                                />
                            )}
                            name="cidade"
                            />
                            {errors.cidade &&<Text style={styles.textCampHighlight}>Este campo e necessário para identificação.</Text>}
                        </View>
                        </View>
                        }
                            <View style={styles.viewCamp}>
                                <Text style={styles.textCampHigh}>Informações para pagamento com cartão.</Text>
                            </View>
                            <View style={styles.viewCampForm}>
                            <Controller
                                control={control}
                                rules={{
                                required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.formCamp}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='Email'
                                        returnKeyType="next"
                                        placeholderTextColor='#ffffff'
                                        color = '#ffffff'
                                    />
                                )}
                                name="email"
                                />
                                {errors.email &&<Text style={styles.textCampHighlight}>Este campo e necessário para identificação.</Text>}
                            </View>
                            <View style={styles.viewCampFormDate}>
                              
                                <Text style={{marginHorizontal: 30}}>Selecione a data do seu nascimento.</Text>
                                <Controller
                                    control={control}
                                    rules={{
                                    required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                    <DateTimePicker
                                            mode="single"
                                            locale={'pt-br'}
                                            initialView={'year'}
                                            date={value}
                                            onChange={(params) => {onChange(params.date.format('YYYY-MM-DD'))}}
                                            minDate={dayjs('1950-01-01')}
                                            maxDate={dayjs('2008-01-01')}
                                            placeholderTextColor='#ffffff'
                                            color = '#ffffff'
                                        />
                                    )}
                                    name="nascimento"
                                    />
                                    {errors.nascimento &&<Text style={styles.textCampHighlight}>Este campo e necessário para identificação.</Text>}
                            </View>
                            
                            <View style={styles.viewCampForm}>
                                <Text style={styles.textCampHigh}>Adicione o cartão para o pagamento.</Text>
                            </View>
                        
                   
                {
                    tokenCard ? 
                    <View style={{width: 380, height: 250}}>
                        <WebView
                             source={{ uri: `https://instzaa-landing.vercel.app/card/${getValues("cartao")}/${getValues("cvc")}/${getValues("bandeira")}/${getValues("ano")}/${getValues("mes")}/${tokenConta}`}}
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
                        <Controller
                                    control={control}
                                    rules={{
                                    required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                    <Cartao callback={cartaoData}/>
                                )}
                                name="cartao"
                                />
                                {errors.cartao &&<Text style={styles.textCampHighlight}>Este campo e necessário para identificação.</Text>}
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