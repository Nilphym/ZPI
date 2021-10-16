import axios from 'axios';

import {
  API_URL
} from '../../config';

const testService = {
  async getTest(testId) {
    const response = await axios.get(`${API_URL}/test/${testId}`);
    return response;
  }
};

export default testService;