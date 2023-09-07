import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';

function AnalyticsScreen ({ navigation, route }) {
  const { arrowStatistics, key } = route.params;
  const header = ['Score', 'Distance: 10m', 'Distance: 15m'];
  
  return (
    <View>
      <Text> 
        {["10m", "15m"].map((index) => (
          <Text key={index}>
            {index}: {"\n"}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((arrowVal) => (
              <Text key = {arrowVal}>
                {String(10 - arrowVal) + ": "}
                {arrowStatistics[`values${index}`][10 - arrowVal]}
                {"\n"}
              </Text>
            ))}
            {"\n"}
          </Text>
        ))}
      </Text>
    </View>
  );
}



export default AnalyticsScreen;