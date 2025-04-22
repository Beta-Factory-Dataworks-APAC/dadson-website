// Type declarations to support Payload v2 imports

declare module 'payload/types' {
  export interface Block {
    slug: string;
    labels?: {
      singular: string;
      plural: string;
    };
    fields: any[];
  }

  export interface Field {
    name: string;
    type: string;
    required?: boolean;
    admin?: any;
    [key: string]: any;
  }

  export interface CollectionConfig {
    slug: string;
    admin?: any;
    access?: any;
    hooks?: any;
    fields: any[];
    [key: string]: any;
  }

  export interface RichTextField extends Field {
    editor: any;
  }

  export type RichTextElement = string;
  export type RichTextLeaf = string;
}

declare module 'payload/config' {
  export function buildConfig(options: any): any;
  export interface Access {
    (args: any): boolean | Promise<boolean>;
  }
} 