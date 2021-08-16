import Link from 'next/link';
import { useRouter } from 'next/router';
import './header.scss';

export const Header = () => {
  return (
    <nav>
      <Link href="/addPost">
        <button className='button'> + Add Post</button>
      </Link>
    </nav>
  );
};
