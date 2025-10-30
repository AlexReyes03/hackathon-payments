import request from '../fetchWrapper';

class ReputationService {
  async getReputation(publicKey) {
    try {
      const response = await request(`/api/reputation/${publicKey}`);
      return {
        publicKey: response.public_key,
        trustScore: response.trust_score,
        level: response.level,
        details: response.details,
      };
    } catch (error) {
      console.error('Error fetching reputation:', error);
      throw error;
    }
  }
}

export default new ReputationService();