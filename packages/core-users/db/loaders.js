import DataLoader from 'dataloader';
import { Users, Avatars } from './collections';

export const UserLoader = new DataLoader((keys) => {
  const users = Users.find({
    _id: { $in: keys },
  }).fetch();

  return keys.map((key) => {
    return users.find(({ _id }) => _id === key);
  });
});

export const AvatarLoader = new DataLoader((keys) => {
  const avatars = Avatars.find({
    _id: { $in: keys },
  }).fetch();

  return keys.map((key) => {
    return avatars.find(({ _id }) => _id === key);
  });
});
