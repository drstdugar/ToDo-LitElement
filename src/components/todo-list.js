import { LitElement, html, css } from 'lit';
import './todo-item';

export class ToDoList extends LitElement {
  static get styles() {
    return css`
      .task-list {
        width: 50%;
        margin: 0 auto;
        background: aliceblue;
        border-radius: 5px;
      }

      h3 {
        padding: 5px;
        color: rgb(65, 63, 63);
        margin: 0;
      }
    `;
  }

  static get properties() {
    return {
      tasks: {
        type: Array,
      },
      task: {
        type: Object,
      },
    };
  }

  render() {
    return html`
      <div class="task-list">
        <h3>Tasks</h3>
        ${this.tasks.map(
          (task) =>
            html`<todo-item
              .task=${task}
              @done=${(e) => this.clickedDone(e.detail.id)}
              @delete=${(e) => this.clickedDelete(e.detail.id)}
            >
            </todo-item>`
        )}
      </div>
    `;
  }

  clickedDone(id) {
    this.dispatchEvent(new CustomEvent('done', { detail: { id: id } }));
  }

  clickedDelete(id) {
    this.dispatchEvent(new CustomEvent('delete', { detail: { id: id } }));
  }
}

customElements.define('todo-list', ToDoList);
