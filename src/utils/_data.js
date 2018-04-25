import axios from 'axios'
import utils from './index'

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: utils.getCookie( 'auth' ) || '',
  },
  data: JSON.stringify({
      code: "AQABAAIAAADX8GCi6Js6SK82TsD2Pb7rmX5UsgGSu_rNhwP_kUqbgyERn6Mbmoz1wQlRw56YV4GK53Dt4voNOoIkB1rzBLdiOBOsMQa1C_MvTCsmsVe6_Xh1syxRGHQwzVVc4taU-LWcgp13t-tHPr1sWT3RoTNid7HOmJwEAVuZ6oHZoWufvwltDAB7ngxplQE2SbBsMr7H7BcsSvoI_5h4MQSAZGzXIVg7rAgmS8hAjozTtxKtLhw3voSS-3dTyT8HQjOwvC-ONn393jw7b8mcgvni_s_yZ4Dz3sd3Hx-mTpU8B1YWo4MqdqPphJzPCINERe-TPw28a7HkZbmUiRDKmHDAlEDS1XaROcHfTiagvvy1n8jwkTLFghNiUCZiXSsqwU486uCNIrPIKGxJwkXsDjsy-gsa-1SsqjPCZLpisBuzTAh9guS4QAixS3m8maj626mnsm-jpPb5n76tK4nHf0rbFiol4pNWB-etMyFdBJDbAr7aGwq4yjOus0ZHrl-UCUU8-fKn4QNtDqf-y2-USoKIdF_5kh7yHa3jNQap1rr0pYKyCJvWS_NfZMhd7LDqsFGnOQURkdl7NM9hIvI3Mq9c0FFJLUqPoXQsVCTUe6BnMAzQGNG_HKvGRum7k9mbPVNTW7AXiEIIuzCVO9HNKHm1fIsfezW3NSzYr7WmxBBb5BJP6iAA"
  }),
}

export async function getExamsList() {
  const url = utils.getURL('ManageExamApi/ExamList');
  const res = await axios.get(url,{
      Accept: '*/*',
      'Content-Type': 'application/json',
  })
  return res.data;
}

export async function createSession(data) {
    const url = utils.getURL('CreateSession/Create');
    const res = await axios.post(url, data, config)
    return res.data;
}