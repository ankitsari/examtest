import {
    getExamsList
} from '../../utils/_data';
import {
    SET_EXAMS_LIST,
} from './ActionTypes'

export const getExams = payload => ( {
  type: SET_EXAMS_LIST,
  payload,
} )

export const getManageExamsList = () => dispatch => {

  getExamsList().then( ( res ) => {
    dispatch( getExams( res ) )
  } )

}
