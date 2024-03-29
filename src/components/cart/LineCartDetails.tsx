import React from 'react';
import {Button, Card, Paragraph, Title} from 'react-native-paper';

import {_stompClient} from '../../App';
import {CartContext} from '../../context/cart/CartContext';
import {FILE} from '../../../environment/environment.prod';
import {LineCart} from '../../model/response/entity/CartResponse';

interface Props {
  line: LineCart;
  id: string;
}

export const LineCartDetails = ({line, id}: Props) => {
  const {removeProduct} = React.useContext(CartContext);

  const deleteProduct = () => {
    removeProduct(id, line.product.cod);
  };

  return (
    <Card
      style={{
        paddingHorizontal: 10,
        margin: 10,
        width: 220,
      }}>
      <Card.Title title={line.product.names[1]} />
      <Card.Cover source={{uri: FILE.concat(line.product.images[0])}} />
      <Card.Content>
        <Title>{'Precio:' + line.product.price}</Title>
        <Paragraph>{'Cantidad a llevar' + line.quantity}</Paragraph>
        <Paragraph>{'Importe: ' + line.importt}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button color='red' onPress={deleteProduct}>
          Eliminar plato
        </Button>
      </Card.Actions>
    </Card>
  );
};
