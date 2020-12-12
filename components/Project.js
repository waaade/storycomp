import React from 'react'; 
import foreachObject from '../utils/foreach-object'
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";

//http://react.tips/how-to-create-components-dynamically-in-react-16/
//Needs a collection of projects in props
class ProjectList extends React.Component {
    buildProject(project) {
        return <Project data={project.data} id={project.id} key={project.id} handler={this.props.handler} />;
    }
    //Build an array of project components 
    buildList(projects) {
        let list = null;
        foreachObject (projects, element => {
            console.log(element)
            if (!list) {
                list = [this.buildProject(element)];
            }
            else {
                list.push(this.buildProject(element));
            }
        });
        return list;
    }
    render() {
        return (
            <Row justify="center">
            {this.buildList(this.props.projects)}
            </Row>
        )
    }
}

//This is one item in a Project list. Clicking it will open the project (i.e. show its Entries)
class Project extends React.Component {
    render() {
        console.log(this.props.id);
        return (
        <Col span={3}>
        <button onClick = {()=>this.props.handler(this.props.id)}>
        <h3>{this.props.data.name}</h3></button>
        </Col>);
    }
}

export {ProjectList, Project }