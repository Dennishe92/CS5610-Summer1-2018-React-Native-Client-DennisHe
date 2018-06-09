import React, {Component} from 'react'
import {View, Picker, ScrollView} from 'react-native'
import {Text, ListItem, Button, FormLabel} from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1
        }
    }
    componentDidMount() {
        //const {navigation} = this.props;
        const lessonId = this.props.navigation.getParam("lessonId")
        this.setState({lessonId: lessonId})
        fetch("http://10.110.97.251:8080/api/lesson/"+lessonId+"/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }

    componentWillReceiveProps(newProps) {
        this.setState({lessonId: newProps.match.params.lessonId});
        fetch("http://localhost:8080/api/lesson/"+ this.state.lessonId+"/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }

    render() {
        return(
            <ScrollView style={{padding: 15}}>

                {this.state.widgets.map(
                    (widget, index) => {
                        if (widget.widgetType === 'Assignment') {
                            return (
                                <ListItem onPress={() => this.props.navigation
                                    .navigate("Assignment", {
                                        lessonId: this.state.lessonId,
                                        widgetId: widget.id,
                                        title: widget.title,
                                        description: widget.description,
                                        points: widget.points
                                    })}
                                          key={index}
                                          subtitle={widget.description}
                                          title={widget.title}/>)
                        }
                        if (widget.widgetType === 'Exam') {
                            return (
                                <ListItem onPress={() => this.props.navigation
                                    .navigate("QuestionList", {
                                        lessonId: this.state.lessonId,
                                        examId: widget.id,
                                        examTitle: widget.title
                                    })}
                                          key={index}
                                          subtitle={widget.description}
                                          title={widget.title}/>)}
                    })}

                <FormLabel>Click on a widget you'd like to add.</FormLabel>
                <Button	backgroundColor="##6699ff"
                           onPress={() => this.props.navigation
                               .navigate("Assignment", {lessonId:
                                   this.state.lessonId})}
                           color="white"
                           title="Add Assignment"/>
                <Button	backgroundColor="#3366ff"
                           onPress={() => this.props.navigation
                               .navigate("Exam", {lessonId:
                                   this.state.lessonId})}
                           color="white"
                           title="Add Exam"/>
            </ScrollView>
        )
    }
}
export default WidgetList