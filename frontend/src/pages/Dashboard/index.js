import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api from '~/services/api'

import { Wrapper, MeetUp } from './styles'
import Container from '~/components/Container'
import MaButton from '~/components/MaButton'

export default function Dashboard() {
  const [meetUps, setMeetUps] = useState([])

  useEffect(() => {
    async function loadMeetUps() {
      const response = await api.get('meetups')

      const data = response.data.map(meetUp => ({
        ...meetUp,
        formatedDate: format(
          parseISO(meetUp.date_time),
          "d 'de' MMMM', às' HH:mm",
          {
            locale: pt,
          }
        ),
      }))

      setMeetUps(data)
    }

    loadMeetUps()
  }, [])

  return (
    <Container>
      <Wrapper>
        <header>
          <h1>Meus meetups</h1>
          <MaButton title='Novo meetup' />
        </header>
        <ol>
          {meetUps.map(meetUp => (
            <MeetUp>
              <strong>{meetUp.title}</strong>
              <time>{meetUp.formatedDate}</time>
            </MeetUp>
          ))}
        </ol>
      </Wrapper>
    </Container>
  )
}
