import { Extension } from '@tiptap/react';
import '@tiptap/extension-text-style';

// This extends TipTap's Commands interface by adding two new commands under the fontSize key.
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSizeExtension = Extension.create({
  name: 'fontSize',
  //   The extension is tied to the textStyle mark, which is necessary for inline styles like font-size color, etc.
  addOptions() {
    return {
      types: ['textStyle']
    };
  },
  //   This registers fontSize as an attribute for textStyle.
  //   The renderHTML function converts the attribute into an inline style property when rendering the HTML.
  //   Example output: <span style="font-size: 20px;">Some Text</span>

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark('textStyle', { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        }
    };
  }
});
