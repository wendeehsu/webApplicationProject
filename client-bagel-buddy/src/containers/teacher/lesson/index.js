import React, { useState } from 'react';

import UpcomingLessonPage from './upcoming/upcoming';
import PendingLessonPage from './pending/pending';
import CanceledLessonPage from './canceled/canceled';
import HistoryLessonPage from './history/history';

function LessonPage() {
    const tabs = ['Upcoming', 'Pending Approval', 'Canceled', 'History'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const displayActiveTab = () => {
        switch (activeTab) {
            case tabs[0]:
                return <UpcomingLessonPage />;
            case tabs[1]:
                return <PendingLessonPage />;
            case tabs[2]:
                return <CanceledLessonPage />;
            case tabs[3]:
                return <HistoryLessonPage />;
            default:
                return <UpcomingLessonPage />;
        }
    }

    return (
        <div className='page'>
            <h1>Teacher's Lessons</h1>
            <div className='lesson-tab-header'>
                {
                    tabs.map((tab) =>
                        <div
                            key={tab}
                            className={tab === activeTab ? 'active-tab' : ''}
                        >
                            <h2
                                className='lesson-tab-item'
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </h2>
                        </div>)
                }
            </div>
            <div className='lesson-page'>
                {displayActiveTab()}
            </div>
        </div>
    )
}

export default LessonPage;