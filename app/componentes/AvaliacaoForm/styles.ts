import { StyleSheet } from "react-native";
import { theme } from "../../configs";

export const style = StyleSheet.create({
  containerAvaliacaoGroup: {
    top: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 50
  },
  containerAvaliacao: {
    width: 200,
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonAvalicao: {
    width: 280,
    height: 50,
    borderRadius: 10,
    backgroundColor: theme.colorsPrimary.primary80,
    justifyContent: "center",
  },
  textAvalicao: {
    textAlign: "center",
    color: theme.colorsPrimary.cardColor,
    fontSize: 16,
    fontFamily: theme.fonts.subtitle,
  },
});
