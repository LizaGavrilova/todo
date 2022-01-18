import React, { Component } from "react";

import './todo-list-item.css';

class TodoListItem extends Component {

    constructor() {
        super();

        this.state = {
            done: false,
            important: false
        };

        this.onlabelClick = () => {
            this.setState((state) => {
                return {
                    done: !state.done
                };
            });
        };

        this.onMarkImportant = () => {
            this.setState((state) => {
                return {
                    important: !state.important                    
                };
            });
        };
    }

    render() {
        const { label, onDeleted } = this.props;
        const { done, important } = this.state;

        let classNames = 'todo-list-item';
        if (done) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }
        
        return (
            <span className={ classNames }>
                <span className="todo-list-item-label"
                    onClick={ this.onlabelClick }>
                    { label }
                </span>
    
                <button type="button"
                        className="btn btn-outline-success btn-sm float-end"
                        onClick={this.onMarkImportant}>
                    <i className="fa fa-exclamation"></i>
                </button>
    
                <button type="button"
                        className="btn btn-outline-danger btn-sm float-end"
                        onClick={onDeleted}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </span>
        );
    }
}

// const TodoListItemFunc = ({ label, important = false}) => {
//     const style = {
//         color: important ? 'steelblue' : 'black',
//         fontWeight: important ? 'bold' : 'normal'
//     }
//     return (
//         <span className="todo-list-item">
//             <span className="todo-list-item-label"
//                 style={style}>
//                 { label }
//             </span>

//             <button type="button"
//                     className="btn btn-outline-success btn-sm float-end">
//                 <i className="fa fa-exclamation"></i>
//             </button>

//             <button type="button"
//                     className="btn btn-outline-danger btn-sm float-end">
//                 <i className="fa fa-trash-o"></i>
//             </button>
//         </span>
//     );
// };

export default TodoListItem;