import Profile from './profile';

export default function ProfilesList({ users }: { users: User[] | null }) {
  if (!users?.length || users == null) {
    return <h2 className="text-center pt-6 text-xl">There is no results</h2>;
  }

  return (
    <ul>
      {users.map((user) => (
        <Profile key={user.id} user={user} />
      ))}
    </ul>
  );
}
