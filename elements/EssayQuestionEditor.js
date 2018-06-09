import React from 'react'
import {TextInput, View} from 'react-native'
import {Button, FormInput, FormLabel} from 'react-native-elements'
import QuestionService from "../services/QuestionService";

class EssayQuestionEditor extends React.Component {
    static navigationOptions = {title: 'Essay Question'}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: '',
            instructions: '',
            questionId: 0,
            examId: 0,
            type: 'EssayQuestion'
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

    createEssayQuestion() {
        var tmp = {
            points: this.state.points,
            title: this.state.title,
            description: this.state.description,
            instructions: this.state.instructions,
            type: this.state.type
        }

        this.QuestionService
            .createEssayQuestion(this.state.examId, tmp)
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


                <FormLabel>Description</FormLabel>
                {this.renderDescription()}

                <FormLabel>Points</FormLabel>
                {this.renderPoints()}

                <TextInput
                    style={{height: 100}}
                    placeholder="Text area for answers"
                />

                <Button onPress={this.createEssayQuestion}
                        backgroundColor="white"
                        color="green"
                        title="Submit"/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => this.props.navigation
                               .navigate('QuestionList')}/>
                <Button onPress={this.deleteQuestion}
                        backgroundColor="white"
                        color="purple"
                        title="Delete" />

            </View>
        )
    }
}

export default EssayQuestionEditor