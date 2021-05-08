import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      excursiones: state.excursiones,
      cabeceras: state.cabeceras,
      actividades: state.actividades
    }
  }

function RenderItem(props) {
    
        const item = props.item;
        
        if (item != null) {
            return(
                <Card>
                    <Card.Image source = {{ uri: baseUrl + item.imagen }}>
                        <Card.Title style={styles.cardTitleStyle}>{item.nombre}</Card.Title>
                    </Card.Image>
                    <Text style={{margin: 20}}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Home extends Component {

    render() {
        
        return(
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardTitleStyle: {
      color: 'chocolate',
      fontWeight: 'bold',
      fontSize: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
    },
  });

  export default connect(mapStateToProps)(Home);