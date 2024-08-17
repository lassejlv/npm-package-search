'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  markdown: string;
}

export default function MarkdownRender({ markdown }: Props) {
  return (
    <div className="proseMarkdown">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
