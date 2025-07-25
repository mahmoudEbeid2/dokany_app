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
import theme from '../utils/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={styles.appBar}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <AntDesign name="arrowleft" size={22} color={theme.colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.navigationTitle}>Payouts</Text>
                </View>
                {loading ? (
                    <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
                ) : (
                    <FlatList
                        contentContainerStyle={styles.container}
                        data={payouts}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={
                            <>
                                <Text style={styles.heading}>Earnings</Text>
                                {summary && (
                                    <View style={styles.summaryContainer}>
                                        <View style={styles.balanceInfo}>
                                            <MaterialIcons name="account-balance-wallet" size={24} color={theme.colors.primary} />
                                            <Text style={styles.summaryText}>$ {summary.remaining_balance}</Text>
                                            <Text style={styles.balanceLabel}>Available Balance</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.requestPayoutButton}
                                            activeOpacity={0.8}
                                            onPress={() => setModalVisible(true)}
                                        >
                                            <MaterialIcons name="account-balance" size={20} color={theme.colors.card} />
                                            <Text style={styles.requestPayoutButtonText}>Request Withdrawal</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <Text style={styles.historyTitle}>Withdrawal History</Text>
                            </>
                        }
                        renderItem={({ item }) => {
                            const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                            const status = item.status.toLowerCase();
                            const displayStatus = capitalize(item.status);
                            let statusColor, statusIcon, statusBg;
                            if (status === 'pending') {
                                statusColor = theme.colors.warning;
                                statusBg = '#FFF9E5';
                                statusIcon = <View style={[styles.statusCircle, { backgroundColor: statusBg }]}><MaterialIcons name="schedule" size={18} color={statusColor} /></View>;
                            } else if (status === 'paid') {
                                statusColor = theme.colors.success;
                                statusBg = '#E6F9ED';
                                statusIcon = <View style={[styles.statusCircle, { backgroundColor: statusBg }]}><MaterialIcons name="check-circle" size={18} color={statusColor} /></View>;
                            } else {
                                statusColor = theme.colors.error;
                                statusBg = '#FFE6E6';
                                statusIcon = <View style={[styles.statusCircle, { backgroundColor: statusBg }]}><MaterialIcons name="error" size={18} color={statusColor} /></View>;
                            }
                            return (
                                <View style={styles.payoutCard}>
                                    <View style={[styles.statusBar, { backgroundColor: statusColor }]} />
                                    <View style={styles.payoutRow}>
                                        <View style={styles.amountIconGroup}>
                                            {statusIcon}
                                            <Text style={styles.payoutAmount}>$ {item.amount}</Text>
                                        </View>
                                        <View style={[styles.statusBadge, { backgroundColor: statusBg, borderColor: statusColor }]}>
                                            <Text style={[styles.payoutStatus, { color: statusColor }]}>{displayStatus}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />
                )}
                {/* MODAL */}
                <Modal visible={modalVisible} animationType="slide" transparent={true}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <MaterialIcons name="account-balance" size={24} color={theme.colors.primary} />
                                <Text style={styles.modalTitle}>New Payout Request</Text>
                            </View>
                            <TextInput
                                placeholder="Enter amount"
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={setAmount}
                                style={styles.input}
                            />
                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={submitting}
                                style={styles.submitButton}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.submitButtonText}>{submitting ? 'Submitting...' : 'Submit Request'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                                <Text style={styles.closeText}>Cancel</Text>
                            </TouchableOpacity>
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
        backgroundColor: theme.colors.background,
        flex: 1,
    },
    appBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: theme.colors.card,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    backButton: {
        padding: 5,
    },
    navigationTitle: {
        fontSize: theme.fonts.size.xl,
        fontWeight: 'bold',
        marginBottom: 20,
        color: theme.colors.text,
        marginTop: 10,
        flex: 1,
        textAlign: 'center',
        fontFamily: theme.fonts.bold,
    },
    heading: {
        fontSize: theme.fonts.size.lg,
        fontWeight: '700',
        marginBottom: 16,
        color: theme.colors.text,
        marginTop: 10,
        fontFamily: theme.fonts.bold,
    },
    summaryContainer: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderRadius: theme.radius.lg,
        marginBottom: 16,
        backgroundColor: theme.colors.card,
        alignItems: 'center',
        ...theme.shadow,
    },
    balanceInfo: {
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: theme.fonts.size.sm,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },
    summaryText: {
        fontSize: theme.fonts.size.xl,
        fontWeight: 'bold',
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: 10,
        fontFamily: theme.fonts.bold,
    },
    historyTitle: {
        fontSize: theme.fonts.size.lg,
        fontWeight: '700',
        marginBottom: 16,
        color: theme.colors.text,
        marginTop: 10,
        fontFamily: theme.fonts.bold,
    },
    requestPayoutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 30,
        marginTop: 12,
        ...theme.shadow,
    },
    requestPayoutButtonText: {
        color: theme.colors.card,
        fontSize: theme.fonts.size.md,
        fontWeight: 'bold',
        fontFamily: theme.fonts.bold,
        marginLeft: 8,
    },
    payoutItem: {
        paddingVertical: 16,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: theme.radius.md,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        ...theme.shadow,
    },
    payoutCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center', ...theme.shadow, position: 'relative' },
    statusBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, borderTopLeftRadius: theme.radius.lg, borderBottomLeftRadius: theme.radius.lg },
    statusCircle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
    payoutRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
    statusIcon: { marginRight: 16 },
    payoutInfoCol: { flex: 1, flexDirection: 'column', justifyContent: 'center' },
    payoutAmountRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' },
    payoutAmount: { fontSize: theme.fonts.size.xl, fontWeight: 'bold', color: theme.colors.text, fontFamily: theme.fonts.bold },
    statusBadge: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 2, marginLeft: 0, alignSelf: 'center' },
    payoutStatus: { fontSize: theme.fonts.size.sm, fontWeight: 'bold' },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 12,
        borderRadius: theme.radius.md,
        width: '100%',
        color: theme.colors.textSecondary,
        fontSize: theme.fonts.size.md,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.card,
        fontFamily: theme.fonts.regular,
        ...theme.shadow,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: theme.colors.card,
        padding: 20,
        borderRadius: theme.radius.lg,
        width: '90%',
        ...theme.shadow,
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 12,
    },
    modalTitle: {
        fontSize: theme.fonts.size.lg,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
        fontFamily: theme.fonts.bold,
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
        ...theme.shadow,
    },
    submitButtonText: {
        color: theme.colors.card,
        fontSize: theme.fonts.size.md,
        fontWeight: 'bold',
        fontFamily: theme.fonts.bold,
    },
    closeBtn: {
        marginTop: 12,
        alignItems: 'center',
    },
    closeText: {
        color: theme.colors.error,
        fontSize: theme.fonts.size.md,
        fontFamily: theme.fonts.bold,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    amountIconGroup: { flexDirection: 'row', alignItems: 'center' },
});



