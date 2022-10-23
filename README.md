# useWaitlist

A tiny hook for managing waitlists using [getwaitlist.com](https://www.getwaitlist.com/).

## Installation

```bash
yarn add @haydenbleasel/use-waitlist
```

## Usage

### Waitlist

```tsx
import type { FC, FormEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { useWaitlist } from '@haydenbleasel/use-waitlist';

const MyWaitlist: FC = () => {
  const waitlist = useWaitlist(process.env.NEXT_PUBLIC_WAITLIST_ID ?? '');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (waitlist.error) {
      console.log(waitlist.error);
    }
  }, [waitlist]);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const waiter = await waitlist.add(email);
      console.log('Successfully added to waitlist', waiter.uuid);
    } catch (error) {
      console.error(error);
    }
  };

  const getWaiter = async () => {
    // Can be { email: string } or { uuid: string }
    const waiter = await waitlist.get({ email });

    console.log(waiter);
  };

  return (
    <div>
      <h1>{waitlist.data?.waitlist_name}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div onClick={getWaiter}>Fetch user</div>
    </div>
  );
};

export default MyWaitlist;
```

### Leaderboard

_Note: Leaderboard is an opt-in feature, so you must enable it first in order to use it._

```tsx
import type { FC, FormEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { useLeaderboard } from '@haydenbleasel/use-waitlist';

const MyLeaderboard: FC = () => {
  const leaderboard = useLeaderboard(process.env.NEXT_PUBLIC_WAITLIST_ID, 20);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (leaderboard.error) {
      console.error(leaderboard.error);
    }
  }, [leaderboard]);

  return (
    <div>
      {leaderboard.data.map((waiter) => (
        <p>{waiter}</p>
      ))}
    </div>
  );
};

export default MyLeaderboard;
```
