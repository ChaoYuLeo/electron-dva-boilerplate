import { message } from 'antd';

export default {
  namespace: 'app',

  state: {
    loading: false
  },

  effects: {
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
};
