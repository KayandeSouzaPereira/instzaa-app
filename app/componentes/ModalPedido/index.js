import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, Alert } from "react-native";
import {
  Entypo,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { theme } from "../../configs";
import { styles } from "./styles";
import { getPedido } from "../../servicos/service";
import CaixaComentario from "../caixaComentario";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalPedido({ qrCode, linkPix, pedido, callback }) {
  const [status, setStatus] = useState(pedido.status);
  let checkStatusPedido = true;
  let avaliacao = initAvaliacao();
  let idCardapios = loopCardapio();

  function initAvaliacao() {
    let _avaliacao = {};
    _avaliacao.idComentario = 0;
    _avaliacao.dataComentario = new Date();
    _avaliacao.nomeComentario = pedido.nomeCliente;
    _avaliacao.comentario = "";
    _avaliacao.nota = 0;
    _avaliacao.idCardapio = 0;
    return _avaliacao;
  }

  function loopCardapio() {
    let idPedidos = [];
    pedido.resumoPedido.forEach((element) => {
      idPedidos.push(element);
    });
    return idPedidos;
  }

  useEffect(() => {
    const timePedido = setInterval(checkPedido, 3000);
    return () => clearInterval(timePedido);
  }, [checkStatusPedido]);

  const checkPedido = async () => {
    let id = pedido.id;
    let pedidoSt = await getPedido(id);
    if (pedidoSt.data.status != undefined) {
      setStatus(pedidoSt.data.status);
      if (
        pedidoSt.data.status.includes("Concluido") ||
        pedidoSt.data.status.includes("Cancelado")
      ) {
        checkStatusPedido = false;
        if (pedidoSt.data.status.includes("Cancelado")) {
          AsyncStorage.clear();
        }
      }
      return true;
    }
  };

  const copyToClipboardPix = async () => {
    await Clipboard.setStringAsync(linkPix);
    Alert.alert("Pix:", "link copiado com sucesso !");
  };

  const statusPedido = () => {
    if (status != undefined) {
      switch (status) {
        case "Confirmado":
          return (
            <View
              style={{
                width: 380,
                height: 500,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View>
                <Text style={styles.textPixTitle}>
                  O seu pagamento já foi confirmado.
                </Text>
              </View>
              <SimpleLineIcons
                style={{ marginTop: 20 }}
                name="note"
                size={180}
                color="white"
              />
              <View style={{ width: 280, marginTop: 50 }}>
                <Text style={styles.textPix}>
                  Em breve iniciaremos o preparo do seu pedido !
                </Text>
              </View>
            </View>
          );
        case "Fabricando":
          return (
            <View
              style={{
                width: 380,
                height: 500,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View>
                <Text style={styles.textPixTitle}>
                  O seu pedido ja esta sendo feito.
                </Text>
              </View>
              <MaterialCommunityIcons
                style={{ marginTop: 20 }}
                name="chef-hat"
                size={180}
                color="white"
              />
              <View style={{ width: 280, marginTop: 50 }}>
                <Text style={styles.textPix}>
                  Em breve ele estará a caminho com todo carinho !
                </Text>
              </View>
            </View>
          );
        case "Enviado":
          return (
            <View
              style={{
                width: 380,
                height: 500,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View>
                <Text style={styles.textPixTitle}>
                  O seu pedido foi enviado com sucesso !
                </Text>
              </View>
              <MaterialIcons
                style={{ marginTop: 20 }}
                name="delivery-dining"
                size={180}
                color="white"
              />
              <View style={{ width: 280, marginTop: 50 }}>
                <Text style={styles.textPix}>
                  Em instantes estará na sua porta !
                </Text>
              </View>
            </View>
          );
        case "Concluido":
          return (
            <View
              style={{
                width: 380,
                height: 500,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View>
                <Text style={styles.textConcluido}>
                  Pedido entregue. Gostou ? conte para nós como foi sua
                  experiência.
                </Text>
              </View>
              <Ionicons
                style={{ marginVertical: 20 }}
                name="pizza-outline"
                size={80}
                color="white"
              />
              <CaixaComentario
                comentario={avaliacao}
                itemCardapios={idCardapios}
              />
            </View>
          );
        case "Cancelado":
          return (
            <View
              style={{
                width: 380,
                height: 500,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View>
                <Text style={styles.textPixTitle}>
                  Ops... Ocorreu algum problema com o seu pedido. Sinto muito
                  pelo ocorrido.{" "}
                </Text>
              </View>
              <AntDesign
                style={{ marginTop: 20 }}
                name="exclamationcircle"
                size={180}
                color="red"
              />
              <View style={{ width: 280, marginTop: 50 }}>
                <Text style={styles.textPix}>
                  Fique avontade para nos contatar para entender o problema.
                </Text>
              </View>
            </View>
          );
      }
    } else {
      return <></>;
    }
  };

  return (
    <View
      style={{
        backgroundColor: "rgba(52, 52, 52, 0.7)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      {status != undefined ? (
        <View>
          {status.includes("Concluido") || status.includes("Cancelado") ? (
            <TouchableOpacity
              onPress={() => callback()}
              style={{ width: 120, height: 120 }}>
              <Entypo
                style={{ top: 30, left: 40 }}
                name="cross"
                size={30}
                color={theme.colorsPrimary.cardColor}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <></>
      )}
      <View style={{ flex: 1, width: 30, height: 30 }}></View>
      <View style={styles.containerModal}>
        {qrCode != "" ? (
          <View
            style={{
              width: 380,
              height: 500,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View>
              <Text style={styles.textPixTitle}>PIX</Text>
            </View>
            <Image
              style={{
                width: 250,
                height: 250,
                marginHorizontal: 5,
                resizeMode: "cover",
                marginTop: 15,
                backgroundColor: "white",
              }}
              source={{ uri: qrCode }}
            />
            <View>
              <Text style={styles.textPix}>
                Pague com QrCode ou Copie o link :{"\n"}
                {"\n"}
                <Text style={styles.textPixLink}>{linkPix}</Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => copyToClipboardPix()}
              style={{ flex: 1, width: 30, height: 30 }}>
              <MaterialIcons
                style={{ flex: 1, top: 30 }}
                name="content-copy"
                size={30}
                color={theme.colorsPrimary.cardColor}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>{statusPedido()}</View>
        )}
      </View>
    </View>
  );
}
