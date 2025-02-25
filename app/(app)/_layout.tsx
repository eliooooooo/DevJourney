import { Redirect } from 'expo-router';

import { useSession } from '../../context/ctx';
import { CustomStack } from '@/components/ThemedStack';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <CustomStack />;
}
