import React from 'react'

const WIDGET_API_URL = 'http://10.110.97.251:8080/api/widget'; // for delete
const WIDGET_API_URL1 ='http://10.110.97.251:8080/api/lesson/LID/widget' // for finding widgets for lesson
const WIDGET_API_URL2 = 'http://10.110.97.251:8080/api/course/CID/module/MID/lesson/LID/widget'; // for creating widget


let _singleton = Symbol();
class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new WidgetService(_singleton);
        return this[_singleton]
    }

    findAllAssignmentForLesson(lessonId) {
        return fetch(ASSIGNMENT_API_URL2.replace('LID', lessonId))
            .then(function(response) {
                return response.json();
            });
    }

    createAssignment(lessonId, assignment) {
        return fetch(ASSIGNMENT_API_URL2.replace('LID', lessonId), {
            body: JSON.stringify(assignment),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function(response) {
            return response.json();
        });
    }

    deleteAssignment(assignmentId) {
        return fetch(ASSIGNMENT_API_URL + '/' + assignmentId, {
            body: JSON.stringify(assignmentId),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
    }
}
export default WidgetService;