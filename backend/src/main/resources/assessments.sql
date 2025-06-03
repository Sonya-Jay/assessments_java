-- Aims Table Results

CREATE DATABASE IF NOT EXISTS assessments;
USE assessments;

CREATE TABLE IF NOT EXISTS aims_results (
	id		INT	AUTO_INCREMENT PRIMARY KEY,
    user_id		INT NOT NULL,
    date_taken	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_score INT NOT NULL,
    q1			INT NOT NULL,
    q2			INT NOT NULL,
    q3			INT NOT NULL,
    q4			INT NOT NULL,
    q5			INT NOT NULL,
    q6			INT NOT NULL,
    q7			INT NOT NULL,
    q8			INT NOT NULL,
    q9			INT NOT NULL,
    q10			INT NOT NULL,
    q11			INT NOT NULL,
    q12			INT NOT NULL
);


-- URICA TABLE RESULTS
CREATE TABLE IF NOT EXISTS urica_results (
	id		INT	AUTO_INCREMENT PRIMARY KEY,
    user_id		INT NOT NULL,
    date_taken	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_score INT NOT NULL,
    q1			INT NOT NULL,
    q2			INT NOT NULL,
    q3			INT NOT NULL,
    q4			INT NOT NULL,
    q5			INT NOT NULL,
    q6			INT NOT NULL,
    q7			INT NOT NULL,
    q8			INT NOT NULL,
    q9			INT NOT NULL,
    q10			INT NOT NULL,
    q11			INT NOT NULL,
    q12			INT NOT NULL,
    q13			INT NOT NULL,
    q14			INT NOT NULL,
    q15			INT NOT NULL,
    q16			INT NOT NULL,
    q17			INT NOT NULL,
    q18			INT NOT NULL,
    q19			INT NOT NULL,
    q20			INT NOT NULL,
    q21			INT NOT NULL,
    q22			INT NOT NULL,
    q23			INT NOT NULL,
    q24			INT NOT NULL,
    q25			INT NOT NULL,
    q26			INT NOT NULL,
    q27			INT NOT NULL,
    q28			INT NOT NULL,
    q29			INT NOT NULL,
    q30			INT NOT NULL,
    q31			INT NOT NULL,
    q32			INT NOT NULL
);