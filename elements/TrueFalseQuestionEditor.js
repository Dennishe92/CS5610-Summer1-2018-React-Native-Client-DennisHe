import React from 'react'
import {View} from 'react-native'
import {Button, CheckBox, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements'
import QuestionService from "../services/QuestionService";

class TrueFalseQuestionEditor extends React.Component {

    static navigationOptions = {title: 'True False Question'}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: '',
            instructions: '',
            questionId: 0,
            examId: 0,
            type: 'TrueFalseQuestion',
            isTrue: true
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

    createTrueFalseQuestion() {
        var tmp = {
            points: this.state.points,
            title: this.state.title,
            description: this.state.description,
            instructions: this.state.instructions,
            type: 'TrueFalseQuestion'
        }

        this.QuestionService
            .createTrueFalseQuestion(this.state.examId, tmp)
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
        return(
            <View>
                <FormLabel>Title</FormLabel>
                {this.renderTitle()}
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                {this.renderDescription()}
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                {this.renderPoints()}
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <CheckBox title='The answer is true'
                          onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                          checked={this.state.isTrue}/>

                <Button onPress={this.createTrueFalseQuestion}
                        backgroundColor="white"
                        color="black"
                        title="Submit"/>
                <Button	backgroundColor="black"
                           color="white"
                           title="Cancel"
                           onPress={() => this.props.navigation
                               .navigate('QuestionList')}/>
                <Button onPress={this.deleteQuestion}
                        backgroundColor="white"
                        color="black"
                        title="Delete" />
            </View>
        )
    }
}

export default TrueFalseQuestionEditor