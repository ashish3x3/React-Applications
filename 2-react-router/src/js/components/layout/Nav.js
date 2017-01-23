import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    // const featuredClass = location.pathname === "/" ? "active" : "";
    // const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    // const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li activeClassName="active" onlyActiveOnIndex={true}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>FetchApplication</IndexLink>
              </li>
              
              <li activeClassName="active">
                <Link to="accounts" onClick={this.toggleCollapse.bind(this)}>Accounts</Link>
              </li>
              
              <li activeClassName="active">
                <Link to="fieldset" onClick={this.toggleCollapse.bind(this)}>Fieldset</Link>
              </li>

              <li activeClassName="active">
                <Link to="Login" onClick={this.toggleCollapse.bind(this)}>Login</Link>
              </li>

              <li activeClassName="active">
                <Link to="Register" onClick={this.toggleCollapse.bind(this)}>Register</Link>
              </li>

              <li activeClassName="active">
                <Link to="Esign" onClick={this.toggleCollapse.bind(this)}>Esign</Link>
              </li>

              <li activeClassName="active">
                <Link to="yodlee" onClick={this.toggleCollapse.bind(this)}>Yodlee</Link>
              </li>


            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
