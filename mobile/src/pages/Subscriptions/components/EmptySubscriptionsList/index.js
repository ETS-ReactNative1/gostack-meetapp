import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Container, EmptyText } from './styles'

export default function EmptyList() {
  return (
    <Container>
      <Icon
        name='hourglass-empty'
        color='rgba(255, 255, 255, 0.6)'
        size={120}
      />
      <EmptyText>
        Parece que você não se inscreveu em algum Meetup ainda.
      </EmptyText>
    </Container>
  )
}
