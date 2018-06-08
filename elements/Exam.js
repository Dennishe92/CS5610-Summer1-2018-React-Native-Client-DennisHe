import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import {ScrollView} from 'react-native'
import ExamService from '../services/ExamService'

const questions = [
    {	title: 'Question 1', subtitle: 'Multiple choice',
        icon: 'list'},
    {	title: 'Question 2', subtitle: 'Fill-in the blanks',
        icon: 'code'},
    {	title: 'Question 3', subtitle: 'True or false',
        icon: 'check'},
    {	title: 'Question 4', subtitle: 'Essay',
        icon: 'subject'}
        ]

export default class Exam extends Component {
    static navigationOptions = {title: 'Exam'}
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            lessonId: 1,
            widgetId: 1
        };

        //Bindings

        //Service
        this.examService = ExamService.instance;
    }

    updateForm(newState) {
        this.setState(newState)
    }

    componentDidMount() {
        const lessonId = this.props.navigation.getParam("lessonId", 1);
        const widgetId = this.props.navigation.getParam("widgetId", 1);
        this.setState({lessonId : lessonId});
        this.setState({widgetId : widgetId});
    }

    createExam() {
        var temp = {
            title: this.state.title,
            description: this.state.description,
            widgetType: 'Exam'
        }
        this.examService.createExam(this.state.lessonId, temp)
            .then(this.props.navigation.goBack())
    }

    deleteExam(widgetId) {
        this.examService.deleteExam(widgetId)
    }

    render() {
        return(

            <ScrollView>
                <Text>This is an example exam</Text>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <Button onPress={() => this.createExam()}
                        backgroundColor="green"
                        color="white"
                        title="add"/>

                <Button onPress={() => this.props.navigation.goBack()}
                        backgroundColor="red"
                        color="white"
                        title="Cancel"/>

            </ScrollView>

        )
    }
}