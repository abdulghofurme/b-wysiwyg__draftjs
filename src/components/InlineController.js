import React from "react";

const INLINE_TYPES = [
  {
    label: `<span class="material-symbols-outlined">
	format_bold
	</span>`,
    type: "BOLD",
  },
  {
    label: `<span class="material-symbols-outlined">
	format_italic
	</span>`,
    type: "ITALIC",
  },
  {
    label: `<span class="material-symbols-outlined">
	format_underlined
	</span>`,
    type: "UNDERLINE",
  },
  {
    label: `<span class="material-symbols-outlined">
	strikethrough_s
	</span>`,
    type: "STRIKETHROUGH",
  },
];

function InlineController({ editorState, onChange }) {
  const currentInlineType = editorState.getCurrentInlineStyle();

  return INLINE_TYPES.map(({ label, type }) => (
    <button
      key={label}
      dangerouslySetInnerHTML={{ __html: label }}
      onClick={() => {
        onChange(type);
      }}
      className={currentInlineType.has(type) ? "active" : ""}
    />
  ));
}

export default InlineController;
