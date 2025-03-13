import { StyleSheet } from "react-native";
import { theme } from "../../configs";

export const style = StyleSheet.create({
  containerAvaliacaoGroup: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 5,
  },
  containerAvaliacao: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  buttonAvalicao: {
    width: 280,
    height: 80,
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
