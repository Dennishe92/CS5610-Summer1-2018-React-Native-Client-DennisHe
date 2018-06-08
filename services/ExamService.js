import React from 'react'

const EXAM_API_URL = 'http://10.110.97.251:8080/api/exam';
const EXAM_API_URL2 = 'http://10.110.97.251:8080/api/lesson/LID/exam';

let _singleton = Symbol();
class ExamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }

    findAllExamForLesson(lessonId) {
        return fetch(EXAM_API_URL2.replace('LID', lessonId))
            .then(function(response) {
                return response.json();
            });
    }

    createExam(lessonId, exam) {
        return fetch(EXAM_API_URL2.replace('LID', lessonId), {
            body: JSON.stringify(exam),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function(response) {
            return response.json();
        });
    }

    deleteExam(ExamId) {
        return fetch(EXAM_API_URL + '/' + assignmentId, {
            body: JSON.stringify(ExamId),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
    }
}
export default ExamService;