const template = document.createElement("template");
template.innerHTML = `
     <link rel="stylesheet" href="style.css">
     <article>
      <div>
        <input type="text" id = "input-todo">
        <button id = "add-Todo" class = "primary-button">Add Todo</button>
        
      </div>
      <div id="todoListContainer">
      
      </div>
    </article>

`;
class todoele extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.template = template;
    this.todos = [
      {
        id: 1,
        value: "complete Task",
        checked: false,
      },
      {
        id: 2,
        value: "complete Task 01",
        checked: false,
      },
      {
        id: 3,
        value: "complete Task 02",
        checked: false,
      },
    ];
  }
  renderTodos(ele) {
    ele.innerHTML = "";
    this.todos.forEach((todo) => {
      let todoele = document.createElement("li");

      ele.appendChild(todoele);
      todoele.innerHTML = `
            <div class  = "todos-container">
            <input type = "checkbox"  ${
              todo.checked ? "checked" : ""
            } class="checkbox" data-checked = ${todo.checked} data-id = ${
        todo.id
      }/>
            <span class = "${todo.checked ? "strike" : ""}">
            ${todo.value} 
            </span>
            ${
              todo.checked
                ? `
              <button class= "delete-Todo primary-button" data-id=${todo.id}>delete Todo</button>
                </div>
                `
                : ""
            }
            
            `;
      this.allTodos = this.shadowRoot.querySelectorAll(".delete-Todo");
      this.allTodos.forEach((button) => {
        button.addEventListener("click", (e) => this.deleteTodos(e.target));
      });
    });
    this.checkBox = this.shadowRoot.querySelectorAll(".checkbox");
    this.checkBox.forEach((box) => {
      box.addEventListener("change", (e) => {
        this.toggleChecked(e);
      });
    });
  }
  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.todoListContainer =
      this.shadowRoot.querySelector("#todoListContainer");
    this.renderTodos(this.todoListContainer);
    this.inputTodo = this.shadowRoot.querySelector("#input-todo");
    this.addTodo = this.shadowRoot.querySelector("#add-Todo");
    this.allTodos = this.shadowRoot.querySelectorAll(".delete-Todo");
    this.checkBox = this.shadowRoot.querySelectorAll(".checkbox");
    this.addTodo.addEventListener("click", (e) => this.addTodos(e));
  }
  addTodos(e) {
    let value = this.inputTodo.value;
    if (value == "") {
      return;
    }
    this.todos.push({
      id: Date.now(),
      value: value,
      checked: false,
    });
    this.renderTodos(this.todoListContainer);
    this.inputTodo.value = "";
  }

  toggleChecked(e) {
    let target = e.target;
    let value = target.dataset.checked;
    let id = target.dataset.id.split("/")[0];

    console.log(value.split("/")[0]);

    this.todos = this.todos.map((todo) => {
      if (todo.id == id) {
        console.log(target);

        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    this.renderTodos(this.todoListContainer);
  }

  deleteTodos(todo) {
    let value = todo.dataset.id;
    this.todos = this.todos.filter((todo) => todo.id != value);
    console.log(this.todos);
    this.renderTodos(this.todoListContainer);
  }

  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attribute changed", name, oldValue, newValue, this);
  }
}

customElements.define("todo-list", todoele);
