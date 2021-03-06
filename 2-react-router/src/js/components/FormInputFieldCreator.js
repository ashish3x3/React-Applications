import React from "react";

import SingleInput from "../components/SingleInput"

import Picklist from "../components/Picklist"
import Typehead from "../components/Typehead"
import Select from 'react-select';
import TextArea from "../components/TextArea"




export default class FormInputFieldCreator  extends React.Component {
  
  constructor(props) {
    super(props);
    // var appDictList = [];
    this.handleChange = this.handleChange.bind(this);
    this.handleRefrenceChange = this.handleRefrenceChange.bind(this);
    if(this.props.formElem.type === 'reference') {
        this.state = {
           selectValue: this.props.inputValue[this.props.formElem.fieldPath], selectedLabel:'', render:false, appDictList : []
        };
    } else {
        this.state = {
           selectValue: '', selectedLabel:'', render:false
        };
    }
    

  }

  handleChange(e) {
    console.log('e.target.name, this.fieldPathValue.value',e.target.name, e.target.value,'===', ); 
    //this.refs.myInput.value  //refs="myInput" in <input />
    this.props.onUserInput(
      e.target.name,
      e.target.value
    );
  }

  handleRefrenceChange(val) {
    console.log('handle ref change ');
    console.log('selected : ',val);
    this.props.onUserInput(
      val.fieldPath,
      val.value
    );

    this.setState({selectValue:val.value,selectedLabel:val.label}, function() {
      console.log('this.state after label change',this.state);

    });

  }

  componentDidMount() {

    var elem = this.props.formElem;
    var appDictList = [];
    console.log('elem ',elem.dbRequired,elem.fieldPath,elem.label,elem.objectName,elem.required,elem.type,elem);
    var inputElemValue = this.props.inputValue[elem.fieldPath];
    console.log('inputELemValue ',inputElemValue);

    console.log('appDictList ',appDictList);

    
    var map = {}
    var labelForRefValDisplay = '';

    var vm =this;
    console.log('vm.appDictList ',appDictList);



    if(elem.type.toLowerCase() === 'reference') {
      // appDictList = [];
    console.log('vm.appDictList inside ref ',appDictList);


      elem.referenceListValues.forEach(function(app) {
        map ={}
        map['value'] = app.Id;
        map['label'] = app.Name;
        map['fieldPath'] = elem.fieldPath;

        console.log('vm.appDictList inside map item ',appDictList);

        appDictList.push(map);

      });

      console.log('appDictList ',appDictList);

      if(this.props.inputValue[elem.fieldPath] !== undefined) {

        var itemValForRef = this.props.inputValue[elem.fieldPath];
        console.log(' elem.fieldPath ',elem.fieldPath);

        console.log(' this.props.inputValue ',this.props.inputValue);


        appDictList.forEach(function(item) {  
          console.log('item in appDictList,itemValForRef ',item, itemValForRef ); 
          if(item.value === itemValForRef) {
            console.log('matched ',item.value,itemValForRef);
            console.log('matched ',item);

            labelForRefValDisplay = item.label;
            console.log('labelForRefValDisplay ',labelForRefValDisplay);
            vm.setState({selectedLabel:labelForRefValDisplay, appDictList:appDictList, render:true},function() {
              console.log('this.state after setting label n appDictList',vm.state);

            });
          }
        });
      } else {
         vm.setState({appDictList:appDictList, render:true},function() {
              console.log('this.state after setting appDictList ',vm.state);

          });

      }
    }
     this.setState({render:true});
      console.log('this satet anyways at end of mount ',this.state);

  }

  componentWillUnmount() {
    
  }




