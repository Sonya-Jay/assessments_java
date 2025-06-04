package com.assessments.backend.urica;

import com.assessments.backend.AnswerOptions;

public class UricaQuestions {

    AnswerOptions[] options = {
            new AnswerOptions(0, "Strongly Disagree"),
            new AnswerOptions(1, "Disagree"),
            new AnswerOptions(2, "Undecided"),
            new AnswerOptions(3, "Agree"),
            new AnswerOptions(4, "Strongly Agree")
    };

    public AnswerOptions[] choices() {
        return options;
    }

    public String[] questions() {
        return new String[] {
                "1. As far as I'm concerned, I don't have any problems that need changing.",
                "2. I think I might be ready for some self-improvement.",
                "3. I am doing something about the problems that had been bothering me.",
                "4. It might be worthwhile to work on my problem.",
                "5. I'm not the problem one. It doesn't make much sense for me to be here.",
                "6. It worries me that I might slip back on a problem I have already changed, so I am here to seek help.",
                "7. I am finally doing some work on my problems.",
                "8. I've been thinking that I might want to change something about myself.",
                "9. I have been successful in working on my problem but I'm not sure I can keep up the effort on my own.",
                "10. At times my problem is difficult, but I'm working on it.",
                "11. Trying to change is pretty much a waste of time for me because the problem doesn't have to do with me.",
                "12. I'm hoping this place will help me to better understand myself.",
                "13. I guess I have faults, but there's nothing that I really need to change.",
                "14. I am really working hard to change.",
                "15. I have a problem and I really think I should work on it.",
                "16. I'm not following through with what I had already changed as well as I hoped, and I'm here to prevent a relapse of the problem.",
                "17. Even though I'm not always successful in changing, I am at least working on my problem.",
                "18. I thought once I had resolved the problem I would be free of it, but sometimes I still find myself struggling with it.",
                "19. I wish I had more ideas on how to solve my problem.",
                "20. I have started working on my problems but I would like help.",
                "21. Maybe this place will be able to help me.",
                "22. I may need a boost right now to help me maintain the changes I've already made.",
                "23. I may be part of the problem, but I don't really think I am.",
                "24. I hope that someone here will have some good advice for me.",
                "25. Anyone can talk about changing; I'm actually doing something about it.",
                "26. All this talk about psychology is boring. Why can't people just forget about their problems?",
                "27. I'm here to prevent myself from having a relapse of my problem.",
                "28. It is frustrating, but I feel I might be having a recurrence of a problem I thought I had resolved.",
                "29. I have worries but so does the next person. Why spend time thinking about them?",
                "30. I am actively working on my problem.",
                "31. I would rather cope with my faults than try to change them.",
                "32. After all I had done to try and change my problem, every now and then it comes back to haunt me."
        };
    }
}
