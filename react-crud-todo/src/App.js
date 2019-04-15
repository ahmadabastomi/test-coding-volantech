import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from "react-router-dom"
import {
  Container,
  Menu,
  Table,
  Button,
} from 'semantic-ui-react'

import { getTodos, deleteTodo, getTodo, putTodo } from './dev/redux/actions/todos'

import AddView from './dev/screen/AddView'
import EditView from './dev/screen/EditView'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: '',
      todo: {}
    }
  }

  componentWillMount() {
    this.getData()
  }

  async getData() {
    await this.props.dispatch(getTodos())
  }

  async updateStatus(id) {
    await this.props.dispatch(putTodo(id, {
      status: true
    }))
  }

  handleUpdateStatus = (id) => {
    this.updateStatus(id)
  }

  async deleteData(id) {
    await this.props.dispatch(deleteTodo(id))
  }

  handleDelete = (id) => {
    this.deleteData(id)
  }

  navigateEdit = async (id) => {
    await this.props.dispatch(getTodo(id))
    await this.setState({
      _id: id,
    })
  }

  render() {
    const data = this.props.todos.data
    return (
      <div>
        <div>
          <Menu fixed='top' inverted>
            <Container>
              <Link to="/">
                <Menu.Item>
                  <a>Home</a>
                </Menu.Item>
              </Link>
              <Link to="#">
                <Menu.Item>
                  <a>About Me</a>
                </Menu.Item>
              </Link>
            </Container>
          </Menu>
        </div>
        <div style={{ marginTop: 60, marginLeft: 20, marginRight: 40 }}>
          <div>
            <h1>To Do List</h1>
          </div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No.</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Todos</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Settings</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                data.map(function (data, index) {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{data.date}</Table.Cell>
                      <Table.Cell>{data.todo}</Table.Cell>
                      <Table.Cell>{data.status === false ? <a style={{ color: 'grey' }}>unfinished</a> : <a style={{ color: 'orange', fontWeight: 'bold' }}>finished</a>}</Table.Cell>
                      <Table.Cell>{data.category}</Table.Cell>
                      <Table.Cell>
                        {data.status === false ? <Button color='grey' onClick={() => this.handleUpdateStatus(data._id)}>Done</Button> : <Button color='orange'>Done</Button>}
                        <Link to="/edit">
                          <Button color='blue' onClick={() => this.navigateEdit(data._id)}>Edit</Button>
                        </Link>
                        <Button type='button' color='red' onClick={() => this.handleDelete(this.props.todos.data[index]._id)}>Delete</Button>
                      </Table.Cell>
                    </Table.Row>
                  )
                }, this)
              }
            </Table.Body>
          </Table>
        </div>
        <div style={{ marginTop: 25, marginLeft: 20 }}>
          <Route path="/" exact render={() => {
            return (
              <AddView />
            )
          }} />
          <Route path="/edit" exact component={EditView} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  }
}
export default connect(mapStateToProps)(App)
