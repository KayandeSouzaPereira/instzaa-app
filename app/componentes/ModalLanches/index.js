import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, Alert, ScrollView, FlatList } from "react-native";
import { theme } from "../../configs";
import { getCardapioLanches } from "../../servicos/service";
import BotaoPao from "../botaoPao";
import BotaoIngredientes from "../botaoIngredientes";
import mockSandwich from "../../paginas/Cardapio/mock"

export default function ModalLanches({callback}){
    const [lanche, setLanche] = useState([]);
    const [itens, setItens] = useState({});
    const [component, setComponent] = useState("")
    const [componentIngredientes, setComponentIngredientes] = useState("")
    const [paoSelected, setPaoSelected] = useState(false);
    const [pao, setPao] = useState({});
    const [total, setTotal] = useState(0);
    
    
    useEffect( () => {
        async function data() {
            _itens = await getCardapioLanches();
            setItens(_itens.data);
        }
        data();
    },[])

    useEffect(() => {
        if(itens.length > 0 ){
            filtroCategoria()
        }
    }, [itens]) 

    useEffect(() => {
        calculaTotal(lanche)
    },[lanche])

    function addComponenteLanche(item){
        _item = item
        const _itens = lanche;
        if(_item.categoria == "Pães"){
            setPaoSelected(true);
            setPao(_item)
        } else {
             _item.imagem = ""
        }
        _itens.push(_item);
        setLanche(_itens);
        calculaTotal(_itens)
    }
    
    function filtroCategoria(){
        let _lista = itens
        let _outros = []
        let _paes = []

        _lista.forEach((i) => {
            if(i.categoria == "Pães"){_paes.push(i)}
            else{_outros.push(i)}
        })

        const listaPaes = montagemLista(_paes, true);
        const listaIngrediente = montagemLista(_outros, false);
        
        setComponent(listaPaes);
        setComponentIngredientes(listaIngrediente);
    }

    function montagemLista(lista, isPao){
        if(isPao){
            return (<FlatList
                data={lista}
                keyExtractor={item => item.idCardapio}
                renderItem={({item}) => (
                    getItemLanchePao(item)
                ) 
            }
            contentContainerStyle={{paddingVertical: 10}}
            showsHorizontalScrollIndicator={false}
        />)
        }else{
        return (<FlatList
                data={lista}
                keyExtractor={item => item.idCardapio}
                renderItem={({item}) => (
                    getItemLanche(item)
                ) 
            }
            contentContainerStyle={{paddingVertical: 10}}
            showsHorizontalScrollIndicator={false}
        />)}

    }

    function updateComponentes(id, cont){
        let _lanche = lanche;
        for (let i = 0; i < _lanche.length; i++) {
            if (_lanche[i].id === id){
                _lanche[i].contagem = cont;
            }
        }
        setLanche(_lanche)
        calculaTotal(_lanche)
    }

    function calculaTotal(_lanche) {
        let valor = 0;
        if(_lanche.length > 0){
            _lanche.forEach((item) => {
                if(item.contagem){
                    valor = item.preco * item.contagem + valor
                }
                else{valor = item.preco + valor}
            })
        }
        setTotal(valor);
    }


    function getItemLanche(item){ 
        return (
            <View style={{flexDirection:"row", marginVertical: 10}}>
                <View style={{flexDirection: "row", width: 200, marginHorizontal: 20, alignItems: "center"}}>
                    <Image style={{width: 150, height: 150,borderRadius: 15, marginHorizontal: 10,resizeMode: 'cover'}} source={{uri: item.imagem}}/>
                    <View style={{flexDirection:"column", marginHorizontal: 20}}>
                        <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 12, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>{item.descricao}</Text>
                        <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>{item.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                        <BotaoIngredientes callback={() => addComponenteLanche(item)} updateComponentes={updateComponentes} idItem={item.id}/>
                    </View>
                </View>
            </View>
        )
    }

    function getItemLanchePao(item){ 
        return (
            <View style={{flexDirection:"row", marginVertical: 10}}>
                <View style={{flexDirection: "row", width: 200, marginHorizontal: 20, alignItems: "center"}}>
                    <Image style={{width: 150, height: 150,borderRadius: 15, marginHorizontal: 10,resizeMode: 'cover'}} source={{uri: item.imagem}}/>
                    <View style={{flexDirection:"column", marginHorizontal: 20}}>
                        <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 12, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>{item.descricao}</Text>
                        <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>{item.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                        <BotaoPao callback={() => addComponenteLanche(item)}/>
                    </View>
                </View>
            </View>
        )
    }

    function sendLanche(){
        let _descricao = [];

        lanche.forEach((item) => {
            _descricao.push(item.nome)
        })
        let _lanche = {
            "id": 152,
            "categoria": "Lanche",
            "nome": "Lanche",
            "descricao": JSON.stringify(_descricao),
            "itemLanche": false,
            "itemLanches": [],
            "promocao": false,
            "destaque": false,
            "preco": total,
            "imagem": mockSandwich.imagem
        }

        callback(_lanche)
    }

    return (
        <View style={{backgroundColor:'rgba(52, 52, 52, 0.7)', flex: 1, justifyContent:'center', alignItems:'center', bottom: 0, height: 2000}}>
            <View style={{width: 400, height: 800, alignContent: "center", justifyContent: "center", alignItems: "center", bottom: 150, backgroundColor: theme.colorsPrimary.formBackGround}}>
                <ScrollView nestedScrollEnabled={true} style={{width: 380, alignContent: "center"}}>
                <View style={{marginVertical: 10}}><Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign: "center"}}>Monte seu lanche</Text></View>
                <View style={{marginVertical: 10}}>
                
                {
                    paoSelected==false ?
                    <View>
                        <View style={{marginVertical: 10}}><Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign: "center"}}>Selecione seu pão</Text></View>
                        {component}
                    </View>
                    :
                    <View>
                        <View style={{marginVertical: 10}}><Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign: "center"}}>Pão Selecionado</Text></View>
                         <View style={{flexDirection:"row", marginVertical: 10}}>
                            <View style={{flexDirection: "row", width: 200, marginHorizontal: 20, alignItems: "center"}}>
                                <Image style={{width: 150, height: 150,borderRadius: 15, marginHorizontal: 10,resizeMode: 'cover'}} source={{uri: pao.imagem}}/>
                                <View style={{flexDirection:"column", marginHorizontal: 20}}>
                                    <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 12, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>{pao.descricao}</Text>
                                    <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>{pao.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                }
                </View>
                <View style={{marginVertical: 10}}><Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign: "center"}}>Turbine seu lanche !!!</Text></View>
                {componentIngredientes}
                <View></View>
                <View style={{marginVertical: 10}}>
                    <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.title2, textAlign: "Left", marginHorizontal: 20}}>Total : {total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                </View>
                <TouchableOpacity onPress={() => sendLanche()} style={{width: 200, height:50, backgroundColor: theme.colorsPrimary.highlight, marginHorizontal: 100, marginVertical: 30, justifyContent:'center', alignItems:'center', borderRadius: 10}}>
                    <Text style={{fontSize: 20, color: theme.colorsPrimary.cardColor}}>Concluir</Text>
                </TouchableOpacity>
                <View style={{height: 150}}/>
                </ScrollView>
            </View>
        </View>
    )


}