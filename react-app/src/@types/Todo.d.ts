
// readonly id : number

declare type Todo = {
  id :string,
  title :string,
  completed :boolean,
  deleted :boolean,
}

declare type newTodo = {
  id: string,
  title? :string,
}

declare type TodoId = {
  id: string,
}

declare type TodoTitle = {
  title: string,
}

declare type todoFilter = 
  | 'all'
  | 'completed'
  | 'incompleted'
  | 'deleted'