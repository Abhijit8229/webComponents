
const template = document.createElement("template")
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

`
class todoele extends HTMLElement{
    constructor(){
        super()

        this.attachShadow({mode:"open"})
        
        this.template = template    
        this.todos = [
        {
            id:1,
            value:"complete Task",
            checked:false
        },
        {
            id:2,
            value:"complete Task 01",
            checked:false
        },
        {
            id:3,
            value:"complete Task 02",
            checked:true
        }
    ]

    }
    renderTodos(ele){
        ele.innerHTML = ''; 
        this.todos.forEach(todo=>{
            let todoele = document.createElement("li")
            ele.appendChild(todoele)
            todoele.innerHTML = `
            <div class  = "todos-container">
            <input type = "checkbox" ${todo.checked}/>
            <span class = "${todo.checked?"":"strike"}">
            ${todo.value} 
            </span>
             <button class= "delete-Todo primary-button">delete Todo</button>
            </div>
            
            `
        })
    }
    render(){
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.todoListContainer  = this.shadowRoot.querySelector("#todoListContainer")
        this.inputTodo =  this.shadowRoot.querySelector("#input-todo")
        this.addTodo = this .shadowRoot.querySelector("#add-Todo")
        this.allTodos = this.shadowRoot.querySelectorAll(".delete-Todo")
        this.Todos = this.getTodos(this.allTodos)
        this.renderTodos(this.todoListContainer)
        
        this.addTodo.addEventListener('click',(e)=>this.addTodos(e))  

    }
    addTodos(e){
        let value = this.inputTodo.value
        this.todos.push({
            id:Date.now(),
            value: value,
            checked:false
        })
        this.renderTodos(this.todoListContainer)
        this.inputTodo.value = ""

    }
    getTodos(todos) {
        console.log(todos);
        
    }
    deleteTodos(id){

    }

    connectedCallback() {
        this.render()
    }
}

customElements.define("todo-list",todoele)