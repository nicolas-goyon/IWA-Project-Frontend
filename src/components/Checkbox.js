import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const Checkbox = ({ isChecked, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.checkbox, isChecked && styles.checked]}>
    {isChecked && (
      <FontAwesome name="check" size={18} color="white" /> 
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 5,
    borderWidth: 1,  
    borderColor: '#173054',  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },
  checked: {
    backgroundColor: '#173054', 
    borderWidth: 0,  
  },
});

export default Checkbox;
