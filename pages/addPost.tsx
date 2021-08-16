import { PostForm } from '../src/components/postForm/postForm';
import { StaticSection } from '../src/components/staticSection/staticSection';
import './style.scss';

const AddPost = () => {
  return (
    <div className='journal-add__cntr'>
      <StaticSection/>
      <PostForm />
    </div>
  );
};

export default AddPost;
