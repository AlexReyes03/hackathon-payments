import request from '../fetchWrapper';

class BankService {
  async createTransfer(publicKey, amountFiat, currency, bankAccount) {
    try {
      const response = await request('/api/bank/transfer', {
        method: 'POST',
        body: {
          public_key: publicKey,
          amount_fiat: amountFiat,
          currency: currency,
          bank_account: bankAccount,
        },
      });
      return response;
    } catch (error) {
      console.error('Error creating bank transfer:', error);
      throw error;
    }
  }

  async listTransfers() {
    try {
      const response = await request('/api/bank/transfers');
      return {
        transfers: response.transfers || [],
        total: response.total || 0,
      };
    } catch (error) {
      console.error('Error listing transfers:', error);
      throw error;
    }
  }

  groupTransfersByDate(transfers) {
    const groups = {};

    transfers.forEach((transfer) => {
      const date = new Date(transfer.created_at);
      const dateKey = date.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
      });

      if (!groups[dateKey]) {
        groups[dateKey] = {
          date: dateKey,
          items: [],
        };
      }

      groups[dateKey].items.push({
        id: transfer.id,
        type: transfer.status === 'completed' ? 'Transferencia Bancaria' : 'Transferencia Rechazada',
        description: transfer.bank_account_masked,
        amount: transfer.status === 'completed' ? -transfer.amount_fiat : 0,
        icon: transfer.status === 'completed' ? 'download' : 'times',
        status: transfer.status,
        currency: transfer.currency,
        reputationScore: transfer.reputation_score,
      });
    });

    return Object.values(groups);
  }
}

export default new BankService();