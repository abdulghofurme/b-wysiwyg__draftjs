import { ContentState, convertFromHTML, EditorState } from "draft-js";
import React from "react";
import { checkSelection } from "../utils/draft";

function LinkController({ editorState, onChange }) {
  return (
    <button
      onClick={() => {
        const { isSelectionExist, selectedText } = checkSelection(editorState);
        if (isSelectionExist) alert("Change current selected");
        else {
          const contentState = editorState.getCurrentContent();
          const ctaContentBlocks = convertFromHTML(`<a href=''>CTA</a>`);
          const editorStateBlocks = contentState.getBlocksAsArray();
          const newEditorStateBlocks = editorStateBlocks.concat(
            ctaContentBlocks.contentBlocks
          );
          const newContentState = ContentState.createFromBlockArray(
            newEditorStateBlocks,
            newEditorStateBlocks.entityMap
          );
          const newEditorState = EditorState.createWithContent(newContentState);
          onChange(newEditorState);
          // setEditorState(
          // RichTextUtils.toggleBlockType(editorState, blockType)
          // );
        }
      }}
    >
      <span class="material-symbols-outlined">link</span>
    </button>
  );
}

export default LinkController;
