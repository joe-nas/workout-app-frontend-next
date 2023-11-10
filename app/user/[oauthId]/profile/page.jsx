"use client"

import { getUser } from '@/app/api/UserService';
import UserProfileComponent from '@/components/UserProfileComponent';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const UserProfile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setUpUser = async () => {
      if (session?.user.oauthId) {
        try {
          const currentUser = await getUser(session.user.oauthId);
          setUser(currentUser.data); // Adjust this to be server-compatible
          setLoading(false);
        } catch (e) {
          setLoading(true);
          console.log(e);
        }
      }
    }
    setUpUser();
  }, [session]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && < UserProfileComponent
        username={user.username}
        email={user.email}
      />
      }
    </div>
  );
};

export default UserProfile;