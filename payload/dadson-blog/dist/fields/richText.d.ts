import type { RichTextField } from '../payload-declarations.js';
export declare const defaultEditorElements: string[];
export declare const defaultEditorLeaves: string[];
/**
 * Defines a custom RichText field that uses blocks for layout flexibility.
 * This allows embedding complex components like CTAs or Videos within the flow of content.
 *
 * @param overrides - Optional overrides for the base RichTextField configuration.
 * @param additions - Optional additional elements, leaves, or blocks to add.
 */
type RichTextArgs = {
    overrides?: Partial<RichTextField>;
    additions?: {
        elements?: string[];
        leaves?: string[];
        blocks?: any[];
    };
};
declare const richText: ({ overrides, additions }?: RichTextArgs) => RichTextField;
export default richText;
