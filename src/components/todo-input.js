import { LitElement, html, css } from 'lit';

export class ToDoInput extends LitElement {
  static get styles() {
    return css`
      .task-input {
        width: 50%;
        margin: 25px auto;
        display: flex;
      }

      input {
        margin-right: 10px;
        padding: 7px;
        flex: 8;
        font-family: Georgia, 'Times New Roman', Times, serif;
        border-radius: 5px;
        border: 2px solid rgb(9, 158, 138);
        font-size: 15px;
        color: rgb(9, 158, 138);
      }

      input::placeholder {
        color: rgb(9, 158, 138);
      }

      input:focus {
        border: 2px solid rgb(11, 109, 96);
        outline: none;
      }

      button {
        flex: 2;
        padding: 4px 8px;
        cursor: pointer;
        background: rgb(26, 190, 169);
        border: none;
        border-radius: 5px;
        color: aliceblue;
        font-family: Georgia, 'Times New Roman', Times, serif;
        font-size: 15px;
      }

      button:hover {
        background: rgb(9, 158, 138);
      }
    `;
  }

  render() {
    return html`
      <div class="task-input">
        <input
          type="text"
          placeholder="Enter Task Here..."
          id="enter-task"
          @keydown=${(e) => this.onEnter(e.code)}
        />
        <button id="add-task" @click=${this.submitTask}>Add Task</button>
      </div>
    `;
  }

  /**
   * Submits new Task on enter pressed
   *
   * @param {String}
   */
  onEnter(key) {
    if (key === 'Enter') this.submitTask();
  }

  submitTask() {
    let task = this.shadowRoot.querySelector('#enter-task');

    if (task.value)
      this.dispatchEvent(
        new CustomEvent('add', { detail: { task: task.value } })
      );

    task.value = '';
  }
}

customElements.define('todo-input', ToDoInput);
