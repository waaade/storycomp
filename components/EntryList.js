import React from 'react';
import foreachObject from '../utils/foreach-object'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Formik, Field, Form } from 'formik';
import firebase from 'firebase/app'
import initFirebase from '../utils/auth/initFirebase'
import 'firebase/firestore'


class EntryList extends React.Component {
    buildEntry(entry) {
        return <Entry data={entry.data} key={entry.id} id={entry.id} update={this.props.update}/>;
    }
     
    buildList(entries) {
        let list = null;
        foreachObject (entries, element => {
            if (!list) {
                list = [this.buildEntry(element)];
            }
            else {
                list.push(this.buildEntry(element));
            }
        });
        return list;
    }
    render() {
        return (
            <div>
            <button onClick = {this.props.handler}>Back</button>
            <Popup trigger={<div className="divButton">Add Entry</div>} modal>
          <div><h2>New Entry</h2><NewEntry uid={this.props.uid} pid={this.props.pid} update={this.props.update} /></div>
          </Popup>
            <table>
            <tbody>
            <tr>
            <th>Name</th>
            <th>Type</th>
            </tr>
            {this.buildList(this.props.entries)}
            </tbody>
            </table>
            </div>
        )
    }
}

class Entry extends React.Component {
    constructor(props) {
      super(props);
      const data = this.props.data;
      this.state = {
        data: {
          name: data.name,
          type: data.type,
        }
      };
      this.clientEdits = this.clientEdits.bind(this);
    }
    //This function ensures edits made are shown immediately.
    clientEdits(values) {
      console.log(values);
      this.setState({
        data: {
          name: values.name,
          type: this.props.data.type
        }
      });
    }
      render() {
        return (
        <tr>
        <td>{this.state.data.name}</td>
        <td>{this.state.data.type}</td>
        <td><EntryContent data={this.state.data} id={this.props.id}/></td>
        <td><Popup trigger={<div className="divButton">Edit</div>} modal><h2>{this.state.data.name}</h2>
            <EditEntry data={this.state.data} id={this.props.id} handler={this.clientEdits} update={this.props.update}/></Popup></td>
        </tr>
        );
    }
}

class EntryContent extends React.Component {
    render() {
        const data = this.props.data;
        return (
            <Popup trigger={<div className="divButton">View</div>} modal>
            <span>
            <h2>{data.name}</h2>
            <p>Name: {data.name}</p>
            <p>Type: {data.type}</p>
            </span>
            </Popup>
        )
    }
}
const EditEntry = (props) => {
  return (
    <div>
  <Formik
    initialValues= {{
      name: props.data.name,
    }}
    onSubmit={async (values) => {
      try {
        initFirebase();
        let db = firebase.firestore();
        const ref = db.collection('entries').doc(props.id);
        const res = await ref.update(values);
        props.handler(values);
        props.update();
      }
      catch (error) {
        console.log(error);
      }
      
    }}
  >
  {({isSubmitting}) => (
    <Form>
    <label htmlFor="name">Name </label>
          <Field name="name" />
          <br/>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
  )}
  </Formik>
  </div>
  );
};

const NewEntry = (props) => {
  return (
    <div>
  <Formik
    initialValues= {{
      name: '',
      type: '',
    }}
    onSubmit={async (values) => {
      try {
        initFirebase();
        let db = firebase.firestore();
        const res = await db.collection('entries').add({
            name: values.name,
            type: values.type,
            userId: props.uid,
            projectId: props.pid,
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
    <label htmlFor="name">Name </label>
        <Field name="name" />
    <br/>
    <label htmlFor="type">Type </label>
        <select
        name="type"
        // value={values.type}
      >
        <option value="Character" label="Character" />
        <option value="Location" label="Location" />
      </select>
      <br/>
    <button type="submit" disabled={isSubmitting}>
        Submit
    </button>
        </Form>
  )}
  </Formik>
  </div>
  );
};


export { EntryList, Entry }