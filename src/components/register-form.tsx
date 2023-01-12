import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { registerService } from '../services/auth';
import { useToast } from '../context/toast-context';

type FormInput = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  repeatPassword: boolean;
};

const schema = yup.object({
  name: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  password: yup.string().required(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegisterForm = ({ onClose }: { onClose: any }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
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
      await registerService(data);
      toast.success('User has been registered successfully!');
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
          <div className="flex justify-between">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="john"
                {...register('name')}
                className={`input input-bordered ${
                  errors.name?.message && 'input-error'
                }`}
              />
              {errors.name?.message && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.name?.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">LastName</span>
              </label>
              <input
                type="text"
                placeholder="doe"
                {...register('lastname')}
                className={`input input-bordered ${
                  errors.lastname?.message && 'input-error'
                }`}
              />
              {errors.lastname?.message && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.lastname?.message}
                  </span>
                </label>
              )}
            </div>
          </div>
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
          <div className="flex justify-between">
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
              {errors.password?.message && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password?.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Repeat Password</span>
              </label>
              <input
                type="password"
                placeholder="repeat password"
                {...register('repeatPassword')}
                className={`input input-bordered ${
                  errors.repeatPassword?.message && 'input-error'
                }`}
              />
              {errors.repeatPassword?.message && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.repeatPassword?.message}
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="form-control mt-6">
            <button
              className={`btn btn-info rounded-full ${loading && 'loading'}`}
              type="submit"
            >
              {loading ? '' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
