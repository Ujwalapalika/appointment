// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    initialAppoinment: [],
    isFilterActive: false,
  }

  addTitle = event => {
    this.setState({title: event.target.value})
  }

  addDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  addAppoinment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formatdate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
    const newAppoinment = {
      id: uuidv4(),
      title,
      date: formatdate,
    }
    this.setState(prevState => ({
      initialAppoinment: [...prevState.initialAppoinment, newAppoinment],
      title: '',
      date: '',
    }))
  }

  togglestarred = id => {
    this.setState(prevState => ({
      initialAppoinment: prevState.initialAppoinment.map(eachappointment => {
        if (eachappointment.id === id) {
          return {...eachappointment, istoggle: !eachappointment.istoggle}
        }
        return eachappointment
      }),
    }))
  }

  filterAppointment = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getfilter = () => {
    const {isFilterActive, initialAppoinment} = this.state
    if (isFilterActive) {
      return initialAppoinment.filter(
        appointments => appointments.istoggle === true,
      )
    }
    return initialAppoinment
  }

  render() {
    const {title, date, initialAppoinment} = this.state
    const getFilter = this.getfilter()
    console.log(initialAppoinment)
    return (
      <div>
        <div>
          <div>
            <h1>Add Appointment</h1>
            <form onSubmit={this.addAppoinment}>
              <label htmlFor="Title">TITLE</label>
              <input
                id="Title"
                type="text"
                value={title}
                onChange={this.addTitle}
              />
              <label htmlFor="Date">DATE</label>
              <input
                id="Date"
                type="date"
                value={date}
                onChange={this.addDate}
              />
              <button type="submit" data-testid="star">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="appointments"
            className="appointmentimg"
          />
        </div>
        <hr />
        <div>
          <h1>Appointments</h1>
          <button
            type="button"
            data-testid="star"
            onClick={this.filterAppointment}
            className="starred"
          >
            Starred
          </button>
        </div>
        <ul>
          {getFilter.map(eachappoint => (
            <AppointmentItem
              key={eachappoint.id}
              appoint={eachappoint}
              togglestarred={this.togglestarred}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Appointments
