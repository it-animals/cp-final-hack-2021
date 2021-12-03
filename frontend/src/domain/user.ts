/**
 * 1 - админ
 * 2 - представлитель моск. транспорта
 * 3- участник
 */
export type UserRoleType = 1 | 2 | 3;

export type UserDomainType = {
  id: id;
  email: email; // max 100
  fio: fio; //max 100,
  avatar: string;
  role: UserRoleType;
};

export const userIsAdmin = (user: UserDomainType) => user.role === 1;
export const userIsModerator = (user: UserDomainType) => user.role === 2;
export const userIsMember = (user: UserDomainType) => user.role === 3;
