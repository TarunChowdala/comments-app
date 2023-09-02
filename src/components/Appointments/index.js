// Write your code here
import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentList: [], name: '', time: '', starredMsg: false}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeDate = event => {
    this.setState({time: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    const {name, time} = this.state

    const newAppointment = {name, time, id: uuidv4(), readyToStart: false}

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      name: '',
      time: '',
    }))
  }

  onStart = () => {
    this.setState(prevState => ({starredMsg: !prevState.starredMsg}))
  }

  setAppointmentAsReady = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {
            ...eachItem,
            readyToStart: !eachItem.readyToStart,
          }
        }
        return eachItem
      }),
    }))
  }

  getFilteredList = () => {
    const {appointmentList} = this.state
    const filteredList = appointmentList.filter(
      eachItem => eachItem.readyToStart === true,
    )
    return filteredList
  }

  render() {
    const {appointmentList, name, time, starredMsg} = this.state
    let filteredList
    if (starredMsg) {
      filteredList = this.getFilteredList()
    } else {
      filteredList = appointmentList
    }

    return (
      <div className="container">
        <div className="inner-container">
          <div className="top-container">
            <form className="form" onSubmit={this.onSubmit}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="input" className="input-text">
                TITLE
              </label>
              <input
                id="input"
                value={name}
                placeholder="Title"
                type="text"
                className="input-element"
                onChange={this.onChangeName}
              />
              <label htmlFor="date" className="date-text">
                DATE
              </label>
              <input
                id="date"
                value={time}
                type="date"
                className="input-element"
                onChange={this.onChangeDate}
              />
              <br />
              <button data-testid="submit" type="submit" className="button">
                Add
              </button>
            </form>

            <img
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
            />
          </div>
          <hr />
          <div className="middle-container">
            <h1 className="appointment-text">Appointments</h1>
            <button
              type="button"
              className={starredMsg ? 'starredMsg-button' : 'unstarred-button'}
              onClick={this.onStart}
            >
              Starred
            </button>
          </div>

          <ul className="appointment-list">
            {filteredList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                eachItem={eachItem}
                setAppointmentAsReady={this.setAppointmentAsReady}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
