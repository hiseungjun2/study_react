import React from 'react';
import { connect } from 'react-redux';
import Sample from '../components/Sample';
import { getPost, getUsers } from '../modules/sample_thunk';

const { useEffect } = React;
const SampleContainer = ({
    getPost,
    getUsers,
    post,
    users,
    loadingPost,
    loadingUsers,
}) => {
    // 클래스 형태의 컴포넌트일 경우 componentDidMount
    // useEffect 에 파라미터로 넣는 함수는 async로 할 수 없기 때문에
    // 그 내부에서 async 함수를 선언하고 호출해준다.
    useEffect(() => {
        const fn = async () => {
            try {
                await getPost(1);
                await getUsers(1);
            } catch (e) {
                console.log(e);
            };
        };
        // getPost(1);
        // getUsers(1);   
        fn();
    }, [getPost, getUsers]);
    return (
        <Sample
            post={post}
            users={users}
            loadingPost={loadingPost}
            loadingUsers={loadingUsers}
        />
    );
};

export default connect(
    ({ sample, loading }) => ({
        post : sample.post,
        users : sample.users,
        // loadingPost : sample.loading.GET_POST,
        // loadingUsers : sample.loading.GET_USERS
        loadingPost : loading['sample/GET_POST'],
        loadingUsers : loading['sample/GET_USERS']
    }),
    {
        getPost,
        getUsers
    }
)(SampleContainer);
