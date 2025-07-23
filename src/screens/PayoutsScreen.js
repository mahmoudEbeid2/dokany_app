import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Modal,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { sellerAPI } from '../utils/api/api';

export default function PayoutsScreen({ route }) {
    const { sellerId, payoutMethod } = route.params;
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [payouts, setPayouts] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [summary, setSummary] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchPayouts = async () => {
        setLoading(true);
        try {
            const res = await sellerAPI.get('api/payouts/seller/');
            setPayouts(res.data);
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Failed to fetch payouts');
        }
        setLoading(false);
    };

    const fetchEarningsSummary = async () => {
        try {
            const res = await sellerAPI.get('api/seller/earnings-summary');
            setSummary(res.data);
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Failed to load earnings summary');
        }
    };

    const handleSubmit = async () => {
        if (!amount) {
            Alert.alert('Validation', 'Please fill in the amount field');
            return;
        }

        if (amount > summary.remaining_balance) {
            Alert.alert('Request Failed', 'You do not have enough balance for this payout');
            return;
        }

        setSubmitting(true);
        try {
            await sellerAPI.post('api/payouts', {
                amount: parseFloat(amount),
                payout_method: payoutMethod,
                seller_id: sellerId,
            });

            Alert.alert('Success', 'Payout request submitted');
            setAmount('');
            setModalVisible(false);
            fetchPayouts();
            fetchEarningsSummary();
        } catch (err) {
            console.error(err);
            Alert.alert('Error', err?.response?.data?.message || 'Submission failed');
        }
        setSubmitting(false);
    };

    useEffect(() => {
        fetchEarningsSummary();
        fetchPayouts();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Total Earnings</Text>

            {summary && (
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryText}>$ {summary.remaining_balance} </Text>
                    <TouchableOpacity style={styles.requestPayoutButton} onPress={() => setModalVisible(true)} >
                        <Text style={styles.requestPayoutButtonText}>Request Payout</Text>
                    </TouchableOpacity>
                </View>
            )}


            <Text style={styles.historyTitle}>Payout History</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#7569FA" />
            ) : (
                <FlatList
                    data={payouts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const capitalize = (str) =>
                            str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

                        const status = item.status.toLowerCase();
                        const displayStatus = capitalize(item.status);

                        return (
                            <View style={styles.payoutItem}>
                                <Text style={styles.payoutItemText}>$ {item.amount}</Text>
                                <Text
                                    style={[
                                        styles.statusBadge,
                                        {
                                            backgroundColor:
                                                status === 'pending'
                                                    ? '#FFD301'
                                                    : status === 'paid'
                                                        ? '#006B3D'
                                                        : '#D61F1F',
                                        },
                                    ]}
                                >
                                    {displayStatus}
                                </Text>
                                <Text style={styles.dateText}>
                                    {new Date(item.date).toLocaleDateString()}
                                </Text>
                            </View>
                        );
                    }}
                />)
            }

            {/* MODAL */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>New Payout Request</Text>

                        <TextInput
                            placeholder="Amount"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                            style={styles.input}
                        />
                        <Button
                            title={submitting ? 'Submitting...' : 'Submit Request'}
                            onPress={handleSubmit}
                            color="#7569FA"
                            disabled={submitting}
                        />
                        <Pressable onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                            <Text style={styles.closeText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#121217',
    },
    summaryContainer: {
        backgroundColor: '#F7F7FC',
        paddingVertical: 40,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        margin: 0,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 16,
    },
    requestPayoutButton: {
        backgroundColor: '#7569FA',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
    },
    requestPayoutButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    payoutItem: {
        backgroundColor: '#F7F7FC',
        padding: 12,
        marginBottom: 10,
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    payoutItemText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    statusBadge: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
        padding: 6,
        borderRadius: 6,
        width: 80,
        textAlign: 'center',
    },
    dateText: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 12,
        borderRadius: 6,
        width: '100%',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    closeBtn: {
        marginTop: 12,
        alignItems: 'center',
    },
    closeText: {
        color: '#FF4444',
        fontSize: 16,
    },
});



