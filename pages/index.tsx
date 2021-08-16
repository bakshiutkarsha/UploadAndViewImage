import PropTypes from 'prop-types';

import { Layout } from '../src/components/common/layout/layout';
import { PostShape } from '../prop-shapes/post';
import { fetchPosts } from '../prisma/helpers/post';
import { Post } from '../src/components/post/post';
import { Header } from '../src/components/header/header';
import Masonry from "react-masonry-css";
import './style.scss';

const Journal = ({ posts }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Layout>
       <Header />
       <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
         {posts.map((post) => (
          <Post post={post} key={post.id}/>
          ))}
      </Masonry>
     
    </Layout>
  )
};

Journal.propTypes = {
  posts: PropTypes.arrayOf(PostShape).isRequired,
};

export const getServerSideProps = async () => {
  return {
    props: {
      posts: await fetchPosts(),
    },
  };
};

export default Journal;
