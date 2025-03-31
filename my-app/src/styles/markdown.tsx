import { Components } from 'react-markdown'

export const markdownStyles = {
    content: 'prose prose-lg max-w-none',
    h1: 'text-4xl text-accent font-bold mb-6',
    h2: 'text-3xl text-accent font-bold mt-8 mb-4',
    h3: 'text-2xl text-accent font-bold mt-6 mb-3',
    p: 'mb-4 leading-relaxed',
    ul: 'list-disc ml-6',
    ol: 'list-decimal ml-6',
    li: 'my-1',
    a: 'text-primary no-underline hover:underline',
    blockquote: 'border-l-4 border-primary/50 pl-4 italic',
    code: 'bg-base-200 px-1 rounded font-mono',
}

export const markdownComponents: Components = {
    h1: ({ children }) => <h1 className={markdownStyles.h1}>{children}</h1>,
    h2: ({ children }) => <h2 className={markdownStyles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={markdownStyles.h3}>{children}</h3>,
    p: ({ children }) => <p className={markdownStyles.p}>{children}</p>,
    ul: ({ children }) => <ul className={markdownStyles.ul}>{children}</ul>,
    ol: ({ children }) => <ol className={markdownStyles.ol}>{children}</ol>,
    li: ({ children }) => <li className={markdownStyles.li}>{children}</li>,
    a: ({ href, children }) => (
        <a
            href={href}
            className={markdownStyles.a}
            target="_blank"
            rel="noreferrer"
        >
            {children}
        </a>
    ),
    blockquote: ({ children }) => (
        <blockquote className={markdownStyles.blockquote}>
            {children}
        </blockquote>
    ),
    code: ({ children }) => (
        <code className={markdownStyles.code}>{children}</code>
    ),
}
