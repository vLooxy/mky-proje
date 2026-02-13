/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SECTION_REGISTRY } from '@/components/registry/section-registry';

interface PageRendererProps {
    sections: Array<{
        id: string;
        type: string;
        content: string | any;
    }>;
}

export function PageRenderer({ sections }: PageRendererProps) {
    if (!sections || sections.length === 0) return null;

    return (
        <div className="flex flex-col gap-0 w-full overflow-x-hidden">
            {sections.map((section) => {
                const Component = SECTION_REGISTRY[section.type];

                if (!Component) {
                    console.warn(`Unsupported section type: ${section.type}`);
                    return null;
                }

                // Parse content if it's a string (legacy support)
                const content = typeof section.content === 'string'
                    ? JSON.parse(section.content)
                    : section.content;

                return <Component key={section.id} {...content} />;
            })}
        </div>
    );
}
