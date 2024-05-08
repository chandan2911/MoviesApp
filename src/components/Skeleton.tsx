import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SkeletonProps {
    height: number;
    width: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ height, width }) => {
    return (
        <View style={[styles.container, { height, width }]} />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginBottom: 8,
    },
});

export default Skeleton;