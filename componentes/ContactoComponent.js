import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CONTACTO } from '../comun/contacto';


function RenderItem(props) {
    
        const item = props.item;
        
        if (item != null) {
            return(
                <Card>
                    <Card.Title>{item.nombre}</Card.Title>
                    <Card.Divider/>
                    <Text style={{margin: 20}}>
                        {item.descripcion}
                    </Text>
                    <Text style={{margin: 20}}>
                      Telefono:  {item.telefono}
                    </Text>
                    <Text style={{margin: 20}}>
                      Mail:  {item.mail}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          contacto: CONTACTO
        };
    }

    render() {
        
        return(
            <ScrollView>
                <RenderItem item={this.state.contacto.filter((contacto) => contacto.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default Home;