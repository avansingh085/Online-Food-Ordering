import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiDollarSign, FiClock, FiCheckCircle, FiXCircle, FiRefreshCw } from 'react-icons/fi';
import { Transaction, PaginationMeta } from '../../types/admin';
import apiClient from '../../api/apiClient';

interface TransactionsProps {
    itemPerPage?: number;
}

// Generate random transaction data for testing
export const generateFakeTransactions = (count: number): Transaction[] => {
    const statuses: Transaction['status'][] = ['pending', 'completed', 'failed', 'refunded'];
    const types: Transaction['type'][] = ['purchase', 'refund', 'topup'];
    const paymentMethods = ['credit_card', 'debit_card', 'upi', 'wallet', 'net_banking'];
    const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Wilson', 'Diana Davis', 'Eva Miller', 'Frank Moore'];

    return Array.from({ length: count }, (_, i) => {
        const amount = Math.random() > 0.7
            ? -(Math.floor(Math.random() * 5000) + 100) // Negative amount for refunds
            : Math.floor(Math.random() * 5000) + 100;

        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
        const userName = names[Math.floor(Math.random() * names.length)];

        const now = new Date();
        const createdAt = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date in last 30 days

        return {
            id: `txn_${Math.random().toString(36).substr(2, 9)}_${i}`,
            userId: `user_${Math.random().toString(36).substr(2, 6)}`,
            userName,
            amount,
            status,
            type,
            paymentMethod,
            createdAt: createdAt.toISOString(),
            updatedAt: new Date(createdAt.getTime() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
            orderId: Math.random() > 0.3 ? `order_${Math.random().toString(36).substr(2, 8)}` : ''
        };
    });
};

// Generate paginated fake data response
export const generateFakePaginatedTransactions = (
    page: number,
    limit: number,
    totalItems: number = 100
): { data: Transaction[]; meta: PaginationMeta } => {
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalItems);

    const data = generateFakeTransactions(endIndex - startIndex);

    return {
        data,
        meta: {
            currentPage: page,
            totalPages,
            totalItems,
            itemPerPage: limit,
            hasNext: page < totalPages,
            hasPrev: page > 1
        }
    };
};
const Transactions: React.FC<TransactionsProps> = ({ itemPerPage = 20 }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationMeta>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemPerPage: 0,
        hasNext: false,
        hasPrev: false
    });

    const fetchTransactions = async (page: number = 1) => {
        try {
            setLoading(true);
            setError(null);

            //   const response = await apiClient.get(`/transactions?page=${page}&limit=${itemPerPage}&sort=-createdAt`);
            const { data, meta } = await generateFakePaginatedTransactions(page, itemPerPage);
           console.log(data,"LLLLLLLLLLLLLLLLLLLLLLL")
            setTransactions(data);
            setPagination(meta);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch transactions');
            console.error('Error fetching transactions:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions(1);
    }, []);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchTransactions(newPage);
        }
    };

    const getStatusIcon = (status: Transaction['status']) => {
        switch (status) {
            case 'completed':
                return <FiCheckCircle className="w-4 h-4 text-green-500" />;
            case 'pending':
                return <FiClock className="w-4 h-4 text-yellow-500" />;
            case 'failed':
                return <FiXCircle className="w-4 h-4 text-red-500" />;
            case 'refunded':
                return <FiRefreshCw className="w-4 h-4 text-blue-500" />;
            default:
                return <FiClock className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status: Transaction['status']) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            case 'refunded':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                    onClick={() => fetchTransactions(1)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                        Total: {pagination.totalItems} transactions
                    </span>
                    <button
                        onClick={() => fetchTransactions(pagination.currentPage)}
                        className="p-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                        title="Refresh"
                    >
                        <FiRefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Transaction ID</th>
                                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">User</th>
                                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Date</th>
                                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Amount</th>
                                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Status</th>
                                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Type</th>
                                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Payment Method</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center">
                                            <FiDollarSign className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="font-mono text-sm text-gray-900">
                                                {transaction.id.slice(0, 8)}...
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{transaction.userName}</p>
                                            <p className="text-xs text-gray-500">ID: {transaction.userId.slice(0, 8)}...</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-gray-600">{formatDate(transaction.createdAt)}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {formatAmount(transaction.amount)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center">
                                            {getStatusIcon(transaction.status)}
                                            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                                                {transaction.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-gray-600 capitalize">{transaction.type}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-gray-600 capitalize">
                                            {transaction.paymentMethod.replace(/_/g, ' ')}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {transactions.length === 0 && (
                    <div className="text-center py-12">
                        <FiDollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No transactions found</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 rounded-b-xl">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                            Showing {(pagination.currentPage - 1) * pagination.itemPerPage + 1} to{' '}
                            {Math.min(pagination.currentPage * pagination.itemPerPage, pagination.totalItems)} of{' '}
                            {pagination.totalItems} entries
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={!pagination.hasPrev}
                            className={`p-2 rounded-md ${pagination.hasPrev
                                    ? 'text-gray-600 hover:bg-gray-100'
                                    : 'text-gray-300 cursor-not-allowed'
                                }`}
                        >
                            <FiChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center space-x-1">
                            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                const pageNum = Math.max(1, Math.min(
                                    pagination.currentPage - 2,
                                    pagination.totalPages - 4
                                )) + i;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-8 h-8 rounded-md text-sm ${pagination.currentPage === pageNum
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={!pagination.hasNext}
                            className={`p-2 rounded-md ${pagination.hasNext
                                    ? 'text-gray-600 hover:bg-gray-100'
                                    : 'text-gray-300 cursor-not-allowed'
                                }`}
                        >
                            <FiChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;