import React from 'react'
import PropTypes from 'prop-types' //impt -shortcut.

const Ratings = ({ value, text, starColor }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color: starColor }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star' //empty star
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: starColor }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: starColor }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: starColor }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: starColor }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <p>{text > 1 ? `${text} Artists reviews` : text === 1 ? `One Artist review` : ''}</p>
      {/*may also write {text && text} */}
    </div>
  )
}

//set default prop
Ratings.defaultProps = {
  //set starColor (it's a component props) as yellow by default
  starColor: '#fada00',
}

//propTypes- setting the data types of the props. if conditions not met, will throw an error in consule.
Ratings.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.number,
  starColor: PropTypes.string,
}

export default Ratings
