import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ReactComponent as Camera } from '~/assets/camera.svg';
import { useToast } from '../context/toast-context';
import { API_URL } from '~/constant';
import { updateProfile, uploadAvatar, uploadBanner } from '~/services/profile';

type FormInput = {
  name: string;
  lastname: string;
  biography: string;
  website: string;
  birthday: string;
};

const schema = yup.object({
  name: yup.string(),
  lastname: yup.string(),
  biography: yup.string(),
  website: yup.string(),
  birthday: yup.string(),
});

const formatDate = (data: string) => data.split('T')[0];

const EditForm = ({
  user,
  onClose,
}: {
  user: User | undefined;
  onClose: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    defaultValues: {},
    values: {
      name: user?.name ?? '',
      lastname: user?.lastname ?? '',
      biography: user?.biography ?? '',
      website: user?.website ?? '',
      birthday: formatDate(user?.birthday ?? new Date().toLocaleDateString()),
    },
  });

  useEffect(() => {
    setBannerUrl(user?.banner ? `${API_URL}/banner?id=${user.id}` : null);
    setAvatarUrl(user?.avatar ? `${API_URL}/avatar?id=${user.id}` : null);
  }, [user]);

  const onDropBanner = useCallback((acceptedFile: File[]) => {
    const file = acceptedFile[0];
    const tempUrl = URL.createObjectURL(file);
    setBannerUrl(tempUrl);
    setBannerFile(file);
  }, []);

  const onDropAvatar = useCallback((acceptedFile: File[]) => {
    const file = acceptedFile[0];
    const tempUrl = URL.createObjectURL(file);
    setAvatarUrl(tempUrl);
    setAvatarFile(file);
  }, []);

  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner,
  });

  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar,
  });

  const onSubmit = async (data: FormInput) => {
    try {
      setLoading(true);
      if (bannerFile) {
        await uploadBanner(bannerFile);
      }

      if (avatarFile) {
        await uploadAvatar(avatarFile);
      }

      const birthday = new Date(data.birthday).toISOString();

      await updateProfile({
        ...data,
        birthday,
      });
      onClose();
      window.location.reload();
      toast.success('User has been edited successfully!');
    } catch (error: any) {
      if (error?.status >= 400 || error?.status < 500) {
        toast.warning(error.data);
        return;
      }
      toast.error(
        error?.data || 'Server Error! Was an error while editing user'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex-shrink-0 w-full bg-base-100">
      <div className="card-body">
        <div
          className="h-48 flex items-center justify-center bg-primary-dark-light bg-cover bg-center bg-no-repeat -p-5 hover:cursor-pointer"
          style={{ backgroundImage: `url(${bannerUrl})` }}
          {...getRootBannerProps()}
        >
          <input type="text" {...getInputBannerProps()} hidden />
          <Camera className="w-7 transition ease fill-gray-500 hover:fill-gray-700" />
        </div>
        <div
          className="relative -top-[50px] left-5 bg-primary-dark-light w-32 h-32 border-4 rounded-full border-primary-dark flex items-center justify-center bg-cover bg-center bg-no-repeat hover:cursor-pointer"
          style={{ backgroundImage: `url(${avatarUrl})` }}
          {...getRootAvatarProps()}
        >
          <input type="text" {...getInputAvatarProps()} hidden />
          <Camera className="w-7 transition ease fill-gray-500 hover:fill-gray-700" />
        </div>
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
              <span className="label-text">Biography</span>
            </label>
            <textarea
              placeholder="Mi bio"
              {...register('biography')}
              className={`textarea textarea-bordered h-24 ${
                errors.biography?.message && 'textarea-error'
              }`}
            />
            {errors.biography?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.biography?.message}
                </span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Website</span>
            </label>
            <input
              placeholder="www.website.com"
              {...register('website')}
              className={`input input-bordered ${
                errors.website?.message && 'input-error'
              }`}
            />
            {errors.website?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.website?.message}
                </span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Birthday</span>
            </label>
            <input
              type="date"
              {...register('birthday')}
              className={`input input-bordered ${
                errors.birthday?.message && 'input-error'
              }`}
            />
            {errors.birthday?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.birthday?.message}
                </span>
              </label>
            )}
          </div>
          <div className="form-control mt-6">
            <button
              className={`btn btn-info rounded-full ${loading && 'loading'}`}
              type="submit"
            >
              {loading ? '' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
