import { AppHeader } from '@/components/header/AppHeader';
import { UsersIcon } from '@/components/icons/UsersIcon';
import { useUsers } from '@/features/users/hooks/useUsers';

export function UsersHeader() {
  const { data: users, isLoading, isError } = useUsers();

  let subtitle = 'Loading members…';

  if (isError) {
    subtitle = 'Members unavailable';
  }

  if (!isLoading && users) {
    subtitle = `${users.length} active members`;
  }

  return (
    <AppHeader
      icon={<UsersIcon size={20} color="#fff" />}
      title="Community"
      subtitle={subtitle}
    />
  );
}
