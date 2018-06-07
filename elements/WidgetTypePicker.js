import React from 'react'
import {Picker, View} from 'react-native'
import Assignment from './Assignment'

class WidgetTypePicker extends React.Component {
    static navigationOptions = {title: 'Adding Widget'}
    constructor(props) {
        super(props)
        this.state = {
            lessonId: 1,
            widgetType: 'Assignment'
        }
    }
    componentDidMount() {
        const lessonId = this.props.navigation.getParam("lessonId")
        this.setState({
            lessonId: lessonId
        })
    }


    render() {
        return (
            <View style={{padding: 15}}>

                <Picker
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({widgetType: itemValue})}
                    selectedValue={this.state.widgetType}>
                    <Picker.Item value="Assignment" label="Assignment" />
                    <Picker.Item value="Exam" label="Exam" />
                </Picker>
                <View>
                    {this.state.widgetType === "Assignment" &&
                    <Assignment lessonId={this.state.lessonId}/>}
                    {this.state.widgetType === "Exam" &&
                    <Exam lessonId={this.state.lessonId}/>}
                </View>
            </View>
        )
    }
}

export default WidgetTypePicker