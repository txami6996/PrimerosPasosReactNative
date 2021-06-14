import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../comun/comun'
export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      //add id
      var commen = action.payload;
      commen.id = state.comentarios.length;
      let errmsg = null;
      fetch(baseUrl + 'comentarios/' + commen.id + '.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commen
          // firstParam: 'yourValue',
          //secondParam: 'yourOtherValue'
        )
      })
        .then(response => response.json())
        .catch((error) => {
          consolelog(error);
          errmsg = error.message;
        });
      return { ...state, errMess: errmsg, comentarios: state.comentarios.concat(commen) };

    default:
      return state;
  }
};