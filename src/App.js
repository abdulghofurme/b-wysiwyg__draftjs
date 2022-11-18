import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import { useState } from "react";
import "draft-js/dist/Draft.css";
import "./App.css";
import draftToHtml from "draftjs-to-html";
import gkx from "draft-js/lib/gkx";
import NestedRichTextEditorUtil from "draft-js/lib/NestedRichTextEditorUtil";
import BlockController from "./components/BlockController";
import InlineController from "./components/InlineController";
import CTAController from "./components/CTAController";
import LinkController from "./components/LinkController";
import { checkSelection } from "./utils/draft";

const RichTextUtils = gkx("draft_tree_data_support")
  ? NestedRichTextEditorUtil
  : RichUtils;

const defaultContent = `
<a alt='stylesheet' href='https://cdn.jsdelivr.net/gh/abdulghofurme/b-color@v1.1.0/dist/variables.min.css'>test</a>
<p class='b-color-text__primary--900'>test lagi</p>
`;

function App() {
  const defaultContentBlocks = convertFromHTML(defaultContent);
  const defaultContentContentState = ContentState.createFromBlockArray(
    defaultContentBlocks.contentBlocks,
    defaultContentBlocks.entityMap
  );
  // console.log({ defaultContentBlocks, defaultContentContentState });
  const [editorState, setEditorState] = useState(() => {
    // return EditorState.createEmpty()
    return EditorState.createWithContent(defaultContentContentState);
  });

  const contentState = editorState.getCurrentContent();
  const contentStateRaw = convertToRaw(contentState);
  const htmlState = draftToHtml(contentStateRaw);

  const { isSelectionExist, selectedText, selectionContent, selectionContentBlock } = checkSelection(editorState);
  console.log(isSelectionExist, selectedText, {selectionContent, selectionContentBlock});

  // console.log({ editorState, contentState, contentStateRaw, htmlState });

  const blockStyleFn = (contentBlock) => {
    // const type = contentBlock.getType()
  };

  const blockRendererFn = (contentBlock) => {
    const type = contentBlock.getType();
    // console.log({ type, contentBlock });
    if (type === "cta") {
      return {
        component() {
          return <a class="cta">CTA</a>;
        },
        editable: false,
      };
    }
  };


  return (
    <main>
      <section className="left">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/abdulghofurme/b-color@v1.1.1/dist/variables.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/abdulghofurme/b-color@v1.1.1/dist/text.min.css"
        />
        <div className="controllers">
          <div>
            <BlockController
              editorState={editorState}
              onChange={(blockType) =>
                setEditorState(
                  RichTextUtils.toggleBlockType(editorState, blockType)
                )
              }
            />
          </div>
          <div>
            <InlineController
              editorState={editorState}
              onChange={(inlineType) =>
                setEditorState(
                  RichTextUtils.toggleInlineStyle(editorState, inlineType)
                )
              }
            />
          </div>
          <div>
            <LinkController editorState={editorState} onChange={editorState} />
            <CTAController
              editorState={editorState}
              selec
              onChange={setEditorState}
            />
          </div>
        </div>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          blockStyleFn={blockStyleFn}
          blockRendererFn={blockRendererFn}
        />
      </section>
      {/* <section className="right">{htmlState}</section> */}
      <section
        className="right"
        dangerouslySetInnerHTML={{ __html: htmlState }}
      />
    </main>
  );
}

export default App;
