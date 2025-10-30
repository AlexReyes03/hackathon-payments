const USER_TRANSFERS_KEY = 'ezpay_user_transfers';

class UserTransferService {
  getAllTransfers() {
    try {
      const transfers = localStorage.getItem(USER_TRANSFERS_KEY);
      return transfers ? JSON.parse(transfers) : [];
    } catch (error) {
      console.error('Error loading user transfers:', error);
      return [];
    }
  }

  createTransfer(publicKey, username, amount, concept = '', reference = '') {
    try {
      const transfers = this.getAllTransfers();
      const newTransfer = {
        id: `user_${Date.now()}`,
        public_key: publicKey,
        username: username,
        amount: amount,
        concept: concept,
        reference: reference,
        status: 'completed',
        created_at: new Date().toISOString(),
      };
      
      transfers.push(newTransfer);
      localStorage.setItem(USER_TRANSFERS_KEY, JSON.stringify(transfers));
      
      return {
        success: true,
        transfer: newTransfer,
      };
    } catch (error) {
      console.error('Error creating user transfer:', error);
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
        type: 'Transferencia a Usuario',
        description: `@${transfer.username}`,
        amount: -transfer.amount,
        icon: 'send',
        status: transfer.status,
        concept: transfer.concept,
        reference: transfer.reference,
      });
    });

    return Object.values(groups);
  }
}

export default new UserTransferService();