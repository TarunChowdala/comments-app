// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachItem, setAppointmentAsReady} = props
  const {name, time, id, readyToStart} = eachItem

  const image = readyToStart
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStart = () => {
    setAppointmentAsReady(id)
  }

  const date = new Date(time)
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const day = weekdays[date.getDay()]

  return (
    <li className="list-item">
      <div>
        <h1 className="appointment">{name}</h1>
        <p className="date">{`Date: ${time}, ${day}`}</p>
      </div>

      <button type="button" data-testid="star" className="star-button">
        <img src={image} alt="star" className="star" onClick={onStart} />
      </button>
    </li>
  )
}

export default AppointmentItem
