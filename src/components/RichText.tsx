import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Types for rich text nodes
interface TextNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

interface LinkNode {
  type: 'link';
  url: string;
  newTab?: boolean;
  children: (TextNode | LinkNode | ImageNode)[];
}

interface ImageNode {
  type: 'upload';
  value: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}

interface ListItemNode {
  type: 'li';
  children: (TextNode | LinkNode)[];
}

interface ListNode {
  type: 'ul' | 'ol';
  children: ListItemNode[];
}

interface HeadingNode {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: (TextNode | LinkNode)[];
}

interface ParagraphNode {
  type: 'p';
  children: (TextNode | LinkNode | ImageNode)[];
}

type RichTextNode = 
  | TextNode 
  | LinkNode 
  | ImageNode 
  | ListNode 
  | ListItemNode 
  | HeadingNode 
  | ParagraphNode;

// Props for the RichText component
interface RichTextProps {
  content: RichTextNode[];
  className?: string;
}

// Helper function to render text with formatting
const renderText = (node: TextNode): JSX.Element => {
  let text = node.text;
  
  if (node.bold) {
    return <strong>{text}</strong>;
  }
  
  if (node.italic) {
    return <em>{text}</em>;
  }
  
  if (node.underline) {
    return <span className="underline">{text}</span>;
  }
  
  if (node.code) {
    return <code className="bg-gray-100 px-1 py-0.5 rounded">{text}</code>;
  }
  
  return <>{text}</>;
};

// Main RichText component
export default function RichText({ content, className = '' }: RichTextProps): JSX.Element {
  if (!content || !Array.isArray(content)) {
    return <></>;
  }

  // Recursive function to render nodes
  const renderNode = (node: RichTextNode, index: number): JSX.Element | null => {
    // Handle text nodes
    if ('text' in node) {
      return <React.Fragment key={index}>{renderText(node)}</React.Fragment>;
    }

    // Handle other node types
    switch (node.type) {
      case 'link':
        return (
          <Link 
            href={node.url} 
            key={index}
            target={node.newTab ? '_blank' : undefined}
            rel={node.newTab ? 'noopener noreferrer' : undefined}
            className="text-blue-600 hover:underline"
          >
            {node.children.map((child, i) => renderNode(child, i))}
          </Link>
        );
        
      case 'upload':
        return (
          <div className="my-4" key={index}>
            <Image
              src={node.value.url}
              alt={node.value.alt || ''}
              width={node.value.width || 800}
              height={node.value.height || 600}
              className="rounded-lg mx-auto"
            />
          </div>
        );
        
      case 'ul':
        return (
          <ul className="list-disc pl-6 my-4 space-y-2" key={index}>
            {node.children.map((item, i) => renderNode(item, i))}
          </ul>
        );
        
      case 'ol':
        return (
          <ol className="list-decimal pl-6 my-4 space-y-2" key={index}>
            {node.children.map((item, i) => renderNode(item, i))}
          </ol>
        );
        
      case 'li':
        return (
          <li key={index}>
            {node.children.map((child, i) => renderNode(child, i))}
          </li>
        );
        
      case 'h1':
        return (
          <h1 className="text-3xl font-bold my-4" key={index}>
            {node.children.map((child, i) => renderNode(child, i))}
          </h1>
        );
        
      case 'h2':
        return (
          <h2 className="text-2xl font-bold my-3" key={index}>
            {node.children.map((child, i) => renderNode(child, i))}
          </h2>
        );
        
      case 'h3':
        return (
          <h3 className="text-xl font-bold my-2" key={index}>
            {node.children.map((child, i) => renderNode(child, i))}
          </h3>
        );
        
      case 'h4':
        return (
          <h4 className="text-lg font-bold my-2" key={index}>
            {node.children.map((child, i) => renderNode(child, i))}
          </h4>
        );
        
      case 'h5':
        return (
          <h5 className="text-base font-bold my-2" key={index}>
            {node.children.map((child, i) => renderNode(child, i))}
          </h5>
        );
        
      case 'h6':
        return (
          <h6 className="text-sm font-bold my-2" key={index}>
            {node.children.map((child, i) => renderNode(child, i))}
          </h6>
        );
        
      case 'p':
        return (
          <p className="my-4" key={index}>
            {node.children.map((child, i) => renderNode(child, i))}
          </p>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={`rich-text ${className}`}>
      {content.map((node, index) => renderNode(node, index))}
    </div>
  );
} 