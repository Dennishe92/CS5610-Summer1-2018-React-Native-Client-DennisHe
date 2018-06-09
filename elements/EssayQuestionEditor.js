import React, {Component} from 'react'
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
            points: 0,
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
        this.setState({examId: examId});
        this.setState({questionId: questionId});
        this.setState({title: title});
        this.setState({description: description});
    }

    createEssayQuestion() {
        var tmp = {
            points: this.state.points,
            title: this.state.title,
            description: this.state.description,
            instructions: this.state.instructions,
            type: 'EssayQuestion'
        }

        this.QuestionService
            .createEssayQuestion(this.state.examId, tmp)
    }

    deleteQuestion() {
        this.essayQuestionService
            .deleteQuestion(this.state.questionId)
    }

    renderTitle() {
        if (this.props.navigation.getParam("title", '') === '') {
            console.log("no title");
            return (
                <FormInput onChangeText={text => this.updateForm({title: text})}/>
            )
        } else {
            console.log("have title");
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

    render() {
        return(
            <View>


                <FormLabel>Title</FormLabel>
                {this.renderTitle()}

                {/*<FormInput onChangeText={text => this.updateForm({title: text})}/>*/}

                <FormLabel>Description</FormLabel>
                {this.renderDescription()}
                {/*<FormInput onChangeText={text => this.updateForm({description: text})}/>*/}

                <FormLabel>Points</FormLabel>
                {/*{this.renderPoints()}*/}
                <FormInput onChangeText={text => this.updateForm({points: text})}/>

                <TextInput
                    style={{height: 100}}
                    placeholder="This is the textarea where students can answer the question!"
                />

                <Button onPress={this.createEssayQuestion}
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

export default EssayQuestionEditor