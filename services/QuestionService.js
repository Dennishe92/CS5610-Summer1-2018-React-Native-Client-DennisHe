import React from 'react'

const QUESTION_API_URL = 'http://10.110.97.251:8080/api/question/'
const QUESTION_API_URL2 = 'http://10.110.97.251:8080/api/exam/EID/question'

const TF_API_URL = 'http://10.110.97.251:8080/api/exam/EID/truefalse'
const MC_API_URL = 'http://10.110.97.251:8080/api/exam/EID/choice'
const ES_API_URL = 'http://10.110.97.251:8080/api/exam/EID/blanks'
const FB_API_URL = 'http://10.110.97.251:8080/api/exam/EID/essay'



let _singleton = Symbol();
class QuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new QuestionService(_singleton);
        return this[_singleton]
    }

    findAllQuestionsForExam(examId) {
        return fetch(QUESTION_API_URL2.replace('EID', examId))
            .then(function(response) {
                return response.json();
            });
    }

    deleteQuestion(questionId) {
        return fetch(QUESTION_API_URL + '/' + questionId, {
            body: JSON.stringify(questionId),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
    }

    createTrueFalseQuestion(examId, trueFalseQuestion) {
        return fetch(TF_API_URL.replace('EID', examId), {
            body: JSON.stringify(trueFalseQuestion),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function(response) {
            return response.json();
        });
    }

    createMultipleChoiceQuestion(examId, multipleChoiceQuestion) {
        return fetch(MC_API_URL.replace('EID', examId), {
            body: JSON.stringify(multipleChoiceQuestion),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function(response) {
            return response.json();
        });
    }

    createEssayQuestion(examId, essayQuestion) {
        return fetch(ES_API_URL.replace('EID', examId), {
            body: JSON.stringify(essayQuestion),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function(response) {
            return response.json();
        });
    }

    createFillTheBlankQuestion(examId, fillBlankQuestion) {
        return fetch(FB_API_URL.replace('EID', examId), {
            body: JSON.stringify(fillBlankQuestion),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function(response) {
            return response.json();
        });
    }

}
export default QuestionService;