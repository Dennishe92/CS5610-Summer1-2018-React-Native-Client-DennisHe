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
            points: '',
            widgetType: 'Assignment',
            lessonId: 1,
            widgetId: 1
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
        const title = this.props.navigation.getParam("title", '');
        const description = this.props.navigation.getParam("description", '');
        const points = this.props.navigation.getParam("points", '');
        this.setState({lessonId : lessonId});
        this.setState({widgetId : widgetId});
        this.setState({title : title});
        this.setState({description : description});
        this.setState({points : points});

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

    createAssignment() {
        var temp = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            widgetType: this.state.widgetType
        }
        this.assignmentService.createAssignment(this.state.lessonId, temp)
            .then(this.props.navigation.goBack())

    }

    deleteAssignment(widgetId) {
        this.assignmentService.deleteAssignment(widgetId)
            .then(this.props.navigation.navigate("WidgetList"))
    }

    render() {
        return (
            <ScrollView>
                <FormLabel>Title</FormLabel>
                {this.renderTitle()}
                {/*<FormInput onChangeText={text => this.updateForm({title: text})}/>*/}
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                {this.renderDescription()}
                {/*<FormInput onChangeText={text => this.updateForm({description: text})}/>*/}
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                {this.renderPoints()}
                {/*<FormInput onChangeText={text => this.updateForm({points: text})}/>*/}
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

                <View style={{padding: 15}}>

                    <FormLabel>Title:{this.state.title}</FormLabel>
                    <FormLabel>Description:{this.state.description}</FormLabel>
                    <FormLabel>Points:{this.state.points}</FormLabel>
                    <TextInput
                        style={{height: 100}}
                        multiline = {true}
                        numberOfLines = {4}
                        autoCapitalize = "none"
                        placeholder="Write your solutions here"
                    />
                    <FormLabel>Upload a file</FormLabel>
                    <Button title="Choose file"/>
                    <FormLabel>Submit a link</FormLabel>
                    <FormInput/>
                    <Button
                        backgroundColor="black"
                        color="white"
                        title="Cancel"/>
                    <Button
                        backgroundColor="white"
                        color="black"
                        title="Submit"/>

                    {/*<Text h4>PREVIEW</Text>*/}
                    {/*<Text>{this.state.title} </Text>*/}
                    {/*<Text>{this.state.points} </Text>*/}

                    {/*<Text h2>Essay Answer</Text>*/}
                    {/*<TextInput underlineColorAndroid = "transparent"*/}
                               {/*multiline = {true}*/}
                               {/*numberOfLines = {4}*/}
                               {/*placeholder = "Essay Sample"*/}
                               {/*placeholderTextColor = "#9a73ef"*/}
                               {/*autoCapitalize = "none"/>*/}

                    {/*<Text h2>Upload a file</Text>*/}
                    {/*<Button title="Choose file"/>*/}

                    {/*<Text h2>Submit a link</Text>*/}
                    {/*<TextInput underlineColorAndroid = "transparent"*/}
                               {/*placeholder = "Insert link"*/}
                               {/*placeholderTextColor = "#9a73ef"*/}
                               {/*autoCapitalize = "none"/>*/}

                </View>


            </ScrollView>




        )
    }
}
export default Assignment;