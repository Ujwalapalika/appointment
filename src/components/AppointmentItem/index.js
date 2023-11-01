// Write your code here
const AppointmentItem = props => {
  const {appoint, togglestarred} = props
  const {id, title, date, istoggle} = appoint
  console.log(istoggle)

  const toggleresult = istoggle
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const togglebutton = () => {
    togglestarred(id)
  }
  return (
    <div>
      <li>
        <div>
          <p>Date: {date}</p>
          <p>{title}</p>
        </div>
        <button type="button" onClick={togglebutton} data-testid="star">
          <img src={toggleresult} alt="star" />
        </button>
      </li>
    </div>
  )
}
export default AppointmentItem
