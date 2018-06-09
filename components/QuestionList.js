import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class QuestionList extends Component {
    static navigationOptions = {title: 'Questions'}
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            examId: 1,
            examTitle: ''
        }
    }
    componentDidMount() {
        const examId = this.props.navigation.getParam("examId")
        const examTitle = this.props.navigation.getParam("examTitle")
        this.setState({examId: examId})
        this.setState({examTitle: examTitle})
        fetch("http://10.110.97.251:8080/api/exam/"+examId+"/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            onPress={() => {
                                if(question.type === "TrueFalse")
                                    this.props.navigation
                                        .navigate("TrueFalseQuestionEditor", {questionId: question.id})
                                if(question.type === "MultipleChoice")
                                    this.props.navigation
                                        .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
                                if(question.type === "Essay")
                                    this.props.navigation
                                        .navigate("EssayQuestionEditor", {questionId: question.id})
                                if(question.type === "FillTheBlank")
                                    this.props.navigation
                                        .navigate("FillTheQuestionEditor", {questionId: question.id})
                            }}
                            key={index}
                            subtitle={question.description}
                            title={question.title}/>))}
            </View>
        )
    }
}
export default QuestionList