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
        return <Entry data={entry.data} key={entry.id} id={entry.id}/>;
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
        <td><Popup trigger={<div className="divButton">Edit</div>} modal>
            <EditEntry data={this.state.data} id={this.props.id} handler={this.clientEdits}/></Popup></td>
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
      }
      catch (error) {
        console.log(error);
      }
      
    }}
  >
  {({isSubmitting}) => (
    <Form>
    <label htmlFor="name">Name</label>
          <Field name="name" placeholder="Jane" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
  )}
  </Formik>
  </div>
  );
};
// class EditEntry extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: this.props.data.name,
//             type: this.props.data.type
//         };
//         this.handleChange = this.handleChange.bind(this);
//         this.sendChanges = this.sendChanges.bind(this);

//     }
//     handleChange(event) {
//         const target = event.target;
//         const value = target.value;
//         const name = target.name;
//         this.setState({
//             [name]: value
//         });
//     }
//     async sendChanges() {
//         const changes = {
//             name: this.state.name,
//         };
//         console.log(changes);
//         // const ref = db.collection('entries').doc(id);
//         // const res = await ref.update(changes);
//     }
//     render() {
//         return (
//             <Popup trigger={<div className="divButton">Edit</div>} 
//             modal >
//             <form onSubmit={this.handleSubmit}> 
//                 <label>
//                     Name:
//                     <input
//                         name="name"
//                         type="input"
//                         value={this.state.name}
//                         onChange={this.handleChange} />
//                 </label>
//                 <button onClick={this.sendChanges}>Save</button>
//             </form>
//             </Popup>
//         )
//     }
// }

export { EntryList, Entry }