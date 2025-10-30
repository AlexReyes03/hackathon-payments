import request from '../fetchWrapper';

class ConvertService {
  async convertToUsdc(fromToken, amount) {
    try {
      const response = await request('/convert/to-usdc', {
        method: 'POST',
        body: {
          from_token: fromToken,
          amount: amount.toString(),
        },
      });
      return {
        usdcAmount: parseFloat(response.usdc_amount),
        fiatAmount: parseFloat(response.fiat_amount),
        rateSource: response.rate_source,
      };
    } catch (error) {
      console.error('Error converting to USDC:', error);
      throw error;
    }
  }

  async getExchangeRate(from, to) {
    try {
      const response = await request(`/convert/rates?from=${from}&to=${to}`);
      return {
        rate: response.rate,
        source: response.source,
        timestamp: response.timestamp,
      };
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      throw error;
    }
  }

  async calculateTotalBalanceInMXN(balances) {
    let totalMXN = 0;

    for (const balance of balances) {
      const amount = parseFloat(balance.balance);
      if (amount <= 0) continue;

      try {
        if (balance.asset_code === 'XLM' || balance.asset_code === 'USDC') {
          const conversion = await this.convertToUsdc(balance.asset_code, amount);
          totalMXN += conversion.fiatAmount;
        }
      } catch (error) {
        console.warn(`Failed to convert ${balance.asset_code}:`, error);
      }
    }

    return totalMXN;
  }
}

export default new ConvertService();