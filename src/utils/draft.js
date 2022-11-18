export function checkSelection(editorState) {
  const selectionState = editorState.getSelection();
  const selectionAnchorKey = selectionState.getAnchorKey();
  const selectionContent = editorState.getCurrentContent();
  const selectionContentBlock = selectionContent.getBlockForKey(selectionAnchorKey);
  const selectionStart = selectionState.getStartOffset();
  const selectionEnd = selectionState.getEndOffset();
  const selectedText = selectionContentBlock.getText().slice(selectionStart, selectionEnd);

  return {
    isSelectionExist: selectedText !== "",
    selectionState,
    selectedText,
		selectionAnchorKey,
		selectionContent,
		selectionContentBlock,
		selectionStart,
		selectionEnd,
  };
}
