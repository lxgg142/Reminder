import React from "react";
import { View } from "react-native";

export default function Content({ children, style }) {
  return <View style={{ paddingHorizontal: 10, ...style }}>{children}</View>;
}
