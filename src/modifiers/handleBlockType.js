/**
 * Courtesy of markdown-shortcuts-plugins project(https://github.com/ngs/draft-js-markdown-shortcuts-plugin)
 */
/**
 * Courtesy of markdown-shortcuts-plugins project(https://github.com/ngs/draft-js-markdown-shortcuts-plugin)
 */

// import { RichUtils } from 'draft-js';
import changeCurrentBlockType from './changeCurrentBlockType';

const sharps = ( len ) => {
  let ret = '';
  while ( ret.length < len ) {
    ret += '#';
  }
  return ret;
};

const blockTypes = [
  null,
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six'
];

const handleBlockType = ( editorState, character ) => {
  const currentSelection = editorState.getSelection();
  const key = currentSelection.getStartKey();
  const text = editorState.getCurrentContent().getBlockForKey( key ).getText();
  const position = currentSelection.getAnchorOffset();
  const line = [ text.slice( 0, position ), character, text.slice( position ) ].join( '' );
  // const blockType = RichUtils.getCurrentBlockType( editorState );
  for ( let index = 1; index <= 6; index += 1 ) {
    if ( line.indexOf( `${sharps( index )} ` ) === 0 ) {
      return changeCurrentBlockType( editorState, blockTypes[index], line.replace( /^#+\s/, '' ) );
    }
  }
  let matchArr = line.match( /^[*-] (.*)$/ );
  if ( matchArr ) {
    return changeCurrentBlockType( editorState, 'unordered-list-item', matchArr[1] );
  }
  matchArr = line.match( /^[\d]\. (.*)$/ );
  if ( matchArr ) {
    return changeCurrentBlockType( editorState, 'ordered-list-item', matchArr[1] );
  }
  matchArr = line.match( /^> (.*)$/ );
  if ( matchArr ) {
    return changeCurrentBlockType( editorState, 'blockquote', matchArr[1] );
  }
  return editorState;
};

export default handleBlockType;
