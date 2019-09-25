import React from 'react';
import { connect } from 'react-redux';

import Wrapper from './Wrapper';
import Search from '../Search/Search';
import Error from '../Error/Error';
import { fetchUsers } from "../../action-creators/app-action-creators";

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const { loading, users, error } = this.props;

        return (
            <Wrapper>
                <Search placeholder="Search users by ID, address, name & items"
                        minLength={3}
                        data={users}
                />
                { loading ? 'Fetching users, please wait...' : null }
                { error ? <Error>{error}</Error> : null }
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => ({...state});

const mapActionsToProps = (dispatch) => ({
    fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapActionsToProps)(App);
