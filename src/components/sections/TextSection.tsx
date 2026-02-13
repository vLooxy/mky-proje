import React from 'react';

interface TextSectionProps {
    html: string;
}

export function TextSection({ html }: TextSectionProps) {
    return (
        <section className="py-16 px-6 bg-white dark:bg-slate-900">
            <div
                className="max-w-prose mx-auto prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </section>
    );
}
