import axios from 'axios';
import { API_HOST } from '../constant';
import { Alert } from '@material-ui/lab';

/**
 *
 * @param {object} param
 * @param {'get' | 'post' | 'put' | 'delete' =} param.method
 * @param {string} param.url
 * @param {object=} param.params
 * @param {object=} param.data
 * @param {object=} param.totalCount
 */
export function callApi({ method = 'get', url, params, data }) {
  return axios({
    url,
    method,
    baseURL: API_HOST,
    params,
    data,
  }).then(response => {
    const { resultCode, resultMessage, totalCount } = response.data;
    if (resultCode < 0) {
        <Alert severity="error">{resultMessage}</Alert>
    //   message.error(resultMessage);
    }
    return {
      isSuccess: resultCode === ResultCode.Success,
      data: response.data.data,
      resultCode,
      resultMessage,
      totalCount,
    };
  });
}

export const ResultCode = {
  Success: 0,
};
