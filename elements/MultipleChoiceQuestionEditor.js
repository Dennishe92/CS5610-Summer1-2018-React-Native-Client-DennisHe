import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import {Button, Text, FormLabel, FormInput} from 'react-native-elements'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import QuestionService from "../services/QuestionService";

class MultipleChoiceQuestion extends React.Component {
    static navigationOptions = {title: 'Multiple Choice Question'}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: '',
            instructions: '',
            questionId: 0,
            examId: 0,
            type: 'MultipleChoiceQuestion',
        }

        this.QuestionService = QuestionService.instance;
    }

    updateForm(newState) {
        this.setState(newState)
    }

    componentDidMount() {
        const examId = this.props.navigation.getParam("examId");
        const questionId = this.props.navigation.getParam("questionId");
        const title = this.props.navigation.getParam("title", '');
        const description = this.props.navigation.getParam("description", '');
        const points = this.props.navigation.getParam("points", '');
        this.setState({examId: examId});
        this.setState({questionId: questionId});
        this.setState({title: title});
        this.setState({description: description});
        this.setState({points: points});
    }

    createMultipleChoiceQuestion() {
        var tmp = {
            points: this.state.points,
            title: this.state.title,
            description: this.state.description,
            instructions: this.state.instructions,
            type: this.state.type
        }

        this.QuestionService
            .createMultipleChoiceQuestion(this.state.examId, tmp)
    }

    deleteQuestion() {
        this.QuestionService
            .deleteQuestion(this.state.questionId)
    }

    renderTitle() {
        if (this.props.navigation.getParam("title", '') === '') {
            return (
                <FormInput onChangeText={text => this.updateForm({title: text})}/>
            )
        } else {
            return (
                <FormInput placeholder={this.state.title}/>
            )
        }
    }

    renderDescription() {
        if (this.props.navigation.getParam("description", '') === '') {
            return (
                <FormInput onChangeText={text => this.updateForm({description: text})}/>
            )
        } else {
            return (
                <FormInput placeholder={this.state.description}/>
            )
        }
    }

    renderPoints() {
        if (this.props.navigation.getParam("points", '') === '') {
            return (
                <FormInput onChangeText={text => this.updateForm({points: text})}/>
            )
        } else {
            return (
                <FormInput placeholder={this.state.points}/>
            )
        }
    }

    render() {
        return <ScrollView>

            <FormLabel>Title</FormLabel>
            {this.renderTitle()}

            <FormLabel>Description</FormLabel>
            {this.renderDescription()}

            <FormLabel>Points</FormLabel>
            {this.renderPoints()}

            <FormLabel>Right choice</FormLabel>
            <FormInput onChangeText={text => this.updateForm({instructions: text})}/>

            <FormLabel>Please pick one of the following:</FormLabel>
            <RadioGroup>
                <RadioButton value={'choice1'}>
                    <Text>A. Choice text can be of any length</Text>
                </RadioButton>

                <RadioButton value={'choice2'}>
                    <Text>B. Note the space between the radio button and the text</Text>
                </RadioButton>

                <RadioButton value={'choice3'}>
                    <Text>C. Clicking on any parts of this text selects the radio button</Text>
                </RadioButton>

                <RadioButton value={'choice4'}>
                    <Text>D. None of the above</Text>
                </RadioButton>
            </RadioGroup>

            <Button onPress={this.createMultipleChoiceQuestion}
                    backgroundColor="white"
                    color="black"
                    title="Submit"/>
            <Button backgroundColor="black"
                    color="white"
                    title="Cancel"
                    onPress={() => this.props.navigation
                        .navigate('QuestionList')}/>
            <Button onPress={this.deleteQuestion}
                    backgroundColor="white"
                    color="black"
                    title="Delete" />
            <Button
                backgroundColor="black"
                color="white"
                title="Add Choice" />
            <Button
                backgroundColor="white"
                color="black"
                title="Delete Choice" />
        </ScrollView>
    }
}

export default MultipleChoiceQuestion