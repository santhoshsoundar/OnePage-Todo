import React, { Component } from "react";
import "./styles.css";

export default class App extends Component {
  state = {
    userName: "Adam",
    todoItems: [
      { actions: "task 1 ", done: false },
      { actions: "task 2 ", done: false },
      { actions: "task 3 ", done: false },
      { actions: "task 4 ", done: false }
    ],
    nextItemText: ""
  };

  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Adam" ? "Rob" : "Adam"
    });
  };

  updateNewTextValue = event => {
    this.setState({
      nextItemText: event.target.value
    });
  };

  createNewTodo = () => {
    if (
      !this.state.todoItems.find(
        item => item.action === this.state.nextItemText
      )
    ) {
      this.setState(
        {
          todoItems: [
            ...this.state.todoItems,
            { actions: this.state.nextItemText, done: false }
          ],
          nextItemText: ""
        },
        () => localStorage.setItem("todos", JSON.stringify(this.state))
      );
      console.table(this.state.todoItems);
    }
  };

  toggleTodo = todo =>
    this.setState({
      todoItems: this.state.todoItems.map(item =>
        item.actions === todo.actions ? { ...item, done: !item.done } : item
      )
    });

  todoTableRows = doneValue =>
    this.state.todoItems
      .filter(item => item.done === doneValue)
      .map((item, idx) => (
        <tr key={item.actions + idx * Math.random()}>
          <td>{item.actions}</td>
          <td>
            {" "}
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => this.toggleTodo(item)}
            />
          </td>
        </tr>
      ));

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(
      data != null
        ? JSON.parse(data)
        : {
            userName: "Adam",
            todoItems: [
              { actions: "task 1 ", done: false },
              { actions: "task 2 ", done: false },
              { actions: "task 3 ", done: false },
              { actions: "task 4 ", done: false }
            ],
            nextItemText: ""
          }
    );
  };

  render = () => (
    <div className="App">
      <h4>
        {this.state.userName}'s To Do List. (
        {this.state.todoItems.filter(item => !item.done).length} items to do)
      </h4>

      <div className="container-fluid">
        <div>
          <input
            type="text"
            className="form-control"
            value={this.state.nextItemText}
            onChange={this.updateNewTextValue}
          />
          <button onClick={this.createNewTodo}>Add</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows(false)}</tbody>
        </table>
      </div>

      <button onClick={this.changeStateData}> Change </button>

      <br />
      <div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows(true)}</tbody>
        </table>
      </div>
    </div>
  );
}
