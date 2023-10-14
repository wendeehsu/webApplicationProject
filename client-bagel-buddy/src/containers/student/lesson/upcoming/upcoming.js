import React from 'react';
import { MainButton, SecondaryButton } from "../../../../components/button";

function upcomingLessonPage() {
    return (
        <div>
            <h1>upcomingLessonPage</h1>
            <MainButton
                text="Join Meet"
                onClick={() => console.log("Join Meet btn is clicked!")}
            />
            <SecondaryButton
                text="Cancel"
                onClick={() => console.log("Cancel btn is clicked!")}
            />
        </div>
    )
}

export default upcomingLessonPage;