import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'


const TextInputDemo = (props) => {
    return (
        <View>
            <Text>{props.label}</Text>
            <TextInput {...props}
                style={[props.style, st.input]}
                placeholderTextColor={props.placeholderTextColor || 'gray'}
            />
        </View>
    )
}
export default TextInputDemo
const st = StyleSheet.create({
    input: {
        padding: 10,
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 10
    }
})
