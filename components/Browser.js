import React from 'react';
import foreachObject from '../utils/foreach-object' 
import getProjects from '../utils/getProjects'
import getEntries from '../utils/getEntries'
import { ProjectList, Project } from '../components/Project'
import { EntryList, Entry } from '../components/EntryList'
import { Ring } from 'react-awesome-spinners'

//Browser shows a user's projects and their entires
class Browser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: "projects",
            loading: true,
        };
        this.showEntries = this.showEntries.bind(this);
        this.goBack = this.goBack.bind(this);
        this.filterEntriesByProject = this.filterEntriesByProject.bind(this);
    }
    //Async because we need the items from firestore before rendering
    async componentDidMount() {
        this.setState({projects: await getProjects(this.props.uid)});
        this.setState({loading: false});
        this.setState({entries: await getEntries(this.props.uid)});
    }
    
    //This function must be given to Project components as a prop.
    //It is called when a Project is clicked so that the Browser will show the entries
    //https://stackoverflow.com/questions/35537229/how-to-update-parents-state-in-react
    showEntries(whichProject) {
        console.log(whichProject);
        this.setState({showing: "entries"});
        this.setState({currentProject: whichProject});
    }
    componentDidUpdate(prevState) {

    }
    //Only the entries corresponding to currentProject should be shown
    filterEntriesByProject() {
        let array = null;
        console.log(this.state.entries);
        foreachObject (this.state.entries, element => {
            if (element.data.projectId == this.state.currentProject) {
                if (!array) {
                    array = [ element ];
                }
                else {
                    array.push(element);
                }
            }
        });
        return array;
    }

    //Pass this function to EntryList
    goBack() {
        this.setState({showing: "projects"});
    }
    render() {
        if (this.state.showing == "projects") {
            return (
            <div>
            {this.state.loading ? <Ring /> : <ProjectList projects={this.state.projects} handler={this.showEntries} />}
            </div>
            );
        }
        else if (this.state.showing == "entries") {
            return (
                <div>
                <EntryList entries={this.filterEntriesByProject()} handler={this.goBack} />
                </div>
            )
        }
        else {
            return (<div><p>Impossible....</p></div>);
        }
    }
}

export { Browser };