
// readonly id : number

declare type Todo = {
  id :string,
  title :string,
  completed : 0|1,
  deleted : 0|1,
}

declare type newTodo = {
  id: string,
  title? :string,
  completed? : 0|1,
  deleted? : 0|1,
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

