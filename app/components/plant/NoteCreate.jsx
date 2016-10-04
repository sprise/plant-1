// Used to add a note to a plant

const actions = require('../../actions');
const React = require('react');
const NoteCreateUpdate = require('./NoteCreateUpdate');
const FloatingActionButton = require('material-ui/FloatingActionButton').default;
const AddIcon = require('material-ui/svg-icons/content/add').default;
const utils = require('../../libs/utils');
const moment = require('moment');

class NoteCreate extends React.Component {

  constructor(props) {
    super(props);

    this.createNote = this.createNote.bind(this);
  }

  createNote() {
    const {plant} = this.props;
    const note = {
      _id: utils.makeMongoId(),
      date: moment().format('MM/DD/YYYY'),
      isNew: true,
      note: '',
      plantIds: [],
      errors: {},
    };

    this.props.dispatch(actions.editNoteOpen({note, plant}));
  }

  render() {
    const {
      isOwner,
      interimNote
    } = this.props || {};

    if(!isOwner) {
      return null;
    }

    const createNote = !!interimNote && interimNote.isNew;

    return (
      <div>
        {createNote &&
          <NoteCreateUpdate
            dispatch={this.props.dispatch}
            interimNote={interimNote}
            plant={this.props.plant}
          />
        }
        {!createNote &&
          <div style={{textAlign: 'right'}}>
            <FloatingActionButton
              onClick={this.createNote}
              secondary={true}
              title='Create Note'
            >
              <AddIcon />
            </FloatingActionButton>
          </div>
        }
      </div>
    );
  }
}

NoteCreate.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  isOwner: React.PropTypes.bool.isRequired,
  interimNote: React.PropTypes.object,
  plant: React.PropTypes.object.isRequired,
  postSaveSuccess: React.PropTypes.func,
  user: React.PropTypes.object.isRequired,
};

module.exports = NoteCreate;
