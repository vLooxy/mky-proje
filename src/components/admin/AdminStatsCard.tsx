import React from 'react';

interface AdminStatsCardProps {
    title: string;
    value: string | number;
    icon: string;
    subtext: string;
    color: 'blue' | 'indigo' | 'orange' | 'green' | 'red';
}

const colorMap = {
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-600 dark:text-blue-400',
    },
    indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        text: 'text-indigo-600 dark:text-indigo-400',
    },
    orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        text: 'text-orange-600 dark:text-orange-400',
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-600 dark:text-green-400',
    },
    red: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-600 dark:text-red-400',
    },
};

export function AdminStatsCard({ title, value, icon, subtext, color }: AdminStatsCardProps) {
    const styles = colorMap[color] || colorMap.blue;

    return (
        <div className="bg-admin-card dark:bg-admin-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-40 group hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{value}</h3>
                </div>
                <div className={`${styles.bg} p-2 rounded-lg ${styles.text}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-auto">
                <span className="text-slate-400 text-xs">{subtext}</span>
            </div>
        </div>
    );
}
