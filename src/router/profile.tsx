import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import BannerImg from '~/components/banner-img';
import BasicModal from '~/components/basic-modal';
import EditForm from '~/components/edit-form';
import InfoUser from '~/components/info-user';
import { useAuth } from '~/context/auth-context';
import { useToast } from '~/context/toast-context';
import { getProfile } from '~/services/profile';

export default function Profile() {
  const [user, setUser] = useState<User>();
  const params = useParams();
  const { toast } = useToast();
  const { user: loggedUser } = useAuth();
  const editCloseRef = useRef<HTMLAnchorElement | null>(null);

  const getUserProfile = async () => {
    try {
      const profile = await getProfile(params?.id ?? '');
      setUser(profile);
    } catch (error) {
      console.error(error);
      toast.error('User not exist');
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [params.id]);

  return (
    <section>
      {/* <header className="border-b border-b-gray-700 py-4">
        <h2 className="text-3xl font-bold ml-4">
          {user?.name} {user?.lastname}
        </h2>
      </header> */}
      <BannerImg user={user} loggedUser={loggedUser} />
      <InfoUser user={user} />
      <div>All tweets</div>
      <BasicModal id="edit" closeRef={editCloseRef}>
        <section className="flex flex-col items-center justify-center">
          <h3 className="font-bold text-2xl">Edit profile</h3>
          <EditForm
            user={user}
            onClose={() => editCloseRef?.current?.click()}
          />
        </section>
      </BasicModal>
    </section>
  );
}
