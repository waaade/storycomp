import React from 'react'; 
import foreachObject from '../utils/foreach-object'
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import { Formik, Field, Form } from 'formik';
import firebase from 'firebase/app'
import initFirebase from '../utils/auth/initFirebase'
import 'firebase/firestore'

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
        <Col span={2}>
        <button onClick = {()=>this.props.handler(this.props.id)}>
        <h3>{this.props.data.name}</h3></button>
        </Col>);
    }
}

const NewProject = (props) => {
  return (
    <div>
  <Formik
    initialValues= {{
      name: '',
    }}
    onSubmit={async (values) => {
      try {
        initFirebase();
        let db = firebase.firestore();
        const res = await db.collection('projects').add({
            name: values.name,
            userId: props.uid
            });
        props.update();
      }
      catch (error) {
        console.log(error);
      }
      
    }}
  >
  {({isSubmitting}) => (
    <Form>
    <label htmlFor="name">Name</label>
          <Field name="name" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
  )}
  </Formik>
  </div>
  );
};

export {ProjectList, Project, NewProject }