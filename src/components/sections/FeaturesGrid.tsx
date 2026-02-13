import React from 'react';

interface FeaturesGridProps {
    title: string;
    items: Array<{
        title: string;
        description: string;
    }>;
}

export function FeaturesGrid({ title, items }: FeaturesGridProps) {
    return (
        <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800">
            <div className="max-w-6xl mx-auto">
                {title && (
                    <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">{title}</h2>
                )}
                <div className="grid md:grid-cols-3 gap-8">
                    {(items || []).map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow" >
                            <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}
