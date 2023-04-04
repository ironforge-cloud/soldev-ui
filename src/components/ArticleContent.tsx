import { ClipboardIcon } from '@heroicons/react/24/solid';
import { Children, createElement, memo, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMermaid from 'remark-mermaidjs';

type ArticleContentProps = {
  markdown: string;
  className?: string;
};

/*
  Define a component to render the react friendly markdown parser
  NOTE: `ArticleContent` should be imported using `dynamic` due to to the `remarkMermaid`
*/
function ArticleContent({ markdown, className = '' }: ArticleContentProps) {
  return (
    <article className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMermaid]}
        components={{
          h2: HeadingRenderer,
          code: CodeBlock as any
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}

function flatten(text: string, child: any): string {
  return typeof child === 'string'
    ? text + child
    : Children.toArray(child.props.children).reduce(flatten, text);
}

const HeadingRenderer = (props: { children: any; level: any }) => {
  const children = Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const slug = text.toLowerCase().replace(/\W/g, '-');
  return createElement('h' + props.level, { id: slug }, props.children);
};

/*
  Define a custom reusable code block component
*/
type CodeBlockProps = {
  className?: string;
  inline?: boolean;
  children: string;
};
const CodeBlock = ({ className = 'not-prose ', inline = false, children }: CodeBlockProps) => {
  // trim white space and extra lines at the end
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      children[i] = children[i].trim();
    }
    // children[children.length - 1] = children[children.length - 1].trim();
  } else if (typeof children === 'string') children = children.trim();

  // compute the `language`
  let language = className?.slice('language-'.length).toLowerCase() || '';

  if (language === 'sh') language = 'bash';

  let [copyButtonText, setCopyButtonText] = useState('Copy');

  // changes the text back to `copy` after 1 second
  const changeText = (text: string) => {
    setCopyButtonText(text);
    setTimeout(() => setCopyButtonText('Copy'), 1000);
  };

  // parse and format "inline" CodeBlocks, (e.g. `single ticked`) or full code blocks (e.g. ``` )
  if (inline) return <span className="inline-code">{children}</span>;
  else
    return (
      <div>
        <div className="flex justify-end">
          <CopyToClipboard text={children}>
            <button
              type="button"
              className="mb-1 inline-flex items-center rounded-t-lg bg-gray-600 px-2.5 py-1 text-center text-sm font-medium text-white hover:bg-gray-700
             lg:-mb-12 lg:mr-2"
              onClick={() => {
                changeText('Copied!');
              }}
            >
              <ClipboardIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              {copyButtonText}
            </button>
          </CopyToClipboard>
        </div>

        <SyntaxHighlighter
          className={className}
          style={tomorrow}
          customStyle={{
            marginTop: 0
          }}
          // allowCopy={true}
          language={language}
          showLineNumbers={true}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    );
};

export default memo(ArticleContent);
