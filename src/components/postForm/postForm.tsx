import { Field } from '../common/field/field';
import { SubmitHandler, useForm } from 'react-hook-form';
import { handlePostRequest } from '../../utils/request';
import { ErrorMessage } from '@hookform/error-message';
import './postForm.scss';
import { useState } from 'react';
import { uploadFile } from '../../utils/s3';
import Router from 'next/router'
import { sanitizeString, validateStringWithRegex } from '../../utils/utils';

interface JournalForm {
  content: string;
  name: string;
  email:string;
  title: string;
  file: any;
}


export const PostForm = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { errors }} = useForm<JournalForm>();

    const onSubmit: SubmitHandler<JournalForm> =  async ({ name, email, title, content, file }) => {
      setLoading(true);
      const selectedFile = file[0];

      // Upload file to S3
      await uploadFile(selectedFile);
      const fileName = selectedFile.name;

      // Call CreatePost API
      await handlePostRequest('POST', 'create', { name, email, title, content, fileName });
      Router.push('/')
    };

    const handleCancel = () => {
      reset();
    }

    const handleError =(field) => {
      return errors[field]
      ? errors[field].type === 'required'
          ? `${field} cannot be empty`
          : errors[field].type === 'noHTML'
          ? `${field} cannot contain HTML tags`
          : `${field} cannot contain URLs`
      : undefined
    }

    const validateString = (field) => {
      return  {
          notEmpty: (field: string) => Boolean(field.trim()),
          noHTML: (field: string) => field.trim() === sanitizeString(field.trim()),
          noUrls: (field: string) => validateStringWithRegex(field.trim(), true, false),
        }
    }

    const renderFields = () => {
      const fieldTypes = ['name', 'email', 'title','content'];
      return fieldTypes.map( (field, index) => {
          return <div key={index}>
            <Field
                mode={field === 'content' ? 'textarea' : 'input'}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={`Enter your ${field}`}
                label={field}
                { ...field === 'email'? {...register(field, {
                    pattern: /\S+@\S+\.\S+/,
                    required: true,
                  })} : {...register(field, {
                    required: true,
                    validate: validateString(field)
                  })}
                }
                data-test="journal-content-input__input"
            />
            <ErrorMessage errors={errors} name={field} render={() => <p className='journal-content-input__error'>{handleError(field)}</p>}/>
          </div>
        })
    }

    return (
      <div className='journal-form__cntr'>
        <form onSubmit={handleSubmit(onSubmit)} className="journal-content-input">
          {/* Looping different field types */}
          {renderFields()}

          {/* Input file type for uploading Image */}
          <div className='journal-field__cntr'>
            <label>Journal Image</label>
            <input type="file" accept="image/png, image/jpg, image/jpeg" className='journal-content-input__file' name='file' {...register('file', {
                    required: true
            })}/>
          </div>
          <ErrorMessage errors={errors} name='file' render={() => <p className='journal-content-input__error'>File can't be empty</p>}/>

          {!loading ? <div className="journal-content-input__buttons">
              <button
                  type="button"
                  className="button secondary"
                  data-test="journal-content-input__buttons-cancel"
                  onClick={handleCancel}
              >
                  Cancel
              </button>
              <button
                  type="submit"
                  className="button"
                  data-test="journal-content-input__buttons-submit"
              >
                 Post
              </button>
            </div>
          : <p className='journal-content-input__loading'> Upload of image might take few seconds, page will redirect automatically</p>}
        </form> 
      </div>
    )
}
