import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { View } from 'react-native';
import { EXCURSIONES } from '../comun/excursiones';

class Campobase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      seleccionExcursion: null
    };
  }
  onSeleccionExcursion(excursionId) {
    this.setState({seleccionExcursion: excursionId})
    }
  render() {
 
    return (
      <View>
          <Calendario excursiones={this.state.excursiones} onPress={( excursionId) => this. onSeleccionExcursion(excursionId)} />
          <DetalleExcursion excursion={this.state.excursiones.filter((excursion) => excursion.id === this.state.seleccionExcursion)[0]} />
      </View>        
  );
    

  }
}

export default Campobase