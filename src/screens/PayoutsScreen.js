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
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { sellerAPI } from '../utils/api/api';
import { AntDesign } from '@expo/vector-icons';

export default function PayoutsScreen({ route, navigation }) {
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

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.navigationTitle}>Payouts</Text>
            </View>

            <Text style={styles.heading}>Earnings</Text>

            {summary && (
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryText}>$ {summary.remaining_balance}</Text>
                    <TouchableOpacity
                        style={styles.requestPayoutButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.requestPayoutButtonText}>Request Withdrawal</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Text style={styles.historyTitle}>Withdrawal History</Text>
        </View>
    );

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#7569FA" style={{ marginTop: 20 }} />
                ) : (
                    <FlatList
                        contentContainerStyle={styles.container}
                        data={payouts}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={renderHeader}
                        renderItem={({ item }) => {
                            const capitalize = (str) =>
                                str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

                            const status = item.status.toLowerCase();
                            const displayStatus = capitalize(item.status);

                            return (
                                <View style={styles.payoutItem}>
                                    <View style={styles.payoutItemTextContainer}>
                                        <Text style={styles.payoutItemText}>$ {item.amount}</Text>
                                        <Text style={styles.payoutItemTextSub}>{displayStatus}</Text>
                                    </View>
                                    <View
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
                                    />
                                </View>
                            );
                        }}
                    />
                )}

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

                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={submitting}
                                style={styles.requestPayoutButton}
                            >
                                <Text style={styles.requestPayoutButtonText}>{submitting ? 'Submitting...' : 'Submit Request'}</Text>
                            </TouchableOpacity>

                            <Pressable onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                                <Text style={styles.closeText}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#FAFAFA',
        flex: 1,
    },
    navigationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    navigationTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
        marginTop: 10,
        flex: 1,
        textAlign: "center",
    },
    heading: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
        color: "#333",
        marginTop: 10,
    },
    summaryContainer: {
        paddingVertical: 40,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
    },
    summaryText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginTop: 10,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
        color: "#333",
        marginTop: 10,
    },
    requestPayoutButton: {
        backgroundColor: "#7569FA",
        padding: 16,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 16,
    },
    requestPayoutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    payoutItem: {
        paddingVertical: 16,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    payoutItemText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
        marginTop: 10,
    },
    payoutItemTextSub: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
    statusBadge: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 10,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 12,
        borderRadius: 8,
        width: '100%',
        color: "#665491",
        fontSize: 14,
        borderColor: "#7569FA",
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



