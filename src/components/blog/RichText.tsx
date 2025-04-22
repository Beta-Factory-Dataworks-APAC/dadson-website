"use client";

import React from 'react';

interface RichTextProps {
  content: string;
}

const RichText: React.FC<RichTextProps> = ({ content }) => {
  if (!content) return null;

  return (
    <div 
      className="rich-text prose prose-lg max-w-none prose-headings:font-clash prose-p:font-satoshi"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default RichText; 