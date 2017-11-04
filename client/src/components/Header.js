import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Payment from './Payment'

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return
      case false:
        return (
          <li>
            <a href="/auth/google"> Login With Google </a>
          </li>
        )
      default:
        return (
          <div>
            <li>
              <Payment />
            </li>
            <li style={{ margin: '0 10px' }}>
              Credits: {this.props.auth.credits}
            </li>
            <li>
              <a href="/api/logout"> Log Out </a>
            </li>
          </div>
        )
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            className="left brand-logo"
            to={this.props.auth ? '/surveys' : '/'}
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
})
export default connect(mapStateToProps)(Header)
