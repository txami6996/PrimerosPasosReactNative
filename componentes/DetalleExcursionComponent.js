import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito } from '../redux/ActionCreators';
import { postComentario } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos
  }
}
const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  //postComentario: (excursionId,valoracion,autor,comentario,dia) => console.log(excursionId +' ' + valoracion + ' ' + autor + ' ' + comentario +' ' + dia) 
  postComentario: (excursionId, valoracion, autor, comentario, dia) => dispatch(postComentario(excursionId, valoracion, autor, comentario, dia))
})

function RenderExcursion(props) {

  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card>
        <Card.Image source={{ uri: baseUrl + excursion.imagen }}>
          <Card.Title style={styles.cardTitleStyle}>{excursion.nombre}</Card.Title>
        </Card.Image>
        <Text style={{ margin: 20 }}>
          {excursion.descripcion}
        </Text>
        <View style={styles.icono}>
          <Icon
            raised
            reverse
            name={props.favorita ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
          />
          <Icon
            raised
            reverse
            name='pencil'
            type='font-awesome'
            color='blue'
            onPress={() => { props.toogle() }}
          />
        </View>


      </Card>
    );
  }
  else {
    return (<View></View>);
  }
}

function RenderComentario(props) {

  const comentarios = props.comentarios;

  const renderCommentarioItem = ({ item, index }) => {

    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
        <Text style={{ fontSize: 12 }}>{item.valoracion} Stars</Text>
        <Text style={{ fontSize: 12 }}>{'-- ' + item.autor + ', ' + item.dia} </Text>
      </View>
    );
  };

  return (
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
      <FlatList
        data={comentarios}
        renderItem={renderCommentarioItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}



class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      valoracion: "3",
      autor: "",
      comentario: "",
      fecha: new Date(),
    }
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }
  resetForm() {
    this.setState({
      showModal: false,
      valoracion: 3,
      autor: "",
      comentario: "",
      fecha: new Date(),
    });
  }

  gestionarComentario(excursionId) {
    //const fechax=this.state.fecha.getFullYear()+ '-' + (this.state.fecha.getMonth()+1) + '-' + this.state.fecha.getDate()+'T'
    //const hora=this.state.fecha.getHours()+':'+this.state.fecha.getMinutes()+':'+this.state.fecha.getSeconds()
    //const dia=fechax + 'T' + hora;
    //const datos=this.state.comentario+','+'\n'+this.state.valoracion+' Stars \n' + '--'+this.state.autor+','+fechax+hora
    //this.props.postComentario(excursionId,this.state.valoracion,this.state.autor,this.state.comentario,dia);
    let contenido = new Object();
    contenido.excursionId = excursionId
    contenido.valoracion=this.state.valoracion
    contenido.autor = this.state.autor
    contenido.comentario = this.state.comentario
    contenido.dia = this.state.fecha
    this.props.postComentario(contenido)
    this.resetForm()

  }
  render() {
    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
          toogle={() => this.toggleModal()}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => { this.toggleModal(); this.resetForm(); }}
          onRequestClose={() => { this.toggleModal(); this.resetForm(); }}>
          <View style={styles.modal}>
            <Rating
              showRating
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
              onFinishRating={rating => this.setState({ valoracion: rating })}
            />
            <Input
              placeholder=' Autor '
              leftIcon={
                <Icon
                  name='user-o'
                  type='font-awesome'
                />
              }
              onChangeText={value => this.setState({ autor: value })}
            />
            <Input
              placeholder=' Comentario '
              leftIcon={
                <Icon
                  name='comment-o'
                  type='font-awesome'
                />
              }
              onChangeText={value => this.setState({ comentario: value })}
            />
            <Button
              onPress={() => { this.toggleModal(); this.gestionarComentario(excursionId); }}
              color='blue'
              title="Enviar"
            />
            <Button
              onPress={() => { this.toggleModal(); this.resetForm(); }}
              color='blue'
              title="Cancelar"
            />
          </View>
        </Modal>
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  icono: {
    flexDirection: "row",
    justifyContent: "center"

  },

});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);