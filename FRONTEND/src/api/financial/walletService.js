import request from '../fetchWrapper';

class WalletService {
  async getBalance(publicKey) {
    try {
      const response = await request(`/wallet/${publicKey}/balance`);
      return {
        balances: response.balances || [],
        recentTransactions: response.recent_transactions || [],
      };
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  }

  async fundWallet(publicKey) {
    try {
      const response = await request('/wallet/fund', {
        method: 'POST',
        body: { public_key: publicKey },
      });
      return response;
    } catch (error) {
      console.error('Error funding wallet:', error);
      throw error;
    }
  }

  async sendTransaction(publicKey, destination, amount, assetCode = null) {
    try {
      const response = await request(`/wallet/${publicKey}/send`, {
        method: 'POST',
        body: {
          destination,
          amount,
          asset_code: assetCode,
        },
      });
      return response;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }
}

export default new WalletService();