import React from "react";

const BLOCK_TYPES = [
  { label: "Unstyled text", type: "unstyled" },
  { label: "Normal text", type: "paragraph" },
  { label: "H1", type: "header-one" },
  { label: "H2", type: "header-two" },
  { label: "H3", type: "header-three" },
  { label: "H4", type: "header-four" },
  { label: "H5", type: "header-five" },
  { label: "H6", type: "header-six" },
  { label: "UL", type: "unordered-list-item" },
  { label: "OL", type: "ordered-list-item" },
  { label: "Blockquote", type: "blockquote" },
  { label: "Code Block", type: "code-block" },
  { label: "Atomic", type: "atomic" },
];
function BlockController({ editorState, onChange }) {
  const selection = editorState.getSelection();
  const currentBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <select
      name="block_controller"
      id="block_controller"
      value={currentBlockType}
      onChange={(e) => {
				onChange(e.target.value)
      }}
			style={{
				height: '24px',
				border: '1px solid grey',
				borderRadius: '4px',
				padding: '0 4px'
			}}
    >
      {BLOCK_TYPES.map(({ label, type }) => (
        <option key={label} value={type}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default BlockController;
