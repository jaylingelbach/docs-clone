import { Extension } from '@tiptap/react';
import { HTMLAttributes } from 'react';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    letterSpacing: {
      setLetterSpacing: (letterSpacing: string) => ReturnType;
      unsetLetterSpacing: () => ReturnType;
    };
  }
}

export interface LetterSpacingOptions {
  defaultSpacing: string;
}
export interface LetterSpacingAttributes {
  letterSpacing?: string;
}

export const letterSpacingExtension = Extension.create<LetterSpacingOptions>({
  name: 'letterSpacingExtension',

  addOptions() {
    return {
      defaultSpacing: 'normal'
    };
  },

  addAttributes() {
    return {
      letterSpacing: {
        // Change from "spacing" to "letterSpacing"
        default: this.options.defaultSpacing,
        parseHTML: (element: HTMLElement) =>
          element.style.letterSpacing || this.options.defaultSpacing,
        renderHTML: (attributes: LetterSpacingAttributes) => {
          if (!attributes.letterSpacing) return {};
          return { style: `letter-spacing: ${attributes.letterSpacing}` };
        }
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (element: HTMLElement) => ({
          spacing: element.style.letterSpacing
        })
      }
    ];
  },

  addCommands() {
    return {
      setLetterSpacing:
        (letterSpacing: string) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { letterSpacing }).run();
        },
      unsetLetterSpacing:
        () =>
        ({ chain }) => {
          return chain().unsetMark('textStyle').run();
        }
    };
  }
});
