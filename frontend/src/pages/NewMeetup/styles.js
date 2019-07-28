import styled from 'styled-components'
import { Form } from '@rocketseat/unform'
import DatePicker from 'react-datepicker'

export const StyledForm = styled(Form)`
  max-width: 940px;
  padding: 100px 20px;

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
  }

  textarea {
    width: 100%;
    height: 250px;
    border: none;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin: 5px 0;
    font-family: 'Roboto';
    font-size: 18px;
    color: rgba(255, 255, 255, 0.5);
    padding: 25px;
    resize: none;

    &::placeholder {
      font-family: 'Roboto';
      font-size: 18px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`

export const StyledDatePicker = styled(DatePicker)`
  border: none;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 50px;
  border-radius: 5px;
  margin: 5px 0;
  font-family: 'Roboto';
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 25px;

  &::placeholder {
    font-family: 'Roboto';
    font-size: 18px;
    color: rgba(255, 255, 255, 0.5);
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;

  button {
    max-width: 180px;
  }
`
