import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";

interface ComparisonTableProps {
    title: string;
    subtitle: string;
    columns: string[];
    rows: Array<{
        feature: string;
        val1: string;
        val2: string;
        val3: string;
    }>;
}

export function ComparisonTable({ title, subtitle, columns, rows }: ComparisonTableProps) {
    return (
        <section className="py-24 bg-slate-50 dark:bg-[#0B1120]">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <FadeIn direction="up">
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{title}</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
                    </FadeIn>
                </div>
                <FadeIn direction="up" delay={200}>
                    <div className="overflow-x-auto rounded-2xl shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                    {(columns || []).map((col, i) => (
                                        <th key={i} className={`p-6 md:p-8 font-bold text-lg text-slate-900 dark:text-white ${i === 0 ? 'w-1/3' : 'text-center'}`}>
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {(rows || []).map((row, i) => (
                                    <tr key={i} className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors" >
                                        <td className="p-6 md:p-8 font-medium text-slate-700 dark:text-slate-200">{row.feature}</td>
                                        <td className="p-6 md:p-8 text-center text-slate-600 dark:text-slate-400">{row.val1}</td>
                                        <td className="p-6 md:p-8 text-center text-xl font-bold text-primary bg-primary/5 dark:bg-primary/10">{row.val2}</td>
                                        <td className="p-6 md:p-8 text-center text-slate-600 dark:text-slate-400">{row.val3}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </FadeIn>
            </div >
        </section >
    );
}
