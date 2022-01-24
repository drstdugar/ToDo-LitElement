import { LitElement, html, css } from 'lit';
import './components/todo-input';
import './components/todo-list';

export class ToDoApplication extends LitElement {
  constructor() {
    super();

    this.tasks = [{ id: 1, task: 'Shopping', done: false }];
  }

  /**
   * Gets style.
   *
   * @returns {Array}
   */

  static get styles() {
    return [
      css`
        main {
          height: 100vh;
          background: linear-gradient(
            rgba(83, 236, 198, 0.5),
            rgba(111, 241, 209, 0.5),
            rgba(142, 231, 208, 0.5)
          );
          background-repeat: no-repeat;
          background-size: cover;
          font-family: Georgia, 'Times New Roman', Times, serif;
        }

        .title {
          width: 100%;
          background: rgb(7, 128, 111);
          padding: 10px;
        }

        h1 {
          color: aliceblue;
          margin: 0 auto;
          width: 90%;
        }
      `,
    ];
  }

  static get properties() {
    return {
      tasks: {
        type: Array,
      },
    };
  }

  render() {
    return html`
      <main>
        <div class="title">
          <h1>ToDos</h1>
        </div>
        <todo-input @add="${(e) => this.addTask(e.detail.task)}"> </todo-input>
        <todo-list
          .tasks=${this.tasks}
          @done=${(e) => this.completeTask(e.detail.id)}
          @delete=${(e) => this.deleteTask(e.detail.id)}
        >
        </todo-list>
      </main>
    `;
  }

  /**
   * Deletes Task
   *
   * @param {number}
   */
  deleteTask(id) {
    let ind;

    this.tasks.forEach((task, index) => {
      if (task.id === id) {
        ind = index;
      }
    });

    this.tasks = [...this.tasks.slice(0, ind), ...this.tasks.slice(ind + 1)];
  }

  /**
   * Strikes out completed Task
   *
   * @param {number}
   */
  completeTask(id) {
    let ind, doneTask;

    this.tasks.forEach((task, index) => {
      if (task.id === id) {
        ind = index;
        doneTask = {
          ...task,
          ...{ done: !task.done },
        };
      }
    });

    this.tasks = [
      ...this.tasks.slice(0, ind),
      doneTask,
      ...this.tasks.slice(ind + 1),
    ];
  }

  /**
   * Adds new Task
   *
   * @param {String}
   */
  addTask(task) {
    let id = this.tasks.length ? this.tasks[0].id + 1 : 1;

    const tasks = { id: id, task: task, done: false };

    this.tasks = [tasks, ...this.tasks];
  }
}

customElements.define('todo-app', ToDoApplication);
