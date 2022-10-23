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

const myComponent: FC = () => {
  const waitlist = useWaitlist(process.env.NEXT_PUBLIC_WAITLIST_ID);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (waitlist.error) {
      console.error(waitlist.error);
    }
  }, [waitlist]);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      await waitlist.add(email);
      console.log('Success!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Leaderboard

```tsx
import type { FC, FormEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { useLeaderboard } from '@haydenbleasel/use-waitlist';

const myComponent: FC = () => {
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
```
