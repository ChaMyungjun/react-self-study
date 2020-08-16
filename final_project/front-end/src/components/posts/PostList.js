import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import { Button } from "@material-ui/core";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";
import { Link } from "react-router-dom";

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid #757575;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: #757575;
    }
  }
  p {
    margin-top: 2rem;
  }
`;

// const SubInfo = styled.div`
//   color: #757575;

//   span + span:before {
//     color: #bdbdbd;
//     padding-left: 0.25rem;
//     padding-right: 0.25rem;
//     content: "\\B7";
//   }
// `;

// const Tags = styled.div`
//   margin-top: 0.5rem;
//   .tag {
//     display: inline-block;
//     color: #0097a7;
//     text-decoration: none;
//     margin-right: 0.5rem;
//     &:hover {
//       color: #00acc1;
//     }
//   }
// `;

const PostItem = ({ post }) => {
  console.log({ post });
  const { publishedDate, user, tags, title, body, _id } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@:${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={user.username}
        publishedDate={new Date(publishedDate)}
      />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
  if (error) {
    return <PostListBlock>Postlist 에러 발생</PostListBlock>;
  }

  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && <Button href="/write">새 글 작성하기</Button>}
      </WritePostButtonWrapper>
      {loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default PostList;