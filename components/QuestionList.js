import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import ExamService from '../services/ExamService'

class QuestionList extends Component {
    static navigationOptions = {title: this.state.examTitle}
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            examId: 1,
            examTitle: '',
            questionType: ''
        }

        //Service
        this.examService = ExamService.instance;
    }

    componentDidMount() {
        const examId = this.props.navigation.getParam("widgetId")
        const examTitle = this.props.navigation.getParam("widgetTitle")
        this.setState({examId: examId})
        this.setState({examTitle: examTitle})
        fetch("http://10.110.97.251:8080/api/exam/"+examId+"/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }

    componentWillReceiveNewProps(newProps) {
        this.setState({examId: newProps.match.params.widgetId});
        fetch("http://localhost:8080/api/exam/"+ this.state.examId+"/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }

    deleteExam(examId) {
        this.examService.deleteExam(examId);
    }

    render() {
        return(
            <ScrollView style={{padding: 15}}>
                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            onPress={() => {
                                if(question.type === "TrueFalseQuestion")
                                    this.props.navigation
                                        .navigate("TrueFalseQuestionEditor",
                                            {examId: this.state.examId,
                                                questionId: question.id,
                                                title: question.title,
                                                description: question.description,
                                                points: question.points})
                                if(question.type === "MultipleChoiceQuestion")
                                    this.props.navigation
                                        .navigate("MultipleChoiceQuestionEditor",
                                            {examId: this.state.examId,
                                                questionId: question.id,
                                                title: question.title,
                                                description: question.description,
                                                points: question.points})
                                if(question.type === "FillTheBlankQuestion")
                                    this.props.navigation
                                        .navigate("FillTheBlankQuestionEditor",
                                            {examId: this.state.examId,
                                                questionId: question.id,
                                                title: question.title,
                                                description: question.description,
                                                points: question.points})
                                if(question.type === "EssayQuestion")
                                    this.props.navigation
                                        .navigate("EssayQuestionEditor",
                                            {examId: this.state.examId,
                                                questionId: question.id,
                                                title: question.title,
                                                description: question.description,
                                                points: question.points})
                            }}
                            key={index}
                            subtitle={question.description}
                            title={question.title}/>))}

                <Picker
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({type: itemValue})}
                    selectedValue={this.state.type}>
                    <Picker.Item value="MultipleChoiceQuestionEditor" label="Multiple choice" />
                    <Picker.Item value="EssayQuestionEditor" label="Essay" />
                    <Picker.Item value="TrueFalseQuestionEditor" label="True or false" />
                    <Picker.Item value="FillTheBlankQuestionEditor" label="Fill in the blanks" />
                </Picker>

                <Button	backgroundColor="green"
                           color="black"
                           title="Add question"
                           onPress={() => this.props.navigation
                               .navigate(this.state.Questiontype, {ExamId: this.state.examId})}/>
                <Button	backgroundColor="grey"
                           color="white"
                           title="Cancel"
                           onPress={() => this.props.navigation
                               .navigate("WidgetList")}/>
                <Button onPress={() => this.deleteExam(this.state.examId)}
                        backgroundColor="red"
                        color="white"
                        title="Delete exam"/>

            </ScrollView>
        )
    }
}
export default QuestionList