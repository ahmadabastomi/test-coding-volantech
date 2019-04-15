import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Form,
    Button
} from 'semantic-ui-react'

import { putTodo } from '../redux/actions/todos'

class EditView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            date: '',
            todo: '',
            status: '',
            category: '',

        }
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeTodo = this.handleChangeTodo.bind(this)
        this.handleChangeStatus = this.handleChangeStatus.bind(this)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeDate(event) {
        this.setState({
            date: event.target.value
        })
    }

    handleChangeTodo(event) {
        this.setState({
            todo: event.target.value
        })
    }

    handleChangeStatus(event) {
        this.setState({
            status: event.target.value
        })
    }

    handleChangeCategory(event) {
        this.setState({
            category: event.target.value
        })
    }

    async patchData() {
        let { date, todo, status, category } = this.state
        let { a_date, a_todo, a_category } = ''
        if (date === '') {
            a_date = this.props.todos.value.date
        } else {
            a_date = date
        }
        if (todo === '') {
            a_todo = this.props.todos.value.todo
        } else {
            a_todo = todo
        }
        if (category === '') {
            a_category = this.props.todos.value.category
        } else {
            a_category = category
        }
        await this.props.dispatch(putTodo(this.props.todos.value._id, {
            date: a_date,
            todo: a_todo,
            status: this.props.todos.value.status,
            category: a_category
        }))
    }

    handleSubmit(event) {
        this.patchData()
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <Link to="/">
                    <Button color='green'>Add New Todo</Button>
                </Link>
                <h1>Edit Todo</h1>
                <div style={{ marginTop: 10 }}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Date</label>
                            <input
                                onChange={this.handleChangeDate}
                                placeholder={this.props.todos.value.date}
                                value={this.state.date}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Todo</label>
                            <input placeholder={this.props.todos.value.todo}
                                onChange={this.handleChangeTodo}
                                value={this.state.todo}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Category</label>
                            <input placeholder={this.props.todos.value.category}
                                onChange={this.handleChangeCategory}
                                value={this.state.category}
                            />
                        </Form.Field>
                        <Button color='blue' type='submit' style={{ marginBottom: 20 }}>Edit</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
    }
}
export default withRouter(connect(mapStateToProps)(EditView))