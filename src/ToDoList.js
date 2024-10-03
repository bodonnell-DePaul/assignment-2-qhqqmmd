import React, { useState } from 'react';
import './ToDoList.css';
import 'bootstrap/dist/css/bootstrap.min.css';  

import { Container, Row, Col, Form, Button, ListGroup, Tab } from 'react-bootstrap';


const itodos = [
  { title: 'Todo 1', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.`, dueDate: '2024-04-03' },

  { title: 'Todo 2', description: `Sed auctor nunc nec nisi ultrices, in molestie nibh mattis. 
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
  Suspendisse potenti. Nullam nec nibh nibh. Nullam quis nisl nec nunc congue mollis. 
  Vivamus nec nisi nec nunc mattis molestie. Sed auctor nunc nec nisi ultrices, in molestie nibh mattis.`, dueDate: '2024-04-06' },

  { title: 'Todo 3', description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
  Suspendisse potenti. Nullam nec nibh nibh. Nullam quis nisl nec nunc congue mollis. Vivamus nec nisi nec nunc mattis molestie. 
  Sed auctor nunc nec nisi ultrices, in molestie nibh mattis. Pellentesque habitant morbi tristique 
  senectus et netus et malesuada fames ac turpis egestas.`, dueDate: '2024-04-09' },

  { title: 'Todo 4', description: `Suspendisse potenti. Nullam nec nibh nibh. Nullam quis nisl nec nunc congue mollis. 
  Vivamus nec nisi nec nunc mattis molestie. Sed auctor nunc nec nisi ultrices, in molestie nibh mattis. 
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. 
  Nullam nec nibh nibh. Nullam quis nisl nec nunc congue mollis. `, dueDate: '2024-04-11' },
];

function ToDoList() {
  
  const [todos, setTodos] = useState(itodos);
  const [selectedTodo, setSelectedTodo] = useState(null);
  
  const handleSelect = (todo) => {
    setSelectedTodo(todo);
  };

  
  const handleDateChange = (event) => {
    if (selectedTodo) {
      const updatedDate = event.target.value;
      setSelectedTodo({
        ...selectedTodo,
        dueDate: updatedDate,
      });

      
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.title === selectedTodo.title ? { ...todo, dueDate: updatedDate } : todo
        )
      );
    }
  };

  
  const handleDescriptionChange = (event) => {
    if (selectedTodo) {
      const updatedDescription = event.target.innerText;
      setSelectedTodo({
        ...selectedTodo,
        description: updatedDescription,
      });

      // renew todos list
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.title === selectedTodo.title ? { ...todo, description: updatedDescription } : todo
        )
      );
    }
  };

  // get variant with time
  const getDueDateVariant = (dueDate) => {
    const todayStr = '2024-03-26';
    const today = new Date(todayStr);
    const due = new Date(dueDate);
    const timeDifference = due - today;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysRemaining < 2) {
      return 'danger'; // Red for urgent
    } else if (daysRemaining < 4) {
      return 'warning'; // Orange for warning
    } else if (daysRemaining < 7) {
      return 'success'; // Green for normal
    } else {
      return 'primary';
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Assignment 2: ToDo List</h1>
        <Container className="mt-4">
          <Row>
            {/* left part */}
            <Col md={4} className="p-4 custom-background1">
              <Form>
                <Form.Group className="mb-3" controlId="addtodoitem">
                  <Form.Label>ToDo Item</Form.Label>
                  <Form.Control as="textarea" placeholder="Add todo item" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDate">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control type="date"/>
                </Form.Group>
                <Button variant="primary" size="md" className="w-100 mt-3">
                  Add ToDo
                </Button>
              </Form>
            </Col>

            {/* mid part */}
            <Col md={4} className="p-4">
              {/* add role="tablist"  */}
              
                <ListGroup role="tablist">
                
                  {todos.map((todo) => (
                    <ListGroup.Item
                      key={todo.title}
                      action
                      onClick={() => handleSelect(todo)}
                      variant={getDueDateVariant(todo.dueDate)}
                      as="a"  
                      
                      className={`list-group-item-${getDueDateVariant(todo.dueDate)}`}
                      role="tab"
                      data-due-date={todo.dueDate} 
                      
                    >
                      {todo.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              
            </Col>

            {/* right Tab part  */}
            <Col md={4} className="p-4">
            <Tab.Container activeKey={selectedTodo ? selectedTodo.title : 'default'}>
  <Tab.Content>
    {todos.map((todo) => (
      <Tab.Pane
        key={todo.title} //  title as key
        eventKey={todo.title} //  title as eventKey
        className={`list-group-item-${getDueDateVariant(todo.dueDate)} ${selectedTodo && selectedTodo.title === todo.title ? '' : 'hidden'}`}
        role="tabpanel"
      >
        <div>
          <p><strong>Description:</strong></p>
          <div
            contentEditable={selectedTodo && selectedTodo.title === todo.title ? "true" : "false"}
            onBlur={handleDescriptionChange}
            suppressContentEditableWarning={true}
          >
            <h6>{todo.description}</h6>
          </div>
          <Form.Group controlId={`formEditDate-${todo.title}`}>
            <Form.Label><strong>Due Date:</strong></Form.Label>
            <input
              type="date"
              value={todo.dueDate}
              onChange={(e) => handleDateChange(e, todo.title)} 
              disabled={!(selectedTodo && selectedTodo.title === todo.title)} 
            />
          </Form.Group>
        </div>
      </Tab.Pane>
    ))}
  </Tab.Content>
</Tab.Container>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default ToDoList;