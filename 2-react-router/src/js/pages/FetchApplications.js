import React from "react";
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, IndexRoute, hashHistory, browserHistory, withRouter, History   } from "react-router";
import Next from "../components/Next"
import Back from "../components/Back"
import Logout from "../components/Logout"  
import Login from "../components/Login"
import Register from "../components/Register"
import Esign from "../components/Esign"

import * as Actions from '../actions';

export default class FetchApplication  extends React.Component {
  
  

	logChange(val) {
		var vm = this;
	    console.log("Selected: " );
	    console.log(val);
      console.log('val.value',val.value);
	    this.setState({ value: val.value }, function(){
        console.log('state %% ',this.state);
        var recordId = this.state.value;
        console.log('recordId ',recordId);
        var link = '/fieldset/genesis__Applications__c/Application_FieldSet_One/';
        // console.log('linl to pth ',link);
        // this.props.router.push('/fieldset')
        // browserHistory.push('/fieldset');
        // this.props.history.push('/fieldset/Account/mandatoryFieldSetAccount/');
        this.props.history.push(link+recordId);

        //hashHistory.push('/fieldset');
      });
      

  }

  fetchApplicationForSelect() {
    // Visualforce.remoting.Manager.invokeAction('ReactAccountController.fetchAccount', finishDataLoad(result, event){
    var vm =this;
    // alert('called fetchAccount');
    ReactAccountController.fetchApplicationOnAccountId(function(result, event) {
      console.log('result fetchAccountForSelect ',result)

      // var result = result.map(function(result,index) {
      //       return <AccountsFields key={index} user={ result } />
      // });

      var appDictList = [];
      var map = {}
      var applications    = JSON.parse(result.replace(/&/g,'').replace(/quot;/g,'"'));
      applications.forEach(function(app) {
      	map ={}
      	map['value'] = app.Id;
      	map['label'] = app.Name;

      	//create array of map with value and label
      	appDictList.push(map);
      })

      console.log('appDictList ',appDictList);

      vm.setState({applicationList:{appDictList}});

    },{escape:false});
        
    // });
    // this.setState({accounts:'set manually'});
  }

  componentDidMount() {
    // alert('components did mount')
    // this.fetchApplicationForSelect();
    // this.timerID = setInterval(
    //   () => this.fetchAccount(),
    //   1000
    // );
    // this.fetchAccount();
  }

  componentWillUnmount() {
    // clearInterval(this.timerID);
  }

  onSubmit() {
    console.log('clicked onSUbmit of fetchapplication');
    return false;
  }

  

  render() {
    
    // acc = { this.state.accounts };
    // alert(acc);
    // var fetchApp = this.state.applicationList.appDictList;
    // console.log('fetchApp ',fetchApp);
    // alert('typeof fetchApp ',typeof fetchApp);
    
    // alert('typeof acc1 ',typeof acc1,'....',typeof this.state.accounts);
    // var acc2 = acc1.forEach(function(data) {
    //   console.log('data in fun ',data)
    //      return ( {data});
    //     });
    return ( 
      <div>
        <h1>Fetch Application</h1>
        <Select
            name="Fetch Application"
            value= {this.props.appValue}
            options={this.props.appList}
            onChange={this.props.requestApplicationList}
            placeholder="Select Application"
        />

        // <Next route='accounts' onClick={this.onSubmit} setHistory={this.props.history} />
        // <Back setHistory={this.props.history} />
        // <Logout />
        // <br/>
        // <Login />

        // <br/>
        // <br/>
        // <br/>
        // // <Register userType="Partner"  accountFieldSet="mandatoryFieldSetAccount"  title="Apply" />
        // <Esign objectId='a3O41000000HuEe' typeNo='1' />


        
      </div>
    );
  }


}


