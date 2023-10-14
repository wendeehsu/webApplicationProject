import React, { useState } from 'react';
import './index.css';
import UpcomingLessonPage from './upcoming/upcoming';
import PendingLessonPage from './pending/pending';
import CanceledLessonPage from './canceled/canceled';
import HistoryLessonPage from './history/history';

function LessonPage() {
    const tabs = [{
        name: 'Upcoming',
        link: 'upcoming'
    },{
        name: 'Pending Approval',
        link: 'pending'
    },{
        name: 'Canceled',
        link: 'canceled'
    },{
        name: 'History',
        link: 'history'
    }]
    const [activeTab, setActiveTab] = useState(tabs[0].name);

    const displayActiveTab = () => {
        switch(activeTab) {
          case tabs[0].name:
            return <UpcomingLessonPage />;
          case tabs[1].name:
            return <PendingLessonPage />;  
          case tabs[2].name:
            return <CanceledLessonPage />;  
          case tabs[3].name:
            return <HistoryLessonPage />;  
          default:
            return <UpcomingLessonPage />;
        }
      }

    return (
        <div className='page'>
            <h1>Lessons</h1>
            <div className='lesson-tab-header'>
                {
                    tabs.map((tab) => 
                        <div
                            key={tab.name}
                            className={tab.name === activeTab ? 'active-tab': ''}
                        >
                            <h2
                                className='lesson-tab-item'
                                onClick={() => setActiveTab(tab.name)}
                            >
                                {tab.name}
                            </h2>
                        </div>)
                }
            </div>
            <div>
                { displayActiveTab() }
            </div>
        </div>
    )
}

export default LessonPage;