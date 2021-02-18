import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ backgroundColor, fontSize, title, onPress }) => {

    let color;
    
    switch (backgroundColor) {
        case 'primary':
            color = '#DE6C83';
            break;
        case 'secondary':
            color = '#AAA';
            break;
        case 'transparent':
            color = 'transparent';
            break;
        default:
            color = '#DE6C83';
    }

    const buttonStyles = {
        backgroundColor: color,
    };

    const buttonTextStyles = {
        fontSize,
    };

    return (
        <TouchableOpacity style={[styles.button, buttonStyles]} onPress={onPress}>
            <Text style={[styles.text, buttonTextStyles]}>{title}</Text>
        </TouchableOpacity>
    );
}

Button.propTypes = {
    backgroundColor: PropTypes.oneOf(['primary', 'secondary', 'transparent']),
    fontSize: PropTypes.number,
    title: PropTypes.string.isRequired,
};

Button.defaultProps = {
    backgroundColor: 'primary',
    fontSize: 16,
};

export default Button;

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 10,
    },
    text: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});