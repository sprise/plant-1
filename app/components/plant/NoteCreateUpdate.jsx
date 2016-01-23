// Used to add a note to a plant

import * as actions from '../../actions';
import InputCombo from '../InputCombo';
import moment from 'moment';
import RaisedButton from 'material-ui/lib/raised-button';
import React from 'react';
import TextField from 'material-ui/lib/text-field';
// import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';

export default class NoteCreateUpdate extends React.Component {

  constructor() {
    super();
    this.state = {
      date: moment().format('MM/DD/YY')
    };
  }

  componentDidMount() {
    this.state = {};
  }

  save(e) {
    // TODO: Need to validate and clean note
    const note = {
      ...this.state,
      plant: this.props.plant._id
    };
    console.log('NoteCreateUpdate.save:', note);
    this.props.dispatch(actions.createNoteRequest(note));
    e.preventDefault();
    e.stopPropagation();
  }

  cancel(e) {
    this.props.dispatch(actions.createNote({
      _id: this.props.plant._id,
      enable: false
    }));
    e.preventDefault();
    e.stopPropagation();
  }

  onChange(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }

  render() {
    // const plantId = _.get(this, 'props.params.id', '');

    // const {
    //   plant,
    // } = this.props || {};

    const {
      noteText = '',
      date = moment().format('MM/DD/YYYY')
    } = this.state || {};

    const textAreaStyle = {
      width: '100%',
      textAlign: 'left'
    };

    const errors = {};

    const paperStyle = {
      // height: 100,
      // width: 100,
      padding: 20,
      width: '100%',
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };

    const underlineStyle = {
      display: 'none',
    };

    const textFieldStyle = {
      marginLeft: 20
    };

    return (
      <Paper style={paperStyle} zDepth={5}>

        <TextField
          errorText={errors.date}
          floatingLabelText='Note Date'
          hintText={`MM/DD/YYYY`}
          onChange={this.onChange.bind(this, 'date')}
          style={textFieldStyle}
          underlineStyle={underlineStyle}
          value={date}
          fullWidth={true}
        />

        <TextField
          onChange={this.onChange.bind(this, 'noteText')}
          floatingLabelText='Note'
          hintText='What has happened since your last note?'
          multiLine={true}
          style={textAreaStyle}
          value={noteText}
          errorText={errors.note}
        />

        <div style={{textAlign: 'right'}}>
          <RaisedButton
            label='Cancel'
            onClick={this.cancel.bind(this)}
          />
          <RaisedButton
            label='Save'
            onClick={this.save.bind(this)}
            style={{marginLeft: '10px'}}
          />
        </div>

      </Paper>
    );
  }
}

NoteCreateUpdate.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  plant: React.PropTypes.object.isRequired,
};
