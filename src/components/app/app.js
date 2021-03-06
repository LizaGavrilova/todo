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

    this.createTodoItem = (label) => {
      return {
        label: label,
        important: false,
        done: false,
        id: this.maxId++        
      };
    };

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch')
      ],
      filter: 'all',
      search: ''
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
      const newItem = this.createTodoItem(text)

      this.setState(({ todoData }) => {
        const newArr = [...todoData, newItem];  
        return {
          todoData: newArr
        };      
      });
    };

    this.toggleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};

      return [...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)];
    }

    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'important')
        };
      });
    };

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'done')
        };
      });
    };

    this.onFilterChange = (filter) => {
      this.setState({ filter });
    };

    this.onSearchChange = (search) => {
      this.setState({ search });
    };

    this.filterItems = (items, filter) => {
      if (filter === 'all') {
        return items;
      } else if (filter === 'active') {
        return items.filter((item) => (!item.done))
      } else if (filter === 'done') {
        return items.filter((item) => item.done);
      }
    };

    this.searchItems = (items, search) => {
      if (search.length === 0) {
        return items;
      }
      // return items.filter((item) => item.label.indexOf(search) > -1)
      return items.filter((item) => {
        return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
    };
  }

  render() {
    const {todoData, filter, search} = this.state;
    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;
    const visibleItems = this.searchItems(this.filterItems(todoData, filter), search)

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={filter}
                            onFilterChange={this.onFilterChange} />
        </div>
  
        <TodoList todos={visibleItems}
                  onDeleted={this.deleteItem}
                  onToggleImportant={this.onToggleImportant}
                  onToggleDone={this.onToggleDone} />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
