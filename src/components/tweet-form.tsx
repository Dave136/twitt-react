import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useToast } from '../context/toast-context';
import { createTweet } from '~/services/tweet';

type FormInput = {
  message: string;
};

const MAX_LENGTH = 280;

const schema = yup.object({
  message: yup
    .string()
    .max(MAX_LENGTH, 'Characters exceeded')
    .required('Field is required'),
});

const TweetForm = ({ onClose }: { onClose: any }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormInput) => {
    try {
      setLoading(true);
      onClose();
      await createTweet(data);
      toast.success('Tweet sent');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      if (error?.status >= 400 || error?.status < 500) {
        toast.warning(error.data);
        return;
      }
      toast.error(
        error?.data || 'Internal error! Was an error while sending the tweet'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-shrink-0 w-full bg-transparent">
      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <textarea
              placeholder="What's in your mind?"
              {...register('message')}
              className="textarea focus:outline-none h-24"
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.message?.message && errors.message?.message}
              </span>
              <span
                className={`label-text ${
                  watch('message')?.length > MAX_LENGTH && 'text-error'
                }`}
              >
                {watch('message')?.length ?? 0} / {MAX_LENGTH}
              </span>
            </label>
          </div>
          <div className="form-control mt-6">
            <button
              className={`btn btn-info rounded-full ${loading && 'loading'} ${
                watch('message')?.length > MAX_LENGTH && 'btn-disabled'
              }`}
              type="submit"
            >
              {loading ? '' : 'Twittear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetForm;
