const BANK_TRANSFERS_KEY = 'ezpay_bank_transfers';

class BankService {
  createTransfer(publicKey, amountFiat, currency, bankAccount) {
    try {
      const transfers = this.getAllTransfers();
      const newTransfer = {
        id: `bank_${Date.now()}`,
        public_key: publicKey,
        amount_fiat: amountFiat,
        currency: currency,
        bank_account_masked: `****${bankAccount.slice(-4)}`,
        status: 'completed',
        reputation_score: 0,
        created_at: new Date().toISOString(),
      };
      
      transfers.push(newTransfer);
      localStorage.setItem(BANK_TRANSFERS_KEY, JSON.stringify(transfers));
      
      return newTransfer;
    } catch (error) {
      console.error('Error creating bank transfer:', error);
      throw error;
    }
  }

  getAllTransfers() {
    try {
      const transfers = localStorage.getItem(BANK_TRANSFERS_KEY);
      return transfers ? JSON.parse(transfers) : [];
    } catch (error) {
      console.error('Error loading bank transfers:', error);
      return [];
    }
  }

  listTransfers() {
    try {
      const transfers = this.getAllTransfers();
      return {
        transfers: transfers || [],
        total: transfers.length || 0,
      };
    } catch (error) {
      console.error('Error listing transfers:', error);
      return {
        transfers: [],
        total: 0,
      };
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
        created_at: transfer.created_at,
      });
    });

    return Object.values(groups);
  }
}

export default new BankService();