  render() {
    console.log('this.state.render ',this.state.render);

    // if(this.state.render === true) {

      var elem = this.props.formElem;
      console.log('elem  after render true',elem.dbRequired,elem.fieldPath,elem.label,elem.objectName,elem.required,elem.type,elem);


      switch(elem.type.toLowerCase()) {
        case 'double':
                       console.log('double elem ',elem.fieldPath);
                        return (
                          <div>
                              <SingleInput
                                inputType={'number'}
                                title={elem.label}
                                name={elem.fieldPath}
                                controlFunc={this.handleChange}
                                content={this.props.inputValue[elem.fieldPath]}
                                placeholder={'Enter '+ elem.label} /> 
                          </div>
                          
                        );
                        break;
        case 'textarea': console.log('textarea elem ',elem.fieldPath);
                        return (
                          <div>
                              <TextArea
                                title={elem.label}
                                rows={5}
                                resize={true}
                                content={this.props.inputValue[elem.fieldPath]}
                                name={elem.fieldPath}
                                controlFunc={this.handleChange}
                                placeholder={'Enter '+ elem.label} />
                          </div>
                          
                        );
                        break;
        case 'number': 
        case 'integer':
        case 'currency':
                      console.log('number elem ',elem.fieldPath);
                        return (
                          <div>
                              <SingleInput
                                inputType={'number'}
                                title={elem.label}
                                name={elem.fieldPath}
                                controlFunc={this.handleChange}
                                content={this.props.inputValue[elem.fieldPath]}
                                placeholder={'Enter '+ elem.label} /> 
                          </div>
                          
                        );
                        break;
        case 'picklist': console.log('picklist elem,elem.picklistValues ',elem.fieldPath,elem.picklistValues);
                        return (
                          <div>
                           <Picklist
                              name={elem.fieldPath}
                              title={elem.label}
                              placeholder={'Select '+ elem.label}
                              controlFunc={this.handleChange}
                              options={elem.picklistValues}
                              selectedOption={this.props.inputValue[elem.fieldPath]} />
                          </div>
                        );
                        break;
        case 'date': console.log('date elem this.props.inputValue[elem.fieldPath]',elem.fieldPath,this.props.inputValue[elem.fieldPath]); 
                        return (
                          <div>
                            <label for={elem.fieldPath}>{elem.label}</label>
                            <input
                                type={elem.type}
                                name={elem.fieldPath}
                                defaultValue={this.props.inputValue[elem.fieldPath]}
                                onChange={this.handleChange}
                                placeholder={'Enter '+ elem.label}
                                className="form-control" />
                          </div>
                        );
                        break;
        case 'password': 
        case 'encryptedstring':
                      console.log('password elem ',elem.fieldPath); 
                        return (
                          <div>
                            <label for={elem.fieldPath}>{elem.label}</label>
                            <input
                                type={elem.type}
                                name={elem.fieldPath}
                                defaultValue={this.props.inputValue[elem.fieldPath]}
                                onChange={this.handleChange}
                                placeholder={'Enter '+ elem.label}
                                className="form-control" />
                          </div>
                        );
                        break;
        case 'reference': console.log('reference elem ,this.state.selectedLabel,appDictList ',elem.fieldPath,this.state.selectedLabel,this.state.appDictList); 
                        return (
                          <div>
                            <label for={elem.fieldPath}>{elem.label}</label>
                            <Select
                              name={elem.fieldPath}
                              placeholder = {'Select '+ elem.label}
                              value={this.state.selectValue} 
                              options={this.state.appDictList}
                              onChange={this.handleRefrenceChange} />
                          </div>
                        );
                        break;
        case 'text': 
        case 'string':
                      console.log('text elem ',elem.fieldPath); 
                        return (
                          <div>
                            
                              <SingleInput
                                inputType={'text'}
                                title={elem.label}
                                name={elem.fieldPath}
                                controlFunc={this.handleChange}
                                content={this.props.inputValue[elem.fieldPath]}
                                placeholder={'Enter '+ elem.label} /> 
                          
                          </div>
                        );
                        break;

      }

  // }

  return (
      <div>
        <label for=""></label>
      </div>
    );
  }


} //class