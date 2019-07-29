import React from 'react'
import PropTypes from 'prop-types'
import { MdEdit, MdDelete } from 'react-icons/md'

import { toast } from 'react-toastify'
import Container from '~/components/Container'
import MaButton from '~/components/MaButton'

import history from '~/services/history'

import api from '~/services/api'

import { Wrapper, Content, Header, Footer } from './styles'

export default function MeetupDetails({ location }) {
  const currentMeetUp = location.state.meetUp

  const {
    title,
    description,
    location: place,
    formatedDate,
    banner,
  } = currentMeetUp

  function handleEditMeetUpClick() {
    history.push('/register-meetup', { meetUp: currentMeetUp })
  }

  async function handleCancelMeetUpClick() {
    try {
      await api.delete(`/meetups/${currentMeetUp.id}`)

      history.push('/dashboard')
    } catch (err) {
      toast.error('Houve um erro ao deletar o seu meetup, tente novamente.')
    }
  }

  return (
    <Container>
      <Wrapper>
        <Header>
          <h1>{title}</h1>
          <div>
            <MaButton onClick={handleEditMeetUpClick} color='#4DBAF9'>
              <MdEdit />
              Editar
            </MaButton>
            <MaButton onClick={handleCancelMeetUpClick}>
              <MdDelete />
              Cancelar
            </MaButton>
          </div>
        </Header>
        <Content>
          <img src={banner.url} alt='Banner do meetup detalhado' />
          <p>{description}</p>
        </Content>
        <Footer>
          <time>{formatedDate}</time>
          <p>{place}</p>
        </Footer>
      </Wrapper>
    </Container>
  )
}

MeetupDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      meetUp: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        formatedDate: PropTypes.string,
        banner: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
}
