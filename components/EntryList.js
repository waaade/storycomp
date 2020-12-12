import React from 'react';
import foreachObject from '../utils/foreach-object'

class EntryList extends React.Component {
    buildEntry(entry) {
        return <Entry data={entry.data} key={entry.id} />;
    }
    //Build an array of project components 
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
            <div>
            {this.buildList(this.props.entries)}
            </div>
            </div>
        )
    }
}

//This is one item in a Project list. Clicking it will open the project (i.e. show its Entries)
class Entry extends React.Component {
    render() {
        return (
        <div>
        <p>{this.props.data.name}</p>
        </div>);
    }
}

export { EntryList, Entry }