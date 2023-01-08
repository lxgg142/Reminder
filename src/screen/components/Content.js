import { View, Text } from "react-native";
import React from "react";
import Header from "./Header";

export default function Content({ children, style }) {
  return <View style={{ paddingHorizontal: 10, ...style }}>{children}</View>;
}
