'use client';

import { useEffect } from 'react';
import { incrementVisit } from '@/actions/analytics-actions';

export function AnalyticsTracker() {
    useEffect(() => {
        // Execute server action on mount
        incrementVisit().catch(console.error);
    }, []);

    return null;
}
