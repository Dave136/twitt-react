import { ReactComponent as DateBirth } from '~/assets/date-birth.svg';
import { ReactComponent as Link } from '~/assets/link.svg';
import { ReactComponent as Location } from '~/assets/location.svg';

export default function InfoUser({ user }: { user: User | undefined }) {
  const dateFormat = (date: Date) =>
    new Intl.DateTimeFormat('es-VE', {
      dateStyle: 'long',
    }).format(date);

  return (
    <div className="m-5">
      <h2 className="text-lg font-bold">
        {user?.name} {user?.lastname}
      </h2>
      <p className="text-sm text-gray-500">{user?.email}</p>
      {user?.biography && (
        <div className="my-2 whitespace-pre-line">{user?.biography}</div>
      )}
      <div className="flex items-start gap-5 mt-5">
        {user?.location && (
          <p className="flex gap-2 text-gray-500">
            <Location className="w-5 fill-gray-500" />
            {user?.location}
          </p>
        )}
        {user?.website && (
          <a
            className="flex gap-2 text-primary"
            href={user.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link className="w-5 fill-gray-500" />
            {user.website}
          </a>
        )}
        {user?.birthday && (
          <p className="flex gap-2 text-gray-500">
            <DateBirth className="w-5 h-5 fill-gray-500" />
            {/* {user.birthday} */}
            {dateFormat(new Date())}
          </p>
        )}
      </div>
    </div>
  );
}
