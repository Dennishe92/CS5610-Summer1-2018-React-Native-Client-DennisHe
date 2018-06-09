// import React from 'react'
// import {Picker, Text, View} from 'react-native'
// import {Button} from 'react-native-elements'
//
// class ExamEditor extends React.Component {
//     static navigationOptions = {title: 'Assignments'}
//     constructor(props) {
//         super(props)
//         this.state = {
//             title: '',
//             description: '',
//             lessonId: 1,
//             widgetId: 1,
//             questionType: ''
//         };
//     }
//
//     componentDidMount() {
//         const lessonId = this.props.navigation.getParam("lessonId", 1);
//         const widgetId = this.props.navigation.getParam("widgetId", 1);
//         const title = this.props.navigation.getParam("title")
//         this.setState({lessonId : lessonId});
//         this.setState({widgetId : widgetId});
//         this.setState({title : title})
//     }
//
//     render() {
//         return (
//             <View style={{padding: 15}}>
//
                {/*<Picker*/}
                    {/*onValueChange={(itemValue, itemIndex) =>*/}
                        {/*this.setState({questionType: itemValue})}*/}
                    {/*selectedValue={this.state.questionType}>*/}
                    {/*<Picker.Item value="TF" label="Multiple choice" />*/}
                    {/*<Picker.Item value="ES" label="Essay" />*/}
                    {/*<Picker.Item value="TF" label="True or false" />*/}
                    {/*<Picker.Item value="FB" label="Fill in the blanks" />*/}
                {/*</Picker>*/}
//
//                 {/*<Button onPress={()=> {*/}
//                     {/*if (this.state.questionType === "TF") {*/}
//                         {/*this.props.navigation.navigate("TrueFalseQuestion",*/}
//                             {/*{widgetId: this.state.widgetId})*/}
//                     {/*}*/}
//                     {/*else if (this.state.questionType == "ES") {*/}
//                         {/*this.props.navigation.navigate("EssayQuestion",*/}
//                             {/*{widgetId: this.state.widgetId})*/}
//                     {/*}*/}
//                     {/*else if (this.state.questionType == "TF") {*/}
//                         {/*this.props.navigation.navigate("TrueFalseQuestion",*/}
//                             {/*{widgetId: this.state.widgetId})*/}
//                     {/*}*/}
//                     {/*else (this.state.questionType == "FB") {*/}
//                         {/*this.props.navigation.navigate("FillTheBlankQuestion",*/}
//                             {/*{widgetId: this.state.widgetId})*/}
//                     {/*}*/}
//                         {/*}}/>*/}
//                 {/*<View>*/}
//                     {/*{this.state.widgetType === "Assignment" &&*/}
//                     {/*<Assignment lessonId={this.state.lessonId}/>}*/}
//                     {/*{this.state.widgetType === "Exam" &&*/}
//                     {/*<Exam lessonId={this.state.lessonId}/>}*/}
//                 {/*</View>*/}
//             </View>
//         )
//     }
// }
// export default ExamEditor;
