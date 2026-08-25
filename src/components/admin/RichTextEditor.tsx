import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10 transition-all [&_.ql-toolbar]:border-none [&_.ql-toolbar]:bg-slate-50 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-200 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[120px] [&_.ql-editor]:text-slate-900 [&_.ql-editor]:text-base" dir="ltr">
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange} 
        modules={modules}
        placeholder={placeholder}
      />
    </div>
  );
}
