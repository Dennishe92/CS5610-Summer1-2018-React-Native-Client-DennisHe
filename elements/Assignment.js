import React from 'react'
import AssignmentService from '../services/AssignmentService'
import {Text, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import {ScrollView, View, TextInput} from 'react-native';
import QuestionTypeButtonGroupChooser from "./QuestionTypeButtonGroupChooser";

class Assignment extends React.Component {
    static navigationOptions = {title: 'Assignments'}
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            points: 0,
            lessonId: 1,
            widgetId: 1,
            assignments: []
            // assignment: {title: 'New Assignment', description: 'add description'},
        };

        //Binding
        //this.createAssignment = this.createAssignment.bind(this);


        //Service
        this.assignmentService = AssignmentService.instance;
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

    createAssignment() {
        var temp = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            widgetType: 'Assignment'
        }
        this.assignmentService.createAssignment(this.state.lessonId, temp)
            .then(this.props.navigation.goBack())
        // .then(() => {
        //     this.findAllAssignmentsForLesson(this.state.lessonId)
        // });
        //maybe add something here....
    }

    deleteAssignment(widgetId) {
        this.assignmentService.deleteAssignment(widgetId)
            .then(this.props.navigation.navigate("WidgetList"))
        // .then(() => {
        //     this.findAllAssignmentsForLesson(this.state.lessonId)
        // });
    }

    render() {
        return (
            <ScrollView>
                <Text>This is an example assignment.</Text>
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

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({points: text})
                }/>
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>

                <Button onPress={() => this.createAssignment()}
                        backgroundColor="green"
                        color="white"
                        title="save"/>

                <Button onPress={() => this.props.navigation.navigate("WidgetList")}
                        backgroundColor="red"
                        color="white"
                        title="Cancel"/>

                <Button onPress={() => this.deleteAssignment(this.state.widgetId)}
                        backgroundColor="blue"
                        color="white"
                        title="delete"/>

                <View style={{padding: 15, backgroundColor: "#66ccff"}}>
                    <Text h4>PREVIEW</Text>
                    <Text>{this.state.title} </Text>
                    <Text>{this.state.points} </Text>

                    <Text h2>Essay Answer</Text>
                    <TextInput underlineColorAndroid = "transparent"
                               multiline = {true}
                               numberOfLines = {4}
                               placeholder = "Essay Sample"
                               placeholderTextColor = "#9a73ef"
                               autoCapitalize = "none"/>

                    <Text h2>Upload a file</Text>
                    <Button title="Choose file"/>

                    <Text h2>Submit a link</Text>
                    <TextInput underlineColorAndroid = "transparent"
                               placeholder = "Insert link"
                               placeholderTextColor = "#9a73ef"
                               autoCapitalize = "none"/>

                </View>


            </ScrollView>




        )
    }
}
export default Assignment;