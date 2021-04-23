import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, FlatList } from 'react-native';
import { HISTORIA } from '../comun/historia';
import { ACTIVIDADES } from '../comun/actividades';
function Historia(props) {

    const item = props.item;

    if (item != null) {
        return (
            <Card>
                <Card.Title>{item.nombre}</Card.Title>
                <Card.Divider />
                <Text style={{ margin: 20 }}>
                    {item.descripcion}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderCalendarioItem(props) {
    const objeto = props.item;
    const renderCalendarioItem = ({item, index}) => {
        return (
           
            <ListItem key={index}
                bottomDivider>
                <Avatar source={require('./imagenes/40Años.png')} />
                <ListItem.Content>
                    <ListItem.Title>{item.nombre}</ListItem.Title>
                    <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem> 
           
        );
    };
    if (objeto != null) {
        return (
            <Card>
                <Card.Title>Actividades y recursos </Card.Title>
                <Card.Divider />
                <SafeAreaView>
                    <FlatList 
                        data={objeto}
                        renderItem={renderCalendarioItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}
class QuienesSomos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            historia: HISTORIA,
            actividades: ACTIVIDADES
        };
    }

    render() {


        return (
            <ScrollView   >
                <Historia item={this.state.historia.filter((contacto) => contacto.destacado)[0]} />
                <RenderCalendarioItem item={this.state.actividades} />
            </ScrollView>      
        );
    }
}

export default QuienesSomos;