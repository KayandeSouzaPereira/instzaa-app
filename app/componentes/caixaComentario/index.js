import { useEffect, useState } from "react";
import { Text, View, TextInput, FlatList, Alert, Image, ScrollView, TouchableOpacity } from "react-native";
import { theme } from "../../configs";
import { getComentarios, setComentario } from "../../servicos/service";
import { style } from "./styles";
import AvaliacaoEstrelas from "../AvaliacaoEstrelas";
import AvaliacaoForm from "../AvaliacaoForm";
import ItemReview from "../ItemReview";

export default function CaixaComentario({ id, comentario, itemCardapios }) {
  const [listaComentarios, setListaComentarios] = useState({});
  const [comentarioEditado, setComentarioEditado] = useState();
  const [comentarioTexto, setComentarioTexto] = useState();
  const [listPedidos, setListaPedidos] = useState(listaItensPedido);
  const [itemCardapioCustom, setItemCardapioCustom] = useState([]);

  useEffect(() => {
    async function data() {
      let _listaComentarios = await getComentarios(id);
      setListaComentarios(_listaComentarios.data);
    }
    if (comentario) {
      setComentarioEditado(comentario);
      setComentarioTexto(comentario.comentario);
    } else {
      data();
    }
  }, []);

  function ElementoComentario(_comentario) {
    let data = new Date(_comentario.dataComentario).toLocaleDateString("pt-br");
    return (
      <View
        style={{
          marginVertical: 10,
          height: 150,
          backgroundColor: theme.colorsPrimary.primary90,
          borderRadius: 5,
          padding: 8,
        }}>
        <AvaliacaoEstrelas nota={_comentario.nota} />
        <View style={{ height: 70 }}>
          <Text style={{ fontSize: 16, color: "#ffffff", marginHorizontal: 5 }}>
            {_comentario.comentario}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 5,
          }}>
          <Text style={{ fontSize: 16, color: theme.colorsPrimary.forthary }}>
            {_comentario.nomeComentario}
          </Text>

          <Text style={{ fontSize: 16, color: theme.colorsPrimary.forthary }}>
            {data}
          </Text>
        </View>
      </View>
    );
  }

  async function sendComentario(avaliacao) {
    _comentario = comentarioEditado;
    _comentario.nota = avaliacao;
    _comentario.comentario = comentarioTexto;
    let response;
    if(itemCardapioCustom.length == 0){
      for (let index = 0; index < itemCardapios.length; index++) {
        _comentario.idCardapio = itemCardapios[index].id;
        response = await setComentario(_comentario);
      }
    } else {
      let _itemCardapioCustom = itemCardapioCustom;
      for (let index = 0; index < _itemCardapioCustom.length; index++) {
        _comentario.idCardapio = _itemCardapioCustom[index].id;
        response = await setComentario(_comentario);
      }
    }
    if (response) {
      Alert.alert("Atenção!", "Comentário enviado com sucesso");
    }
  }

  function listaItensPedido(){
    if(itemCardapios)
    {
    return(
      <FlatList
        data={itemCardapios}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ItemReview item={item}/>}
        contentContainerStyle={{paddingVertical: 10}}
      />
    )
    } else { return null}
  }

  function syncListReview(itemId, add){
    let _itemCardapioCustom = itemCardapioCustom;
    if(add){
      _itemCardapioCustom.push(itemId);
    } else {
      var index = _itemCardapioCustom.indexOf(itemId);
      if (index !== -1) {
        _itemCardapioCustom.splice(index, 1);
      }
    }
    setItemCardapioCustom(_itemCardapioCustom);
  }

  return (
    <>
      {comentario ? (
        <View style={style.bodyCadastroComentario}>
          <ScrollView >
            <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 16, fontFamily: theme.fonts.subtitle, textAlign:"center", marginVertical: 20}}>Escolha os itens do review.</Text>
            {listPedidos}
            <TextInput
              onChangeText={(e) => {
                setComentarioTexto(e);
              }}
              value={comentarioTexto}
              color="#ffffff"
              placeholder="Comentário"
              placeholderTextColor="#ffffff"
              multiline
              maxLength={250}
              style={{ width: 300, paddingHorizontal: 20 }}
            />
            
            <AvaliacaoForm callback={sendComentario} />
          </ScrollView>
        </View>
      ) : (
        <View style={style.listaComentarios}>
          <Text style={{ color: "#ffffff", height: 30, fontSize: 18, textAlign:"center", }}>
            Comentários
          </Text>
          <FlatList
            style={style.listaComentarios}
            data={listaComentarios}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => ElementoComentario(item)}
            contentContainerStyle={{ paddingVertical: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
}
