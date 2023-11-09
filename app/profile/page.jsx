"use client"

import UserProfileComponent from '@/components/UserProfileComponent';
import { getUser } from '../api/UserService';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const UserProfile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getUser(session?.user.oauthId)); // Adjust this to be server-compatible
    setLoading(false);
  }, [session]);

  return (
    <div>
      {loading
        ? <div>Loading...</div>
        : <UserProfileComponent
          name={session.user.name}
          image={session.user.image}
          metric={user.metric}
          email={user.email}
        />}
    </div >
  );
};

export default UserProfile;