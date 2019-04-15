import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Form,
    Button
} from 'semantic-ui-react'

import { postTodo } from '../redux/actions/todos'


class AddView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            todo: '',
            status: '',
            category: '',
        }
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeTodo = this.handleChangeTodo.bind(this)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async postData() {
        await this.props.dispatch(postTodo({
            date: this.state.date,
            todo: this.state.todo,
            status: false,
            category: this.state.category
        }))
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

    handleChangeCategory(event) {
        this.setState({
            category: event.target.value
        })
    }

    handleSubmit(event) {
        this.postData()
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Add To Do</h1>
                <div style={{ marginTop: 10 }}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Date</label>
                            <input placeholder='Date'
                                onChange={this.handleChangeDate}
                                value={this.state.date}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Todo</label>
                            <input placeholder='Todo'
                                onChange={this.handleChangeTodo}
                                value={this.state.todo}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Category</label>
                            <input placeholder='Category'
                                onChange={this.handleChangeCategory}
                                value={this.state.category}
                            />
                        </Form.Field>
                        <Button color='green' type='submit' style={{ marginBottom: 20 }}>Submit</Button>
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
export default connect(mapStateToProps)(AddView)