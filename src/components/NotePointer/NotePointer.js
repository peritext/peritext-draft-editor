/* eslint react/no-did-mount-set-state : 0 */
/**
 * This module exports a react component for note pointers in editors
 * @module scholar-draft/NotePointer
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NotePointer.scss';

class NotePointer extends Component {

  static contextTypes = {
    emitter: PropTypes.object,
    notes: PropTypes.object,

    onNotePointerMouseOver: PropTypes.func,
    onNotePointerMouseOut: PropTypes.func,
    onNotePointerMouseClick: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      note: this.context.notes && this.context.notes[this.props.noteId]
    });
    this.unsubscribe = this.context.emitter.subscribeToNotes((notes) => {
      const note = notes[this.props.noteId];
      if (!this.state.note || (note && note.order !== this.state.note.order)) {
        this.setState({
          note
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render = () => {
    const {
      note
    } = this.state;

    const {
      onNotePointerMouseOver,
      onNotePointerMouseOut,
      onNotePointerMouseClick,
    } = this.context;

    const onMouseOver = (event) => {
      event.stopPropagation();
      if (typeof onNotePointerMouseOver === 'function' && note) {
        onNotePointerMouseOver(note.id, note, event);
      }
    };

    const onMouseOut = (event) => {
      event.stopPropagation();
      if (typeof onNotePointerMouseOut === 'function' && note) {
        onNotePointerMouseOut(note.id, note, event);
      }
    };

    const onMouseClick = (event) => {
      event.stopPropagation();
      if (typeof onNotePointerMouseClick === 'function' && note) {
        onNotePointerMouseClick(note.id, note, event);
      }
    };

    const id = note && note.id ? `note-pointer-${note.id}` : 'note-pointer-orphan';

    return (
      <sup
        className="scholar-draft-NotePointer"
        id={id}
        onMouseOver={onMouseOver}
        onFocus={onMouseOver}
        onMouseOut={onMouseOut}
        onBlur={onMouseOut}
        onClick={onMouseClick}
      >
        <span>{(note && note.order) || '*'}</span>
      </sup>
    );
  }
}

NotePointer.propTypes = {
  noteId: PropTypes.string,
};

export default NotePointer;
