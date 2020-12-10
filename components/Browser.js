import React from 'react';
import foreachObject from '../utils/foreach-object'
import getProjects from '../utils/getProjects'

//This component shows a user's projects and their entires

class Browser extends React.Component {
    //This component should be given a collection of either projects or entries
    constructor(props) {
        super(props);
        this.state = {
            showing: "projects",
        };
    }
    async componentDidMount() {
        if (this.state.showing == "projects") {
            this.setState({projects: await getProjects(this.props.uid)});
        }
    }
    render() {
        if (this.state.showing == "projects") {
            return (
            <div>
            <p>Jack Frost says "hee ho!"</p>
            <ProjectList projects={this.state.projects}/>
            </div>
            );
        }
        else {
            return (<div><p>Impossible....</p></div>);
        }
    }
}

//http://react.tips/how-to-create-components-dynamically-in-react-16/
//Needs a collection of projects in props
class ProjectList extends React.Component {
    getProject(project) {
        return <Project data={project.data} key={project.id} />;
    }
    //Build an array of project components 
    buildList(projects) {
        let list = null;
        foreachObject (projects, element => {
            console.log(element)
            if (!list) {
                list = [this.getProject(element)];
            }
            else {
                list.push(this.getProject(element));
            }
        });
        return list;
    }
    render() {
        return (
            <div>
            {this.buildList(this.props.projects)}
            </div>
        )
    }
}

class Project extends React.Component {
    render() {
        return (<div><h3>{this.props.data.name}</h3></div>);
    }
}

export { Browser, ProjectList, Project };