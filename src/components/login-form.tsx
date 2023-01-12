import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { loginService } from '../services/auth';
import { useToast } from '../context/toast-context';
import { setToken } from '../utils';
import { useAuth } from '../context/auth-context';

type FormInput = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email().lowercase().required(),
  password: yup.string().required(),
});

const LoginForm = ({ onClose }: { onClose: any }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { setRefreshLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormInput) => {
    try {
      setLoading(true);
      const result = await loginService(data);
      setToken(result.token);
      setRefreshLogin(true);
      onClose();
    } catch (error: any) {
      if (error?.status >= 400 || error?.status < 500) {
        toast.warning(error.data);
        return;
      }
      toast.error(
        error?.data || 'Server Error! Was an error while creating user'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex-shrink-0 w-full bg-base-100">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="john@doe.com"
              {...register('email')}
              className={`input input-bordered ${
                errors.email?.message && 'input-error'
              }`}
            />
            {errors.email?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.email?.message}
                </span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              {...register('password')}
              className={`input input-bordered ${
                errors.password?.message && 'input-error'
              }`}
            />
            <label className="label">
              {errors.password?.message && (
                <span className="label-text-alt text-error">
                  {errors.password?.message}
                </span>
              )}
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button
              className={`btn btn-info rounded-full ${loading && 'loading'}`}
              type="submit"
            >
              {loading ? '' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
