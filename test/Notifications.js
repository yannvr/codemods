import React from 'react'
import IconError from 'material-ui-icons/Error'
import IconCheckCircle from 'material-ui-icons/CheckCircle'
import IconWarning from 'material-ui-icons/Warning'
import IconInfo from 'material-ui-icons/Info'
import { withStyles } from 'material-ui'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { REDEEM_COUPON, SEND_MESSAGE } from '../actions'

const variantIcon = {
  success: IconCheckCircle,
  warning: IconWarning,
  error  : IconError,
  info   : IconInfo,
}

class SimpleSnackbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  // shouldComponentUpdate (nextProps, nextState, nextContext) {
  //   if (nextProps.message && nextProps.message === this.props.message) {
  //     return false
  //   }
  //   return true
  // }

  componentWillReceiveProps (nextProps) {
    console.log('SB nextProps', nextProps)
    if (nextProps.open) {
      this.setState({ open: nextProps.open, message: nextProps.message })
      console.log('update state')
    }
  }

  getMessage (classes, message, variant) {
    const Icon = variantIcon[variant]
    return (
      <span id="client-snackbar" className={classes.message}>
        <Icon className={[classes.icon, classes.iconVariant]} />
        {message}
      </span>
    )
  }

  handleClose = () => {
    console.log('reseting messagesw on Close')
    this.setState({ open: false, message: '' })
    this.props.resetCoupon()
    this.props.resetMessage()
  }

  handleOnExit = () => {
    console.log('reseting messagesw on Exit')
    this.setState({ open: false, message: '' })
    this.props.resetCoupon()
    this.props.resetMessage()
  }

  render () {
    const {
      classes, autoHideDuration, anchorOriginVertical, variant,
    } = this.props

    // const {  message } = this.state

    // const {  } = this.state

    console.log('SB props', this.props)
    console.log('SB state', this.state)

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical  : anchorOriginVertical,
            horizontal: 'center',
          }}
          classes={{ root: classes.root }}
          open={this.state.open}
          onClose={this.handleClose}
          autoHideDuration={autoHideDuration}
          // onExit={this.handleOnExit}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
            className         : classes[variant],
          }}
          message={
            this.getMessage(classes, this.state.message, variant)
          }
        />
      </div>
    )
  }
}

SimpleSnackbar.defaultProps = {
  autoHideDuration    : 2000,
  anchorOriginVertical: 'top',
  variant             : 'success',
}

SimpleSnackbar.propTypes = {
  classes             : PropTypes.object.isRequired,
  message             : PropTypes.string.isRequired,
  anchorOriginVertical: PropTypes.string,
  open                : PropTypes.bool.isRequired,
  autoHideDuration    : PropTypes.number,
  resetCoupon         : PropTypes.func.isRequired,
  resetMessage        : PropTypes.func.isRequired,
  variant             : PropTypes.oneOf(['success', 'warning', 'error', 'info']),
}


const styles = theme => ({
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: 'red',
  },
  info: {
    backgroundColor: 'blue',
  },
  warning: {
    backgroundColor: '#d47400',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity    : 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display   : 'flex',
    alignItems: 'center',
  },
})

const mapStateToProps = ({ coupon, contact }) => ({ coupon, contact })
const mapDispatchToProps = dispatch => ({
  resetCoupon : couponName => dispatch({ type: REDEEM_COUPON.RESET_ERROR, couponName }),
  resetMessage: couponName => dispatch({ type: SEND_MESSAGE.RESET_ERROR, couponName }),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleSnackbar))
