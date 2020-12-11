import React from 'react'; 
import getProjects from '../utils/getProjects'
import getEntries from '../utils/getEntries'
import { ProjectList, Project } from '../components/Project'
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
    }
    //Async because we need the items from firestore before rendering
    async componentDidMount() {
        this.setState({projects: await getProjects(this.props.uid)});
        this.setState({loading: false});
        this.setState({entries: await getEntries(this.props.uid)});
    }
    componentDidUpdate(prevState) {
        if (this.state.showing == "entries") {
            //TODO: getEntries(uid, projectId)
        }
    }
    //This function must be given to Project components as a prop.
    //It is called when a Project is clicked so that the Browser will show the entries
    //https://stackoverflow.com/questions/35537229/how-to-update-parents-state-in-react
    showEntries(whichProject) {
        this.setState({showing: "entries"});
        this.setState({currentProject: whichProject});
    }
    //Pass this function to EntryList
    goBack() {
        this.setState({showing: "projects"});
    }
    render() {
        if (this.state.showing == "projects") {
            return (
            <div>
            <p>Jack Frost says "hee ho!"</p>
            {this.state.loading ? <Ring /> : <ProjectList projects={this.state.projects} handler={this.showEntries} />}
            </div>
            );
        }
        else if (this.state.showing == "entries") {
            return (
                <p>I'mma gonna show you entries now -Mario</p>
            )
        }
        else {
            return (<div><p>Impossible....</p></div>);
        }
    }
}


export { Browser };