import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';

import './app.css';

export default class App extends Component {

  constructor() {
    super();

    this.maxId = 100;

    this.state = {
      todoData: [
        {label: 'Drink Coffee', important: false, id: 1},
        {label: 'Make Awesome App', important: true, id: 2},
        {label: 'Have a lunch', important: false, id: 3}
      ]
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);

        const before = todoData.slice(0, idx);
        const after = todoData.slice(idx + 1);
        const newArray = [...before, ...after];

        return {
          todoData: newArray
        };
      })
    };

    this.addItem = (text) => {
      const newItem = {
        label: text,
        important: false,
        id: this.maxId++
      };

      this.setState(({ todoData }) => {
        const newArr = [...todoData, newItem];  
        return {
          todoData: newArr
        };      
      });
    };
  }

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList todos={this.state.todoData}
                  onDeleted={this.deleteItem} />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
