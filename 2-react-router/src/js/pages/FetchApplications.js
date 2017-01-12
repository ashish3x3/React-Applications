import React from "react";
import Select from 'react-select';

// var Select = require('react-select');


var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

console.log('options ',options);

export default class FetchApplication  extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = ({accountsOptions: [], value:{}});
    this.fetchAccountForSelect = this.fetchAccountForSelect.bind(this);
    this.logChange = this.logChange.bind(this);
    
  }

	logChange(val) {
		var vm = this;
	    console.log("Selected: " );
	    console.log(val);
	    this.setState({ value: val });

  }

  fetchAccountForSelect() {
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

      vm.setState({accountsOptions:{appDictList}});

    },{escape:false});
        
    // });
    // this.setState({accounts:'set manually'});
  }

  componentDidMount() {
    // alert('components did mount')
    this.fetchAccountForSelect();
    // this.timerID = setInterval(
    //   () => this.fetchAccount(),
    //   1000
    // );
    // this.fetchAccount();
  }

  componentWillUnmount() {
    // clearInterval(this.timerID);
  }

  render() {
    
    // acc = { this.state.accounts };
    // alert(acc);
    var fetchApp = this.state.accountsOptions.appDictList;
    console.log('fetchApp ',fetchApp);
    // alert('typeof fetchApp ',typeof fetchApp);
    
    // alert('typeof acc1 ',typeof acc1,'....',typeof this.state.accounts);
    // var acc2 = acc1.forEach(function(data) {
    //   console.log('data in fun ',data)
    //      return ( {data});
    //     });
    return ( 
      <div>
        <h1>FetchApplication</h1>
        <Select
            name="form-field-name"
            value= {this.state.value}
            options={fetchApp}
            onChange={this.logChange}
        />
        
        
      </div>
    );
  }


}
