import { HTMLAttributes, memo, useState } from "react"
import { IPost } from "../../models/Post"
import moment from 'moment';
import { AWS_S3 } from '../../utils/constants';
import './post.scss';

export const Post = memo<{
    post: IPost;
} & HTMLAttributes<HTMLDivElement> > (({ post }) => {
    const [showTranslate, setShowTranslate] = useState<boolean>(false);
    const translateContent = () => {
        setShowTranslate(!showTranslate);
    }
    return (
        <div className='post-cntr'>
            <div className='post-cntr__head'>
                <p className='post-cntr__head-title'>{post.title}</p>
                <p className='post-cntr__head-author'>{moment(new Date(post.createdAt.toString())).format('lll')}</p>
            </div>
            <img src={`${AWS_S3.BUCKET_BASE_URL}${post.fileName}`}/>
            <div className='post-cntr__body'>
                <div className='post-cntr__body-head'>
                    <p className='post-cntr__body-time'><span>Posted by {post.author.name}</span></p>
                    <button className='button' onClick={translateContent}>Translate to {showTranslate ? 'English' : 'Hindi'}</button>
                </div>
                {!showTranslate && <p className='post-cntr__body-content'>{post.content}</p>}
                {showTranslate && <p className='post-cntr__body-content'>{post.translate}</p>}
            </div>
        </div>
    )
    },    
) 
    