import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Tree, Radio, RadioChangeEvent } from 'antd';
import { PostsState, State, GroupedPosts } from '../../models/models.interface';
import {
  fetchTodosAction,
  SetInputValue,
  SetPosts,
} from '../../store/actions/actions';
import { store } from '../../store/store';
import { changeGroups } from '../../store/group-by.service';
import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 5rem;
  color: #444;
`;

export const Section = styled.div`
  max-width: ${(props: { max: string }) => props.max};
  > * {
    margin: 1rem;
  }
`;

interface Props {
  posts: PostsState;
  onSubmit: any;
  groupBy: any;
}

const mapStateToProps = (state: State) => ({
  ...state,
});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmit: (key: string, input: string, index: number, value: string) => {
      dispatch(
        SetInputValue({
          key,
          input,
          index,
          value,
        })
      );
    },
    groupBy: (key: string, list: GroupedPosts) => {
      const posts: GroupedPosts = changeGroups(list, key);
      dispatch(SetPosts(posts));
    },
  };
};

const fromObjToTree = (posts: PostsState, callback: any) => {
  return Object.keys(posts.list).map((key) => {
    return {
      title: key,
      key: `${key}-0`,
      children: posts.list[key].map((item, i) => {
        return {
          title: (
            <Card>
              <p>{item.date}</p>
              <Section max={'12rem'}>
                <p>{item.text}</p>
              </Section>
              <label>
                Author
                <input
                  name='author'
                  value={item.author}
                  onChange={(e) => callback(key, 'author', i, e.target.value)}
                />
              </label>
              <label>
                Location
                <input
                  name='location'
                  value={item.location}
                  onChange={(e) => callback(key, 'location', i, e.target.value)}
                />
              </label>
            </Card>
          ),
          key: `${key}-0-0-${i}`,
        };
      }),
    };
  });
};

const TreeComponent = (props: Props) => {
  const [value, setValue] = useState('time');
  useEffect(() => {
    store.dispatch(fetchTodosAction());
  }, []);

  const { posts, onSubmit, groupBy } = props;

  const treeData = fromObjToTree(posts, onSubmit);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    groupBy(e.target.value, posts.list);
  };

  return (
    <Fragment>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={'author'}>By Author</Radio>
        <Radio value={'location'}>By Location</Radio>
        <Radio value={'time'}>By Week</Radio>
      </Radio.Group>

      <Tree checkable treeData={treeData} />
    </Fragment>
  );
};

export const TreePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeComponent);

/*
      <ul data-testid='todoList'>
        {Object.keys(posts.list).map((postKey: string) => (
          <ul key={postKey}>
            <span>{postKey}</span>
            {posts.list[postKey].map((item: Post, i: number) => (
              <li key={item.id}>
                <p>{item.date}</p>
                <p>{item.text}</p>
                <label>
                  Author
                  <input
                    name='author'
                    value={item.author}
                    onChange={(e) => onSubmit(postKey, 'author', i, e.target.value)}
                  />
                </label>
                <label>
                  Location
                  <input
                    name='location'
                    value={item.location}
                    onChange={(e) =>
                      onSubmit(postKey, 'location', i, e.target.value)
                    }
                  />
                </label>
              </li>
            ))}
          </ul>
        ))}
      </ul>
*/
