import { useState, useEffect,useCallback } from "react"
import  {Text, View, ScrollView, Modal, Image,TouchableOpacity, Alert} from "react-native"
import { Cabecario } from "../../componentes/cabecario"
import { PedidoResumo } from "../../componentes/PedidoResumo"
import { FormClient } from "../../componentes/FormCliente"
import { FormPag } from "../../componentes/FormPag"
import ModalPedido from '../../componentes/ModalPedido'
import { BotaoConcluir } from "../../componentes/botaoConcluir"
import { styles } from "./styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { setPagamentoPix, setPagamentoCartao, setPedidoEnvio, validPix } from "../../servicos/service"
import { theme } from '../../configs';

export default function Pedido({navigation}){
    const [pedidoRealizado, setPedidoRealizado] = useState({});

    const [pedido, setPedido] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [cliente, setCliente] = useState({});
    const [endereco, setEndereco] = useState({});
    const [pagamento, setPagamento] = useState({});
    const [selectedValue, setSelectedValue] = useState('');

    const [qrCode, setQrCode] = useState("");
    const [linkPix, setLinkPix] = useState("");
    const [idPix, setIdPix] = useState("");

    const [validPay, setValidPay] = useState(false);
    const [checkoutPedido, setCheckoutPedido] = useState(false);

    useFocusEffect(
        useCallback(() => {
          setPedido("")
          setValorTotal(0)
          sync()
          return () => {};
        }, [])
    );

    useEffect(() => {
        const timePix = setInterval(checkPix, 5000);
        return () => clearInterval(timePix);
    },[qrCode]);

    const checkPix = async () => {
        if(qrCode != ''){
            let checkPix = await validPix(idPix);
            if (checkPix.data.includes("bem sucedido")){
                criandoPedido(idPix);
                setQrCode('');
                return clearInterval(this);
            }
        }
    }

    const sync = async() => {
        const _pedidoRealizado = await AsyncStorage.getItem("pedidoRealizado");
        if (_pedidoRealizado == null || _pedidoRealizado == {}){
            const _pedido = await AsyncStorage.getItem("Pedido");
            const _cliente = await AsyncStorage.getItem("Cliente");
            const _endereco = await AsyncStorage.getItem("Endereco");
            

            if (_pedido != null && _pedido != undefined){
                setPedido(JSON.parse(_pedido));
                calculaPedido(JSON.parse(_pedido));
            }
            if (_cliente != null && _cliente != undefined){
                setCliente(JSON.parse(_cliente));
            }
            if (_endereco != null && _endereco != undefined){
                setEndereco(JSON.parse(_endereco));
            }
        }else {
            navigation.setOptions({
                tabBarBadge: "..."
            })
            setPedidoRealizado(JSON.parse(_pedidoRealizado));
            setCheckoutPedido(true);
        }
    }

    
    const calculaPedido = (_pedido) => {
        let valor = 0 
        let cont = 0
        if (_pedido.length > 0){
            for (let i = 0; i < _pedido.length; i++) {
                if (_pedido[i].contagem){
                    valor = _pedido[i].preco * _pedido[i].contagem + valor
                    cont = cont + _pedido[i].contagem
                }else{
                    valor = _pedido[i].preco + valor
                    cont ++
                }
                
            } 
        }
        navigation.setOptions({
            tabBarBadge: cont
        })
        setValorTotal(valor)
    }

   
    const updateList = (list) => {
        AsyncStorage.setItem("Pedido", JSON.stringify(list));
        setPedido(list);
        calculaPedido(list);
        
    }
    const updateCliente = (cliente, endereco) => {
        setCliente(cliente);
        setEndereco(endereco);
        AsyncStorage.setItem("Cliente", JSON.stringify(cliente));
        AsyncStorage.setItem("Endereco", JSON.stringify(endereco));
        
        return true;
    }
    const updatePagamento = (_pagamento, tipo) => {
        if (tipo.includes("pix")){
            _pagamento.Valor = valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}).substring(3, valorTotal.length).replaceAll(',', '.');
            setPagamento(_pagamento);
            setSelectedValue(tipo);
            setValidPay(true)
        }else if(tipo.includes("credito")) {
            _pagamento.Valor = valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}).substring(3, valorTotal.length).replaceAll(',', '');
            setPagamento(_pagamento);
            setSelectedValue(tipo);
            setValidPay(true)
        }
       
    }

    const checkout = async () => {
        if (selectedValue.includes("pix")){
            let _info = await setPagamentoPix(pagamento);
            setLinkPix(_info.data.Pix);
            setIdPix(_info.data.id);
            setQrCode(_info.data.QrCode);
            setCheckoutPedido(true);
        } else if(selectedValue.includes("credito")){
            let _info = await setPagamentoCartao(pagamento);
            if(_info.data != undefined){
                if(_info.data.Status.includes("approved")){
                    criandoPedido(_info.data.id);
                }
            }else{
                Alert.alert("Ops: ", "Ocorreu um erro no envio do pagamento, confirme se todos os campos foram preenchidos corretamente.")
            }
        }
    }

    const checkOutModalClose = () => {setCheckoutPedido(false)}

    const processamentoPedido = () => {
        let _pedido = [];
        for (let i = 0; i < pedido.length; i++){
            if (pedido[i].contagem){
                for (j = 0; j < pedido[i].contagem; j++){
                    let __pedido = pedido[i];
                    delete __pedido.contagem
                    _pedido.push(__pedido)
                }
            }else {
                _pedido.push(pedido[i])
            }
        }
        return _pedido;
        

    }
    
    const criandoPedido = async (payID) => {
        var momentoDoPedido = new Date().getTime();;
        const _pedido = {};
        _pedido.nomeCliente = cliente.nome;
        _pedido.cpf = cliente.cpf;
        _pedido.numeroContato = cliente.numeroContato;
        _pedido.endereco = JSON.stringify(endereco);
        _pedido.data = JSON.stringify(momentoDoPedido);
        _pedido.valor = valorTotal;
        _pedido.status = "Confirmado";
        _pedido.payId = payID;
        _pedido.resumoPedido = processamentoPedido();

        let status = await setPedidoEnvio(_pedido);
        if (status.data){
            _pedido.id = status.data;
            setPedidoRealizado(_pedido);
            await AsyncStorage.setItem("pedidoRealizado", JSON.stringify(_pedido));
            setCheckoutPedido(true);
        }
    }
   

    return(
        <View style={styles.container}>
            <Cabecario/>
                <View style={styles.containerText}><Text style={styles.text}>Pedido</Text></View>
            <View>
                <Modal
                        visible={checkoutPedido}
                        transparent={true}
                >
                   <ModalPedido qrCode={qrCode} linkPix={linkPix} selectedValue={selectedValue} pedido={pedidoRealizado} callback={() => checkOutModalClose()} />
                </Modal>
            { valorTotal != 0? <Text style={styles.textTotal}>Total: {valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>: <Text style={styles.textTotal}>Total R$: XXX,XX</Text>}
                <ScrollView nestedScrollEnabled = {true} style={styles.containerBox}>
                    {pedido.length>0?
                    <View>
                    { endereco.cep == undefined ?
                        <View>
                        <Text style={styles.textSub}>Pedido:</Text>
                            <PedidoResumo pedidoList={pedido} callback={updateList}/>
                        <View style={{height:30}}/>
                        <Text style={styles.textSub}>Entrega :</Text>
                        <View>
                            <FormClient callback={updateCliente} cliente_={cliente} endereco_={endereco}/>
                        </View>
                        </View>
                        :
                        <View>
                            <Text style={styles.textSub}>Pagamento :</Text>
                            <View>
                                <FormPag endereco={endereco} cliente={cliente} valor={valorTotal} callback={updatePagamento} />
                            </View>

                            <View style={{marginHorizontal: 30, marginVertical: 30}}>
                                <BotaoConcluir callback={checkout} validPay={validPay}/>
                            </View>
                        </View>
                        }
                    </View>
                    : 
                    <View style={styles.containerTextAviso}><Text style={styles.text}>Ops...{"\n"}Parece que você ainda {"\n"}não fez um pedido.</Text></View>
                    } 
                </ScrollView>
            </View>
            
        </View>
    )
    
}