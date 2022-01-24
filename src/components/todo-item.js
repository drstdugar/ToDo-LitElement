import { LitElement, html, css } from 'lit';

export class ToDoItem extends LitElement {
  static get styles() {
    return css`
      .tasks {
        width: 100%;
        margin: 0 auto;
        background: aliceblue;
        display: flex;
        border-top: 1px solid rgba(163, 163, 163, 0.7);
      }

      #task {
        padding: 10px 10px;
        display: inline-block;
        flex: 8;
        font-size: 16px;
        color: rgb(77, 77, 77);
        margin: 0;
      }

      button {
        flex: 1;
        padding: 2px 5px;
        cursor: pointer;
        border: none;
        background: rgb(26, 190, 169);
        border-radius: 5px;
        color: aliceblue;
        font-family: Georgia, 'Times New Roman', Times, serif;
        font-size: 15px;
        margin: 4px 5px;
      }

      #delete {
        background: rgb(240, 39, 66);
      }

      #delete:hover {
        background: rgb(224, 23, 50);
      }

      button:hover {
        background: rgb(9, 158, 138);
      }

      .strike {
        text-decoration: line-through;
        color: red;
      }
    `;
  }

  static get properties() {
    return {
      task: {
        type: Object,
      },
    };
  }

  render() {
    return html`
      <div class="tasks">
        <p id="task" class="${this.task.done ? 'strike' : ''}">
          ${this.task.task}
        </p>
        <button id="done" @click=${(e) => this.clickedDone(this.task.id)}>
          Done
        </button>
        <button id="delete" @click=${(e) => this.clickedDelete(this.task.id)}>
          Delete
        </button>
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

customElements.define('todo-item', ToDoItem);
